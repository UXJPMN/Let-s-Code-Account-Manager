export interface IAccount {
  agency: number;
  account: number;
  digit: number;
  name: string;
  funds: number;
}

export interface CreateAccountDTO {
  agency: number;
  name: string;
  funds?: number;
}

export interface MoneyTransactionDTO {
  message: string;
  account?: IAccount;
}
