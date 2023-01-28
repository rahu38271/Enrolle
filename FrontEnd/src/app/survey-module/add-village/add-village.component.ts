import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-village',
  templateUrl: './add-village.component.html',
  styleUrls: ['./add-village.component.scss'],
})
export class AddVillageComponent implements OnInit {


  myForm;
  State = '';
  District = '';
  Taluka = '';
  Village = '';

  villageModel: any = {};

  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(villageForm : NgForm){
    if(this.villageModel.invalid){
      return;
    }
    villageForm.resetForm();
  }

}
