import { Injectable } from '@angular/core';
import axios from 'axios';
import { CreateAccountDTO, IAccount, MoneyTransactionDTO } from './models/interfaces';

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
  
  async createAccount(account: CreateAccountDTO): Promise<void> {
    const response = await axios.post(`${this.baseURL}/accounts`, account);
  }

  async getAccountByNumber(account: number): Promise<IAccount> {
    const response = await axios.get(`${this.baseURL}/account/${account}`);

    return response.data;
  }

  async moneyTransaction(account: number, transactionValue: number): Promise<MoneyTransactionDTO>{
    try {
      const response = await axios.put(`${this.baseURL}/account/${account}/transaction`, { value: transactionValue });

      console.log('response', response);
      return response.data;
    } catch (error) {
      let transactionError: MoneyTransactionDTO;

      if (axios.isAxiosError(error)) {
        transactionError = {
          message: error.response?.data.message
        };
      } else {
        transactionError = {
          message: 'erro na Transação'
        };
      }

      return transactionError;
    }
    
  }
}
