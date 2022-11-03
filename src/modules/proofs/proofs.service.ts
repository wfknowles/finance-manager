import { Injectable } from '@nestjs/common';

@Injectable()
export class ProofsService {
  private pattern = {
    ternary:
      /(?<condition>(?<!!*props\.\w+.*)!*props\.\w+(?=\s*\?))+|(?<true>(?<=!*props\.\w+.*\?).+(?=:.*))+|(?<false>(?!.*:).+)+/g,
    isTernary:
      /(\s+!*props\.\w*\s*\?\s*('?.*'?|\s+!*props\..*\?.*:.*)\s*:\s*('?.*'?|\s+!*props\..*\?.*:.*))/g,
    prop: /(?<prop>(!*)(?<=!*props\.)(\w+))/g,
    bang: /(?<bang>(!*)(?=!*props\.))/g,
    hasLiteral: /\$\{(.*?)\}/g,
    isTernaryEsque: /(?:!*props\.w+)+ | \?+ | :+ |(?:'.*'){2,}/g,
    hasTernary: /(?:!*props\.w+)+ | \?+ | :+ |(?:'.*'){2,}/g
  };

  private props = {
    id: 27,
    name: 'ProofService',
    display: 'Proofs',
    createdAt: '2022-11-01 00:00:00',
    updatedAt: '2022-11-01 02:00:00',
    archivedAt: '2022-11-01 04:00:00',
    deletedAt: null,
  };

  regex(str){
    return {
      0: str,
      1: this.pattern.hasLiteral.test(str),
      2: this.pattern.isTernaryEsque.test(str),
      3: this.pattern.isTernary.test(str),
      4: this.pattern.hasTernary.test(str),
    }
  }

  // async regex(body) {
  //   let regex = {};

  //   for (const [k, v] of Object.entries(body)) {
  //     regex = {
  //       ...regex,
  //       [k]: {
  //         raw: v,
  //         ternary: this.getTernary(v, true),
  //       },
  //     };
  //   }

  //   return { regex };
  // }

  async test(body) {
    let regex = {};

    for (const [k, v] of Object.entries(body)) {
      regex = {
        ...regex,
        [k]: {
          raw: v,
          processed: this.getString(v),
        },
      };
    }

    return { regex };
  }

  getString(str) {
    const string = this.getTernary(str, true);
    const hasLiteral = this.pattern.hasLiteral.test(str);
    // console.log({
    //   0: str,
    //   1: this.pattern.hasLiteral.test(str),
    //   2: this.pattern.isTernaryEsque.test(str),
    //   3: this.pattern.isTernary.test(str),
    // })
    return string
  }

  getTernary(raw, getResult = false) {
    if (!raw) return;

    const ternArr = this.getRegex(raw, this.pattern.ternary);

    if (ternArr.length === 3) {
      const ternary = {
        condition: this.getCondition(ternArr[0]),
        true: this.getTernary(ternArr[1], getResult),
        false: this.getTernary(ternArr[2], getResult),
      };

      const output = ternary[`${ternary.condition}`];

      console.log({ output, result: this.regex(output)});

      return getResult ? output : ternary;
    } else if (ternArr.length === 1) {
      const string = ternArr[0];
      return string;
    } else {
      return raw;
    }
  }

  getCondition(input: string) {
    const condition = (bang, prop) => {
      switch (bang) {
        case '!!':
          return !!prop;
        case '!':
          return !prop;
        default:
          return !!prop;
      }
    };
    if (input) {
      const bang = this.getRegex(input, this.pattern.bang)[0];
      const key = this.getRegex(input, this.pattern.prop)[0];
      const prop = this.props[key];
      return condition(bang, prop);
    }
  }

  getRegex(input, pattern) {
    return input
      .match(pattern)
      .reduce((acc, i) => (i.length > 0 ? [...acc, i] : acc), []);
  }
}
