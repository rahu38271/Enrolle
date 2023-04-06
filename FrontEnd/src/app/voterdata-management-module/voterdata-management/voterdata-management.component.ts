import { Component } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
import { VoterService } from 'src/app/services/voter.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router'
import { Voter } from 'src/app/models/voter'
import { Location } from '@angular/common';

@Component({
  selector: 'app-voterdata-management',
  templateUrl: './voterdata-management.component.html',
  styleUrls: ['./voterdata-management.component.scss'],
})
export class VoterdataManagementComponent {

  myForm1: any;
  searchWeb: string;

  isShow = true;
  totalCount: any;
  searchedData: any;
  ColumnValue: any;
  partNumber: any;
  id: any;
  userId: any;
  roleID:any


  searchModal: any = {
    LastName:'',
    FirstName:'',
    MiddleName:'',
    VotingCardNo:'',
    PartNo:'',
    MobileNo:'',
    HouseNo:'',
    FromAge:'',
    ToAge:'',
    Village:'',
    Gender:'',
    UserId:'',
    roleID:''
  };
  partNo: any;
   
  search(){
    this.isShow = !this.isShow
  }

  voterByPart:Voter[] =[];

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

  constructor
    (
      public loadingController: LoadingController,
      public toastController: ToastController,
      public alertController: AlertController,
      private voter:VoterService,
      private toast:IonicToastService,
      private loader:LoaderService,
      private router:Router,
      private route:ActivatedRoute,
      private location: Location
    ) 
    {
    
   }

   ngOnInit(){
    this.partNo = this.route.snapshot.paramMap.get('partNo');
    this.userId = this.route.snapshot.paramMap.get('id');
    this.roleID = localStorage.getItem("userType");
    this.loader.showLoading();
    this.voter.boothWiseVoterList(this.partNo).subscribe((data)=>{
      this.loader.hideLoader();
      if(data){
        this.partNo = this.partNo
        this.voterByPart = data;
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    }, (err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
    })
  }

  goBack(){
    this.location.back();
  }

   voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }
   

   EditVoter(data:any){
     this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
   }

   resetForm(){
    this.myForm1.reset();
  }

  searchData(){
    if(this.searchModal.LastName == ''){
      this.searchModal.LastName = null
    }
    else{
      this.searchModal.LastName = this.searchModal.LastName
    }
    if(this.searchModal.FirstName == ''){
      this.searchModal.FirstName = null
    }
    else{
      this.searchModal.FirstName = this.searchModal.FirstName 
    }
    if(this.searchModal.MiddleName == ''){
      this.searchModal.MiddleName = null
    }
    else{
      this.searchModal.MiddleName = this.searchModal.MiddleName 
    }
    if(this.searchModal.VotingCardNo == ''){
      this.searchModal.VotingCardNo = null
    }
    else{
      this.searchModal.VotingCardNo = this.searchModal.VotingCardNo 
    }
    if(this.searchModal.PartNo == ''){
      this.searchModal.PartNo = null
    }
    else{
      this.searchModal.PartNo = this.searchModal.PartNo 
    }
    if(this.searchModal.MobileNo == ''){
      this.searchModal.MobileNo = null
    }
    else{
      this.searchModal.MobileNo = this.searchModal.MobileNo 
    }
    if(this.searchModal.HouseNo == ''){
      this.searchModal.HouseNo = null
    }
    else{
      this.searchModal.HouseNo = this.searchModal.HouseNo 
    }
    if(this.searchModal.FromAge == ''){
      this.searchModal.FromAge = null
    }
    else{
      this.searchModal.FromAge = this.searchModal.FromAge;
    }
    if(this.searchModal.ToAge == ''){
      this.searchModal.ToAge = null
    }
    else{
      this.searchModal.ToAge = this.searchModal.ToAge;
    }
    if(this.searchModal.Gender == ''){
      this.searchModal.Gender = null
    }
    else{
      this.searchModal.Gender = this.searchModal.Gender;
    }
    if(this.searchModal.Village == ''){
      this.searchModal.Village = null
    }
    else{
      this.searchModal.Village = this.searchModal.Village;
    }
    this.searchModal.UserId = Number(this.userId);
    this.searchModal.roleID = Number(this.roleID);
    this.searchModal.PartNo = this.partNo;
    this.loader.showLoading();
    this.voter.advanceSearch(this.searchModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.voterByPart = data;
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    }, (err)=>{
      this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
    })
  }



}


