import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-document-repository',
  templateUrl: './add-document-repository.component.html',
  styleUrls: ['./add-document-repository.component.scss'],
})
export class AddDocumentRepositoryComponent implements OnInit {

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
