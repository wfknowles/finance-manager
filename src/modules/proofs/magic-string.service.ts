import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MagicStringService {
  private magicAnchor = 'props';
  private regex = {
    expression: /((?=\$\{)[^}]+\})+?/g,
    hasExpression: /\$\{(.*?)\}/g,
    getExpression: /(?<=\$\{)(.*?)(?=\})/g,
    anchor: new RegExp(`(${this.magicAnchor}\\.\\w+)+`),
    getAnchor: new RegExp(`((?<=${this.magicAnchor}\\.)(\\w+))`),
    replaceAnchor: new RegExp(`(${this.magicAnchor}\\.\\w+)+`),
    hasTernary: /(?=.*\?.*:.*).*/g,
    getTernary:
      /((?<!\?.*)[^?\n]+(?=\b.*:.*)|(?<=.*\?.*)(?=\S+?).*(?<=\S+?)(?=.*:.*)|(?<=.*\?.*)(?!.*:.*)(?=\S+?)[^:\n]+)/g,
    isTernaryLike: new RegExp(
      `(?:!*${this.magicAnchor}\\.w+)+ | \\?+ | :+ |(?:'.*'){2,}`,
      'g',
    ),
  };
  private data = {};

  eval(str: string, data: any): string {
    if (!str) return str;
    this.data = data;
    return str
      .split(this.regex.expression)
      .map((e) => this.resolveExpression(e))
      .join('');
  }

  private resolveExpression(raw: string): string {
    if (!raw || !raw.match(this.regex.hasExpression)) return raw;

    const [expression] = raw.match(this.regex.getExpression);

    const resolved = expression
      .split(this.regex.anchor)
      .map((a) => this.resolveAnchor(a))
      .join('');

    return this.resolve(resolved);
  }

  private resolveAnchor(raw: string): string {
    if (!raw || !this.regex.anchor.test(raw)) return raw;

    const [key] = raw.match(this.regex.getAnchor);

    const prop = raw.replace(this.regex.replaceAnchor, this.data[key]);

    return prop;
  }

  private resolve(expression: string): string {
    try {
      return eval(expression);
    } catch {
      return this.resolveTernary(expression);
    }
  }

  private hasTernary(raw: string): boolean {
    if (raw.match(this.regex.hasTernary)) return true;

    if (raw.match(this.regex.isTernaryLike)) {
      Logger.error(`TernaySyntaxError: ${raw}`);
    }
    return false;
  }

  private resolveTernary(raw: string): string {
    if (!raw || !this.hasTernary(raw)) return raw;

    const ternary = raw.match(this.regex.getTernary);

    if (ternary.length !== 3) return raw;

    return ternary[0]
      ? this.resolveTernary(ternary[1])
      : this.resolveTernary(ternary[2]);
  }
}
