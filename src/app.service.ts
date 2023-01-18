import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';


@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientPG: Client ,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;

    return `START with ${apiKey} and ${dbName}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        if(err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });

  }
}
