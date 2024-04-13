import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-govt-rules',
  templateUrl: './edit-govt-rules.component.html',
  styleUrls: ['./edit-govt-rules.component.scss'],
})
export class EditGovtRulesComponent implements OnInit {

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
