import {
  Configuration,
  CountryCode,
  DepositoryAccountSubtype,
  LinkTokenCreateRequest,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from 'plaid';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpService } from '@nestjs/axios';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { tap, map } from 'rxjs/operators';
import { Observable, combineLatestWith, firstValueFrom } from 'rxjs';
import {
  PLAID_ACCESS_TOKEN,
  PLAID_API_BASE,
  PLAID_CLIENT_ID,
  PLAID_PUBLIC_TOKEN,
  PLAID_SECRET,
} from './constants';

@Injectable()
export class PlaidService {
  private readonly logger: Logger;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  private apiBase = this.configService.get<string>(PLAID_API_BASE);
  private clientId = this.configService.get<string>(PLAID_CLIENT_ID);
  private secret = this.configService.get<string>(PLAID_SECRET);
  private accessToken = this.configService.get<string>(PLAID_ACCESS_TOKEN);
  private publicToken = this.configService.get<string>(PLAID_PUBLIC_TOKEN);
  private linkToken = 'link-sandbox-4ffcbbe4-dd3f-4711-b523-04b3a286c3f1';

  private payload: Record<string, string | number> = {
    client_id: this.clientId,
    secret: this.secret,
    access_token: this.accessToken,
  };

  async init() {
    // const publicToken$ = await this.getPublicToken();
    const publicToken: any = await this.getPublicToken();
    const accessToken = await this.exchangeToken(publicToken.public_token);
    // const accessToken = await firstValueFrom(accessToken$);
    const linkToken = await this.createLinkToken();
    // const linkToken = await firstValueFrom(linkToken$);
    console.log({
      publicToken,
      accessToken,
      linkToken,
    });

    return {
      publicToken,
      accessToken,
      linkToken,
    };
  }

  async getValue(observable) {
    const source$ = observable;
    return await firstValueFrom(source$);
  }

  async api(
    url: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete' = null,
    payload: any = this.payload,
  ): Promise<any> {
    try {
      switch (method) {
        case 'post':
          return await firstValueFrom(
            this.httpService
              .post(`${this.apiBase}/${url}`, payload)
              .pipe(map((res) => res.data)),
          );
        default:
          return await firstValueFrom(
            this.httpService
              .get(`${this.apiBase}/${url}`)
              .pipe(map((res) => res.data)),
          );
      }
    } catch (err) {
      console.log('[plaidError]', { err });
    }
  }

  async getPublicToken(): Promise<any> {
    const payload = {
      client_id: this.clientId,
      secret: this.secret,
      institution_id: 'ins_3',
      initial_products: [Products.Auth, Products.Transactions],
      options: {
        webhook: 'https://www.genericwebhookurl.com/webhook',
      },
    };

    return this.api('sandbox/public_token/create', 'post', payload);
  }

  async getLinkToken() {
    const payload = {
      client_id: this.clientId,
      secret: this.secret,
      link_token: this.linkToken,
    };
    const linkToken = await this.api('link/token/get', 'post', payload);
    this.linkToken = linkToken;
    return linkToken;
  }

  async createLinkToken() {
    const payload = {
      client_id: this.clientId,
      secret: this.secret,
      client_name: 'Insert Client name here',
      country_codes: ['US'],
      language: 'en',
      user: {
        client_user_id: '200',
      },
      products: ['auth'],
    };

    return await this.api('link/token/create', 'post', payload);
  }

  async updateLinkToken() {
    const payload = {
      client_id: this.clientId,
      secret: this.secret,
      client_name: 'Insert Client name here',
      country_codes: ['US'],
      language: 'en',
      user: {
        client_user_id: '200',
      },
      products: ['auth'],
      access_token: this.accessToken,
    };

    return this.api('link/token/create', 'post', payload);
  }

  async exchangeToken(token = null): Promise<any> {
    const { access_token, ...payload } = this.payload;
    payload.public_token = token;

    return await this.api('item/public_token/exchange', 'post', payload);
  }

  // this gets the same information as balance or identity, but with transactions!
  async getTransactions(startDate = null, endDate = null): Promise<any> {
    const payload = this.payload;
    payload.start_date = startDate || '2021-01-01';
    payload.end_date = startDate || '2021-12-10';

    const tx = await this.api('transactions', 'post', payload);
    return tx;
  }

  async getTransactionsSync(): Promise<any> {
    const payload = this.payload;
    // batched transaction count
    payload.count = 5;

    const tx = await this.api('transactions/sync', 'post', payload);
    return tx;
  }

  // didnt really have anything?
  async getTransactionsRefresh(): Promise<any> {
    const tx = await this.api('transactions/refresh', 'post');
    return tx;
  }
}
