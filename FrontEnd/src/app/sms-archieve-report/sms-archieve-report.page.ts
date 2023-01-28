import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sms-archieve-report',
  templateUrl: './sms-archieve-report.page.html',
  styleUrls: ['./sms-archieve-report.page.scss'],
})
export class SmsArchieveReportPage implements OnInit {


  myForm;
  program = '';
  type = '';
  place = '';
  address = '';
  radio = '';
  date = '';
  date1 = '';

  archieveModel: any = {};
  

  typeHeader:any = {
    header: 'कार्यक्रमाचे स्वरूप'
  }

  placeHeader:any = {
    header: 'कार्यक्रमाचे ठिकाण'
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
  

  constructor() {
    
   }

  ngOnInit() {
    
  }

  onSubmit(){
    if(this.archieveModel.invalid){
      return;
    }
  }

  resetForm(){
    this.myForm.reset();
  }


}
