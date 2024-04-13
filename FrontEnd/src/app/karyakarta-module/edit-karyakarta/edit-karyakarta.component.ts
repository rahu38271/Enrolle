import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-karyakarta',
  templateUrl: './edit-karyakarta.component.html',
  styleUrls: ['./edit-karyakarta.component.scss'],
})
export class EditKaryakartaComponent implements OnInit {

  year:number = new Date().getFullYear();

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


  myForm;
  name = '';
  seniority = '';
  area = '';
  occupation = '';
  bloodgroup = '';
  mobile = '';
  whatsapp = '';
  radio1 = '';
  radio2 = '';
  info = '';

  public BirthDate: Date;
  public Age: number;
  
  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  public CalculateAge(): void
     {
      if (this.BirthDate) {
        //convert date again to type Date
        const bdate = new Date(this.BirthDate);
        const timeDiff = Math.abs(Date.now() - bdate.getTime() );
        this.Age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      }
      
    }

}
