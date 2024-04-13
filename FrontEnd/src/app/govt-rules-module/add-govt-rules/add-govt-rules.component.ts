import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-govt-rules',
  templateUrl: './add-govt-rules.component.html',
  styleUrls: ['./add-govt-rules.component.scss'],
})
export class AddGovtRulesComponent implements OnInit {

  year : number = new Date().getFullYear();

  myForm;
  message = ''
  subject = '';
  department = '';
  serielNumber = '';
  date = '';
  type = '';

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
