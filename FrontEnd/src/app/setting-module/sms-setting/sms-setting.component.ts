import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sms-setting',
  templateUrl: './sms-setting.component.html',
  styleUrls: ['./sms-setting.component.scss'],
})
export class SmsSettingComponent implements OnInit {

  public templates: any [] = [{
    id : 1,
    Template:'',
  }] 

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
}

keyPressNumbers(event) {
  var charCode = (event.which) ? event.which : event.keyCode;
  // Only Numbers 0-9
  if ((charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

ismyTextFieldType: boolean;
  togglemyPasswordFieldType() {
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  smsModel: any = { };
  
  constructor() { }

  ngOnInit() {}

  addTemplate(){
    this.templates.push({
      id : this.templates.length + 1,
      Template : '' ,
    })
  }

  removeTemplate(i : number){
    this.templates.splice(i,1);
  }

  onSubmit(){
    if(this.smsModel.invalid){
      return
    }else{
      alert('success');
    }
  }

}
