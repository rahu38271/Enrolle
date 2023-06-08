import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { ReportsService } from 'src/app/services/reports.service';
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-userwise',
  templateUrl: './userwise.component.html',
  styleUrls: ['./userwise.component.css']
})
export class UserwiseComponent implements OnInit {
  
  @ViewChild(IonModal) modal: IonModal;
  isModalOpen = false;
  roleName:string;
  ReportByUser:any; 
  searchWeb:string;
  year : number = new Date().getFullYear();
  myForm1: any;
  searchModal:any={
    
  }
  Status:any;
  id:any;
  Id:any;
  value:any;
  dateTime:any;
  apmId:any;
  apmStatus:string;
  rowId:any;

  userId:any;
  roleId:any;
  isShow = false;
  PageNo:any=1;
  NoofRow:any=25;
  maxDate:String = new Date().toISOString();
 
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private loader:LoaderService,
    private router:Router, 
    private toast:IonicToastService,
    private location: Location,
    private report:ReportsService
  ) { }

  ngOnInit(): void {
    if(this.roleId == 1){
      this.roleName = "MasterAdmin"
    }
    if(this.roleId == 2){
      this.roleName = "SuperAdmin"
    }
    if(this.roleId == 3){
      this.roleName = "Admin"
    }
    if(this.roleId == 4){
      this.roleName = "Volunteer"
    }
    if(this.roleId == 5){
      this.roleName = "Society"
    }
    if(this.roleId == 6){
      this.roleName = "Member"
    }
  }

  ionViewWillEnter(){
    this.userId = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType")
  }

 event(event:any){
  this.PageNo=event;
 }

  resetForm(){
    this.myForm1.reset();
  }

  goBack() {
    this.location.back();
  }

  search(){
    this.isShow = true ;
    this.searchModal.Id = Number(this.userId);
    this.searchModal.RoleId = Number(this.roleId)
    if(this.searchModal.ToDate == ''){
      this.searchModal.ToDate = this.searchModal.FromDate
    }
    else{
      this.searchModal.ToDate = this.searchModal.ToDate
    }
    this.report.getReportByUser(
      this.searchModal.FromDate,
      this.searchModal.ToDate,
      this.searchModal.Id = this.searchModal.Id,
      this.searchModal.RoleId =  this.searchModal.RoleId
      ).subscribe(data=>{
      if(data.length != 0){
        //this.loader.hideLoader();
        this.ReportByUser = data;
        this.toast.presentToast("searhced successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        //this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      //this.loader.hideLoader();
      //this.toast.presentToast("Something went wrong", "danger", 'alert-circle-sharp');
    })
  }

  userDetails(userId:any){
    debugger;
    this.router.navigate(['reports',{userId:userId}])
  }

}
