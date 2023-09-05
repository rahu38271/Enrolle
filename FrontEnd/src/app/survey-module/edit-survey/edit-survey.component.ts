import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { VoterService } from 'src/app/services/voter.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss'],
})
export class EditSurveyComponent implements OnInit {

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
  isShow: boolean;
  AllCasts:any;
  Language:any;
  EditData:any={}
  allProfession:any;

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

  constructor(
    public loadingController: LoadingController,
    private voter:VoterService,
    private translateConfigService: TranslateConfigService,
    private router:Router,
    private loader:LoaderService,
    private toast:IonicToastService,
    private survey:SurveyService
    ) {
      this.Language = this.translateConfigService.getCurrentLang();
      if (this.Language == "kn") {
        this.Language = "Kannada"
      }
      else if (this.Language == "mr") {
        this.Language = "Marathi"
      }
      else if (this.Language == "hi") {
        this.Language = "Hindi"
      }
      else {
        this.Language = "English"
      }
     }

  ngOnInit() {
    this.castList();
    this.professionList();
  }

  castList(){
    this.EditData = this.router.getCurrentNavigation().extras.state;
    this.voter.getAllCaste(this.Language).subscribe(data=>{
      this.AllCasts = data;
    })
  }

  professionList(){
    this.voter.getAllProfession().subscribe(data=>{
      this.allProfession = data;
    })
  }

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

 addSurvey(){
  debugger;
  this.loader.showLoading();
  this.EditData.id = Number(this.EditData.id);
  this.EditData.age = Number(this.EditData.age);
  this.survey.editSurvey(this.EditData).subscribe(data=>{
    if(data==1){
      this.loader.hideLoader();
      this.EditData={};
      this.toast.presentToast("Survey added successfully!", "success", 'checkmark-circle-sharp');
    }
    else{
      this.loader.hideLoader();
      this.toast.presentToast("Survey not added", "danger", 'alert-circle-sharp');
    }
  },(err)=>{
    this.loader.hideLoader();
  })
}


}
