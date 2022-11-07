import { Injectable, Logger } from '@nestjs/common';
import { MagicStringService } from './magic-string.service';

@Injectable()
export class ProofsService {
  constructor(private readonly magicString: MagicStringService) {}

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
        processed: this.magicString.eval(raw, this.testData),
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
          processed: this.magicString.eval(v as string, this.testData),
        },
      };
    }

    return { ...results };
  }
}
