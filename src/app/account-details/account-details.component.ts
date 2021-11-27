import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { MoneyTransactionDTO } from '../models/interfaces';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  name: string = '';
  agency: number = 0;
  account: number = 0;
  digit: number = 0;
  funds: number = 0;
  transactionInput: number = 0;
  id: number = 0;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    const tempId = this.route.snapshot.paramMap.get('account');
    
    if (tempId) {
      this.id = parseInt(tempId);
      this.getAccount();
    }
  }

  async getAccount(): Promise<void> {
    const response = await this.accountService.getAccountByNumber(this.id);
    const { name, account, agency, digit, funds } = response;

    this.name = name;
    this.account = account;
    this.agency = agency;
    this.digit = digit;
    this.funds = funds;
  }

  finishTransaction(response: MoneyTransactionDTO) {
    if (response.account) {
      this.funds = response.account.funds;
    } else {
      this.errorMessage = response.message;
    }
  }

  async addMoney() {
    const response = await this.accountService.moneyTransaction(this.id, this.transactionInput);
    this.transactionInput = 0;

    this.finishTransaction(response);
  }

  async removeMoney() {
    const response = await this.accountService.moneyTransaction(this.id, (this.transactionInput * -1));
    this.transactionInput = 0;

    this.finishTransaction(response);

  }

}
