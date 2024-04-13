import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.scss'],
})
export class EmailSettingComponent implements OnInit {

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType() {
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  myForm;
  name = '';
  BirthDate = '';
  AnniDate = '';
  age = '';
  seniority = '';
  area = '';
  occupation = '';
  bloodgroup = '';
  mobile = '';
  whatsapp = '';
  radio1 = '';
  radio2 = '';
  info = '';
  Village = '';
  Mobile = '';

  emailModel: any = { };
  
  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(){
    if(this.emailModel.invalid){
      return
    }else{
      alert('success');
    }
  }

}
