import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProofsService {
  private regex = {
    hasTernary: /(?=.*\?.*:.*).*/g,
    getTernary:
      /((?<!\?.*)[^?\n]+(?=\b.*:.*)|(?<=.*\?.*)(?=\S+?).*(?<=\S+?)(?=.*:.*)|(?<=.*\?.*)(?!.*:.*)(?=\S+?)[^:\n]+)/g,
    isTernaryLike: /(?:!*props\.w+)+ | \?+ | :+ |(?:'.*'){2,}/g,
    prop: /(props\.\w+)+/,
    // hasProp: /((!+?)(?<=!*props\.)(\w+))/g,
    getProp: /((?<=props\.)(\w+))/,
    replaceProp: /(props\.\w+)+/,
    expression: /((?=\$\{)[^}]+\})+?/g,
    hasExpression: /\$\{(.*?)\}/g,
    getExpression: /(?<=\$\{)(.*?)(?=\})/g,
    
  };

  private testData = {
    id: 27,
    name: 'sluggerville-baseball-bat',
    display: 'Louisville Slugger Baseball Bat',
    createdAt: '2022-11-01 12:00:00',
    updatedAt: '2022-11-02 15:00:00',
    archivedAt: '2022-11-03 16:00:00',
    deletedAt: null,
  };

  getExpression(body: Record<string, string>) {
    if (!body) return body;
    const [key, raw] = Object.entries(body)[0];
    if (!raw) return body;

    return {
      [key]: {
        raw,
        processed: this.getString(raw),
      },
    };
  }

  bulkExpressionHandler(body: Record<string, string>) {
    let results = {};

    for (const [k, v] of Object.entries(body)) {
      results = {
        ...results,
        [k]: {
          raw: v,
          processed: this.getString(v as string),
        },
      };
    }

    return { ...results };
  }

  getString(str: string): string {
    if (!str) return str;
    return str
      .split(this.regex.expression)
      .map((s: string) => this.interpolate(s))
      .join('');
  }

  hasTernary(raw: string): boolean {
    if (raw.match(this.regex.hasTernary)) return true;

    if (raw.match(this.regex.isTernaryLike)) {
      Logger.error(`TernaySyntaxError: ${raw}`);
    } 
    return false;
  }

  getTernary(raw: string): string {
    if (!raw || !this.hasTernary(raw)) return raw;

    const ternary = raw.match(this.regex.getTernary);

    if (ternary.length !== 3) return raw;

    return ternary[0]
      ? this.getTernary(ternary[1])
      : this.getTernary(ternary[2]);
  }

  getProp(raw: string): string {

    if (!raw || !this.regex.prop.test(raw)) return raw;

    const [propKey] = raw.match(this.regex.getProp);

    const prop = raw.replace(this.regex.replaceProp, this.testData[propKey]);

    return prop;
  }

  interpolate(raw: string) {
    if (!raw || !raw.match(this.regex.hasExpression)) return raw;

    const [expression] = raw.match(this.regex.getExpression);

    const interpolated = expression
      .split(this.regex.prop)
      .map((s) => this.getProp(s))
      .join('');

    return this.eval(interpolated);
  }

  eval(expression: string): string {
    try {
      return eval(expression);
    } catch {
      return this.getTernary(expression);
    }
  }
}
