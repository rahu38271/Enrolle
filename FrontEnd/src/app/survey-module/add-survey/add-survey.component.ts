import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss'],
})
export class AddSurveyComponent implements OnInit {

  year : number = new Date().getFullYear();
  maxDate:String = new Date().toISOString();
  surveyModel: any = {};
  Language:any;
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
  AllCasts:any;

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

  constructor(
    public loadingController: LoadingController,
    private surveyService:SurveyService,
    private toast: IonicToastService,
    private loader:LoaderService,
    private voter: VoterService,
    private translateConfigService: TranslateConfigService,
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

  castList(){
    this.voter.getAllCaste(this.Language).subscribe(data=>{
      this.AllCasts = data;
    })
  }

  addSurvey(){
    debugger;
    this.loader.showLoading();
    this.surveyModel.Age = Number(this.surveyModel.Age);
    this.surveyModel.MemberAge = Number(this.surveyModel.MemberAge);
    this.surveyService.addSingleSurvey(this.surveyModel).subscribe(data=>{
      if(data==1){
        this.loader.hideLoader();
        this.surveyModel={};
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
