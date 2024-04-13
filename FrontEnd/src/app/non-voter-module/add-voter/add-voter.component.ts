import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-voter',
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.scss'],
})
export class AddVoterComponent implements OnInit {

  myForm;
  LastName = '';
  Name = '';
  MiddleName = '';
  Age = '';
  Mobile = '';
  BornDate = '';
  Nagar = '';
  society = '';
  Housenumber = '';
  village = '';
  Caste = '';
  Education = '' ;
  Occupation = '';
  program = '';
  type = '';
  place = '';
  address = '';
  radio = '';
  

  CasteHeader:any = {
    header: 'जात'
  }

  EducationHeader:any = {
    header: 'शिक्षण'
  }

  placeHeader:any = {
    header: 'कार्यक्रमाचे ठिकाण'
  }

  OccupationHeader: any = {
    header: 'व्यवसाय'
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

  RoutineForm(){

  }

  resetForm(){
    this.myForm.reset();
  }

}
