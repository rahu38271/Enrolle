import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service'
import { VoterService } from 'src/app/services/voter.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AssemblyService} from 'src/app/services/assembly.service'
import {WardService } from 'src/app/services/ward.service'
import { BoothService } from 'src/app/services/booth.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { TranslateConfigService } from 'src/app/services/translate-config.service';


@Component({
  selector: 'app-edit-voterdata',
  templateUrl: './edit-voterdata.component.html',
  styleUrls: ['./edit-voterdata.component.scss'],
})
export class EditVoterdataComponent implements OnInit {

  districtList:any;
  talukaList:any;
  Id:any;
  editVoter:any = { };
  partNo:any;
  myForm;
  casteList:any;
  year : number = new Date().getFullYear();
  Language:any;
  public BirthDate: Date;
  public Age: number;
  assemblyList: any;
  wardList: any;
  boothList: any;
  EditData:any = {};
  birthDate= ''
  maxDate:String = new Date().toISOString();
  CreatedDate = ''
  name:any;
  userId:any;
  AdminId:any;
  roleId:any;
  superAdminId:any;
  // CreatedDate
 
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

omit_special_char(event) {
  var k;
  k = event.charCode;  //         k = event.keyCode;  (Both can be used)
  return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}

  constructor
    (
      public loadingController: LoadingController, 
      private contact:ContactService,
      private voter:VoterService,
      private loader:LoaderService,
      private toast:IonicToastService,
      private assembly:AssemblyService,
      private ward:WardService,
      private booth:BoothService,
      private router:Router,
      private location: Location,
      private translateConfigService: TranslateConfigService
    )
     {
      this.Language = this.translateConfigService.getCurrentLang();
      }

      ngOnInit() {
        this.EditData.assembly = this.EditData.assembly;
        this.name=localStorage.getItem('loginUser');
        this.userId = localStorage.getItem("loginId");
        this.AdminId = localStorage.getItem("adminId");
        this.roleId = localStorage.getItem("userType");
        this.superAdminId = localStorage.getItem("superAdminId");
        if(this.roleId == 2){
          this.AdminId = this.userId
        }
        else{
          this.AdminId = this.superAdminId
        }
        this.getDistrict();
        this.getAssembly();
        //this.getWard();
        //this.getBooth()
        this.AllCasts();
        if(this.EditData.birthDate=="" || this.EditData.birthDate==null){
          this.EditData.birthDate = "1900-01-01T00:00:00"
        }
        else{
          this.EditData.birthDate = this.EditData.birthDate.split('T')[0];
        }
      }

  getDistrict(){
    this.EditData = this.router.getCurrentNavigation().extras.state;
    this.contact.getDistrictData().subscribe((data)=>{
      if(data.length > 0){
        this.districtList = data;
      }
    }, err=>{
      
    })
  }

  getTaluka(dId:any){
    this.contact.getTalukaData(dId).subscribe((data)=>{
      this.EditData.district = this.districtList.find(x => x.dId==dId).districtName;
      this.talukaList = data;
    })
  }

  getAssembly(){
    this.assembly.getAssemblyData().subscribe(data=>{
      if(data.length > 0){
        this.assemblyList = data;
      }
    })
  }

  // getWard(){
  //   this.ward.getWardData().subscribe(data=>{
  //     if(data.length > 0){
  //       this.wardList = data;
  //     }
  //   })
  // }

  // getBooth(){
  //   this.booth.getBoothData().subscribe(data=>{
  //     if(data.length > 0){
  //       this.boothList = data;
  //     }
  //   })
  // }

  

  resetForm(){
    this.myForm.reset();
  }

  public cal_Age(): void{
    if(this.BirthDate){
       //convert date again to type Date
       const bdate = new Date(this.BirthDate);
       const timeDiff = Math.abs(Date.now() - bdate.getTime() );
       this.Age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
  }

  onSubmit(){

  }

  goBack(){
    this.location.back();
  }

  save(){
    debugger;
    this.EditData.age=Number(this.EditData.age);
    if(this.EditData.age == 0){
      this.EditData.age=null;
    }
    
    this.EditData.userId = Number(this.userId);
    this.EditData.adminId = Number(this.AdminId);
    this.EditData.pincode = Number(this.EditData.pincode);
    if(this.EditData.pincode=="NaN"){
      this.EditData.pincode = null
    }
    if(this.EditData.birthDate=='' || this.EditData.birthDate == null){
      this.EditData.birthDate = '1900-01-01'
    }
    else{
      this.EditData.birthDate = this.EditData.birthDate.split('T')[0];
    }
    this.EditData.userName= this.name;
    this.loader.showLoading();
    this.voter.update(this.EditData).subscribe((data)=>{
      this.EditData = {};
        this.loader.hideLoader();
        this.toast.presentToast("Voter updated successfully!", "success", 'checkmark-circle-sharp');
        //this.router.navigate(['/voter-summary'])
        this.router.navigate(['/voter-summary'])
        
    },(err)=>{
      this.toast.presentToast("Voter not updated!", "danger", 'checkmark-circle-sharp');
      this.loader.hideLoader();
    })
  }

  AllCasts() {
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
    this.voter.getAllCaste(this.Language).subscribe(data => {
      this.casteList = data;
    })
  }

}
