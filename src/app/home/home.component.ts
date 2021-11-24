import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { IAccount } from '../models/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  accountList: IAccount[] = [];

  constructor(private accountService: AccountService) { }

  async ngOnInit(): Promise<void> {
    await this.accountService.initializeList();
    this.accountList = this.accountService.accountList;
  }

  async handleDelete(account: number): Promise<void> {
    await this.accountService.deleteAccount(account);
    this.accountList = this.accountService.accountList;
  }

}
