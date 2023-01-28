import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-document-repository',
  templateUrl: './edit-document-repository.component.html',
  styleUrls: ['./edit-document-repository.component.scss'],
})
export class EditDocumentRepositoryComponent implements OnInit {

  year : number = new Date().getFullYear();
  
  myForm;
  Type = '';
  Date = '';
  Title = '';
  Department = '';
  Shera = '';

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

}
