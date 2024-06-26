import { Component, OnInit } from '@angular/core';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-datewise-enquiry',
  templateUrl: './datewise-enquiry.component.html',
  styleUrls: ['./datewise-enquiry.component.css']
})
export class DatewiseEnquiryComponent implements OnInit {

  searchEnqModal:any={}
  UserId:any;
  RoleId:any;
  NoofRow:any=10;
  PageNo:any=1;
  workList:any;
  searchedList:any;
  totalItems:any;
 

  constructor(
    private enquiry:EnquiryService,
    private toast:IonicToastService,
    private router:Router,
    private loader:LoaderService,
    private excel:ExcelService,
    private csv:CsvService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.UserId=localStorage.getItem('loginId');
    this.RoleId=localStorage.getItem('userType');
    this.getAllWork();
  }

  goBack() {
    this.location.back();
  }

  event(event){
    this.PageNo=event;
    this. datewiseList();
  }

  getAllWork(){
    this.enquiry.getWork().subscribe(data=>{
      this.workList = data;
    },(err)=>{

    })
  }

  datewiseList(){
    this.loader.showLoading();
    if(this.searchEnqModal.ToDate==undefined){
      this.searchEnqModal.ToDate = ''
    }
    else{
      this.searchEnqModal.ToDate = this.searchEnqModal.ToDate;
    }
    this.enquiry.enquiryByDate(
      this.searchEnqModal.UserId = Number(this.UserId),
      this.searchEnqModal.RoleId = Number(this.RoleId),
      this.searchEnqModal.PageNo = Number(this.PageNo),
      this.searchEnqModal.NoofRow = Number(this.NoofRow),
      this.searchEnqModal.TypeofWork,
      this.searchEnqModal.FromDate,
      this.searchEnqModal.ToDate
      ).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.searchedList=data;
        this.totalItems=data[0].totalCount;
        this.searchedList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  exportToCSV() {
    debugger;
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.loader.showLoading();
    this.enquiry.enquiryByDate(
      this.searchEnqModal.UserId = Number(this.UserId),
      this.searchEnqModal.RoleId = Number(this.RoleId),
      this.searchEnqModal.PageNo = Number(this.PageNo),
      this.searchEnqModal.NoofRow = Number(this.NoofRow),
      this.searchEnqModal.TypeofWork,
      this.searchEnqModal.FromDate,
      this.searchEnqModal.ToDate).subscribe(data=>{
      if(data!= 0){
        this.loader.hideLoader();
        this.searchedList = data;
        this.totalItems = data[0].totalCount;
        this.csv.exportToCsv(this.searchedList, 'Enquiry');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
        this.searchedList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  exportExcel() {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.loader.showLoading();
    this.enquiry.enquiryByDate(
      this.searchEnqModal.UserId = Number(this.UserId),
      this.searchEnqModal.RoleId = Number(this.RoleId),
      this.searchEnqModal.PageNo = Number(this.PageNo),
      this.searchEnqModal.NoofRow = Number(this.NoofRow),
      this.searchEnqModal.TypeofWork,
      this.searchEnqModal.FromDate,
      this.searchEnqModal.ToDate).subscribe(data=>{
      if(data!= 0){
        this.loader.hideLoader();
        this.searchedList = data;
        this.totalItems = data[0].totalCount;
        this.excel.exportAsExcelFile(this.searchedList, 'Enquiry');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
        this.searchedList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
