import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { ReportsService } from 'src/app/services/reports.service';
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-datewise-report',
  templateUrl: './datewise-report.component.html',
  styleUrls: ['./datewise-report.component.css']
})
export class DatewiseReportComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  isModalOpen = false;

  getReportList:any; 
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
  FromDate:any;

  UserId:any;
  roleID:any;

  isShow = false;
  totalItems:any;
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
    
  }

  ionViewWillEnter(){
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
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
    debugger;
    this.isShow = true 
    //this.loader.showLoading();
    this.searchModal.UserId = Number(this.UserId);
    this.searchModal.roleID = Number(this.roleID);
    this.searchModal.PageNo = this.PageNo;
    this.searchModal.NoofRow = this.NoofRow;
    if(this.searchModal.ToDate == ''){
      this.searchModal.ToDate = this.searchModal.FromDate
    }
    else{
      this.searchModal.ToDate = this.searchModal.ToDate
    }
    this.report.getReportByDate(
      this.searchModal.UserId,
      this.searchModal.roleID,
      this.searchModal.PageNo,
      this.searchModal.NoofRow,
      this.searchModal.FromDate,
      this.searchModal.ToDate,
      ).subscribe(data=>{
      if(data.length != 0){
        //this.loader.hideLoader();
        this.getReportList = data;
        this.toast.presentToast("Appointment searhced successfully!", "success", 'checkmark-circle-sharp');
        this.totalItems = data[0].totalCount;
        this.getReportList.forEach(e => {
          e.date = e.date.split('T')[0];
        });
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

}
