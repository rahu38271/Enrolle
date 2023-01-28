import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp-setting',
  templateUrl: './whatsapp-setting.component.html',
  styleUrls: ['./whatsapp-setting.component.scss'],
})
export class WhatsappSettingComponent implements OnInit {

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType() {
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

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

  seniorityHeader:any = {
    header: 'ज्येष्ठता'
  };
  areaHeader:any = {
    header: ' एरिया नाव'
  }
  occupationHeader:any = {
    header: 'व्यवसाय'
  };
  bloodgroupHeader: any = {
    header: ' रक्तगट '
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

  whatsappModel: any = { };
  
  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(){
    if(this.whatsappModel.invalid){
      return
    }else{
      alert('success');
    }
  }

}
