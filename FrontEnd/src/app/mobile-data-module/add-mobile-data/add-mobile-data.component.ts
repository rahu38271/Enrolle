import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-mobile-data',
  templateUrl: './add-mobile-data.component.html',
  styleUrls: ['./add-mobile-data.component.scss'],
})
export class AddMobileDataComponent implements OnInit {

  seniorityHeader:any = {
    header: 'ज्येष्ठता'
  };
  areaHeader:any = {
    header: ' एरिया नाव'
  }
  GenderHeader:any = {
    header:'Select Gender'
  }
  MobileGroupHeader:any = {
    header: 'Select Mobile Header'
  };
  BoothHeader: any = {
    header: 'Select Booth '
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

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
}

  myForm;
  Name = '';
  Address = '';
  Email = '';
  Mobile = '';
  PinCode = '';
  Booth = '';
  Gender = '';
  VoterID = '';
  date = '';
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
  MobileGroup = '';
  
  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  

}
