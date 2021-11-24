import { Injectable } from '@angular/core';
import axios from 'axios';
import { IAccount } from './models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountList: IAccount[] = [];
  baseURL: string = 'http://localhost:3021';

  constructor() { }

  async initializeList(): Promise<void> {
    const response = await axios.get(`${this.baseURL}/accounts`);

    this.accountList = response.data;
  }

  async deleteAccount(account: number): Promise<void> {
    await axios.delete(`${this.baseURL}/account/${account}`);
    await this.initializeList();
  }
}
