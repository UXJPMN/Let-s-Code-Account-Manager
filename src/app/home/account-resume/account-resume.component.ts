import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-resume',
  templateUrl: './account-resume.component.html',
  styleUrls: ['./account-resume.component.scss']
})
export class AccountResumeComponent implements OnInit {
  @Input() name: string = '';
  @Input() agency: number = 0;
  @Input() account: number = 0;
  @Output() deleteAccount = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  handleDelete(): void {
    this.deleteAccount.emit(this.account);
  }

}
