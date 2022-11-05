import { Body, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProofsService {
  private regex = {
    hasTernary: /(?=.*\?.*:.*).*/g,
    getTernary:
      /((?<!\?.*)[^?\n]+(?=\b.*:.*)|(?<=.*\?.*)(?=\S+?).*(?<=\S+?)(?=.*:.*)|(?<=.*\?.*)(?!.*:.*)(?=\S+?)[^:\n]+)/g,
    hasProp: /((!+?)(?<=!*props\.)(\w+))/g,
    // hasProp: /(!+?props\.\w+)+/g,
    getProp: /(?<=!+?props\.)(\w+)/,
    replaceProp: /(props\.\w+)+/,
    hasExpression: /\$\{(.*?)\}/g,
    getExpression: /(?<=\$\{)(.*?)(?=\})/g,
    prop: /(?<prop>(!*)(?<=!*props\.)(\w+))/g,
    expression: /((?=\$\{)[^}]+\})+?/g,
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

  // private pattern = {
  //   getTernary:
  //     /(?<!\?.*)[^?\n]*(?=\b.*:.*)|(?<=.*\?.*)(?=\S+?).*(?<=\S+?)(?=.*:.*)|(?<=.*\?.*)(?!.*:.*)(?=\S+?)[^:\n]+/g,
  //   // ternaryz:
  //   //   /(?<condition>(?<!!*props\.\w+.*)!*props\.\w+(?=\s*\?))+|(?<true>(?<=!*props\.\w+.*\?).+(?=:.*))+|(?<false>(?!.*:).+)+/g,
  //   // isTernary:
  //   //   /(\s+!*props\.\w*\s*\?\s*('?.*'?|\s+!*props\..*\?.*:.*)\s*:\s*('?.*'?|\s+!*props\..*\?.*:.*))/g,
  //   // prop: /(?<prop>(!*)(?<=!*props\.)(\w+))/g,
  //   // bang: /(?<bang>(!*)(?=!*props\.))/g,
  //   // isTernaryEsque: /(?:!*props\.w+)+ | \?+ | :+ |(?:'.*'){2,}/g,
  //   // hasTernary: /(?:!*props\.w+)+ | \?+ | :+ |(?:'.*'){2,}/g,
  //   // props: {
  //   //   getBang: /(!*)(?=!*props\.)/g,
  //   //   prop: /(!*props\.\w+)+/g,
  //   //   getProp: /(!*)(?<=!*props\.)(\w+)/g,
  //   // },
  //   // literal: {
  //   //   get: /((?<=\$\{)[^}]+(?=\}))+?/g,
  //   //   expression: /((?=\$\{)[^}]+\})+?/g,
  //   //   hasExpression: /\$\{(.*?)\}/g,
  //   //   delimiters: /(?<delimiters>\$\{|\})/g,
  //   // },
  //   // ternary: {
  //   //   get: /((?<!!*props\.\w+.*)!*props\.\w+(?=\s*\?))|(?<=!*props\.\w+\s*\?\s*)(?=\S).*(?<=\S)(?=\s*:)|(?<=!*props\.\w+.*)(?!.*:)(?=\S).+(?=\})/g,
  //   //   getTernary:
  //   //     /((?<!!*props\.\w+.*)!*props\.\w+(?=\s*\?))|(?<=!*props\.\w+\s*\?\s*)(?=\S).*(?<=\S)(?=\s*:)|(?<=!*props\.\w+.*)(?!.*:)(?=\S).+[^}\r\s]/g,
  //   //   hasTernary: /(?:!*props\.w+)+ | \?+ | :+ |(?:'.*'){2,}/g,
  //   // },
  // };

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

  bulkExpressionHandler(body) {
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

  getTernary(raw) {
    if (!raw || !raw.match(this.regex.hasTernary)) return raw;

    const ternary = raw.match(this.regex.getTernary);
    // console.log({
    //   raw,
    //   ternary,
    //   return: this.getProp(ternary[0])
    //     ? this.getTernary(ternary[1])
    //     : this.getTernary(ternary[2]),
    // });
    if (ternary.length !== 3) return raw;

    return this.getProp(ternary[0])
      ? this.getTernary(ternary[1])
      : this.getTernary(ternary[2]);
  }

  getProp(raw) {
    console.log({
      raw,
      has: !!raw.match(this.regex.prop),
      key: raw.match(this.regex.getProp),
    });
    if (!raw || !raw.match(this.regex.prop)) return raw;

    const [propKey] = raw.match(this.regex.prop);

    const prop = raw.replace(this.regex.replaceProp, this.testData[propKey]);

    return `${this.eval(prop)}`;
  }

  interpolate(raw) {
    if (!raw || !raw.match(this.regex.hasExpression)) return raw;

    const [expression] = raw.match(this.regex.getExpression);

    const interpolated = expression
      .split(this.regex.hasProp)
      .map((s) => this.getProp(s))
      .join('');

    return this.eval(interpolated)
      ? this.eval(interpolated)
      : this.getTernary(interpolated);
  }

  eval(expression: string): string {
    try {
      return eval(expression);
    } catch {
      return null;
    }
  }
}
