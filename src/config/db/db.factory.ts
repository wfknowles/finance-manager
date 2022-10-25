import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { LoggerOptions } from 'typeorm';
import { DB_SCHEMA } from '../../config/constants';

dotenv.config();

type NodeEnvironment = 'development' | 'test' | 'production';

export class DatabaseFactory implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.host,
      username: this.username,
      password: this.password,
      database: this.database,
      schema: DB_SCHEMA,
      dropSchema: false,
      synchronize: false,
      migrationsRun: true,
      logging: this.logging,
      entities: this.entities,
      subscribers: this.subscribers,
      migrations: this.migrations,
      // cli: {
      //   migrationsDir: 'src/migrations',
      //   subscribersDir: 'src/subscribers',
      // },
    };
  }

  private get env(): NodeEnvironment {
    return (this.getValue('NODE_ENV') ?? 'production') as NodeEnvironment;
  }

  private get host(): string {
    return ['test', 'local'].includes(this.env)
      ? '127.0.0.1'
      : this.getValue('DB_HOSTNAME');
  }

  private get username(): string {
    return ['test', 'local'].includes(this.env)
      ? 'root'
      : this.getValue('DB_USERNAME');
  }

  private get password(): string {
    return ['test', 'local'].includes(this.env)
      ? 'password'
      : this.getValue('DB_PASSWORD');
  }

  private get database(): string {
    return ['test', 'local'].includes(this.env)
      ? 'test'
      : this.getValue('DB_NAME');
  }

  private get entities(): string[] {
    return [this.env === 'test' ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'];
  }

  private get subscribers(): string[] {
    return [
      this.env === 'test'
        ? 'src/**/*.subscribers.ts'
        : 'dist/**/*.subscribers.js',
    ];
  }

  private get migrations(): string[] {
    return [
      this.env === 'test'
        ? 'src/migrations/**/*.ts'
        : 'dist/migrations/**/*.js',
    ];
  }

  /**
   * Returns the logging values to use based on the current `NODE_ENV`
   * Possible options are: boolean | "all" | ("query" | "schema" | "error" | "warn" | "info" | "log" | "migration")[];
   * @returns bool | l
   */
  private get logging(): LoggerOptions {
    const LOGGING_MAP: Record<NodeEnvironment, LoggerOptions> = {
      production: ['error', 'warn', 'migration'],
      development: true,
      test: ['error', 'warn', 'migration'],
    };

    return LOGGING_MAP[this.env];
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Error: Missing Environment Variable: ${key}`);
    }

    return value;
  }
}

export default new DatabaseFactory().createTypeOrmOptions();
