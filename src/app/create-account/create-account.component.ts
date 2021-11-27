import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { CreateAccountDTO } from '../models/interfaces';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  newAccount: CreateAccountDTO = {
    name: '',
    agency: 0,
    funds: 0
  }

  createAccountForm = new FormGroup({
    name: new FormControl(this.newAccount.name, Validators.required),
    agency: new FormControl(this.newAccount.agency, [
      Validators.required,
      this.positiveValueValidator()
    ]),
    funds: new FormControl(this.newAccount.funds, this.greaterThanZeroValidator())
  });

  
  

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    this.newAccount = {
      name: this.createAccountForm.get('name')?.value,
      agency: this.createAccountForm.get('agency')?.value,
      funds: this.createAccountForm.get('funds')?.value
    };

    await this.accountService.createAccount(this.newAccount);
  }
  
  positiveValueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Destructoring é um padrão do ES6, esta asserção equivale a const value = control.value;
      // poderia ser uma lista de valores como const { value, get, addAsyncValidators } = control;
      const { value } = control;
      const invalid = value <= 0;

      return invalid ? { invalidValue: { value }} : null;
    }
  }

  greaterThanZeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      const invalid = value < 0;

      return invalid ? { invalidValue: { value }} : null;
    }
  }

}
