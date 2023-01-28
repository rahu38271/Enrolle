import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss'],
})
export class AddSurveyComponent implements OnInit {

  year : number = new Date().getFullYear();

  surveyModel: any = {};

  myForm;
  Name = '';
  Gender = '';
  Booth = '';
  House = '';
  Mobile = '';
  Address = '';
  FamilyHead = '';
  Suspicious = '';
  Station = '';
  AliveDead = '';
  Occupation = '';
  Karyakarta = '';
  Inclination = '';
  Caste = '';
  Party = '';
  Family = '';
  Disability = '';
  Education = '';
  AltMobile = '';
  Info = '';
  WorkLeft = '';
  Service = '';


  public date: Date;
  public Age: number;
  isShow: any;

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

  constructor(public loadingController: LoadingController) { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(f : NgForm ){
    if(this.surveyModel.invalid){
      return;
    }
    f.resetForm();
  }

  addMember(){
    this.isShow = !this.isShow
  }

  public CalculateAge(): void
     {
      if (this.date) {
        //convert date again to type Date
        const bdate = new Date(this.date);
        const timeDiff = Math.abs(Date.now() - bdate.getTime() );
        this.Age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      }
      
    }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Saving Details...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
