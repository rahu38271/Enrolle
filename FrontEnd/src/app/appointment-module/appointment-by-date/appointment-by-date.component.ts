import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { AppointmentService } from 'src/app/services/appointment.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-appointment-by-date',
  templateUrl: './appointment-by-date.component.html',
  styleUrls: ['./appointment-by-date.component.css']
})
export class AppointmentByDateComponent implements OnInit {

  isModalOpen = false;

  getApmList:any[]=[]; 
  searchWeb:string;
  year : number = new Date().getFullYear();
  myForm1: any;
  searchApmModal:any={
    FromDate:'',
    ToDate:'',
    UserId:'',
    roleID:''
  }
  Status:any;
  id:any;
  Id:any;
  value:any;
  dateTime:any;
  apmId:any;
  apmStatus:string;
  rowId:any;

  UserId:any;
  roleID:any;

  isShow = false;
 
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private appointment:AppointmentService,
    private loader:LoaderService,
    private router:Router, 
    private toast:IonicToastService,
    private excel:ExcelService,
    private csv:CsvService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
      this.roleID = localStorage.getItem("userType")
      //this.appoinmentList();
  }

  isBigEnough(element, index, array) { 
    return (element.status == "" || element.status == null ); 
 } 


  resetForm(){
    this.myForm1.reset();
  }

  goBack() {
    this.location.back();
  }

  search(){
    debugger
    this.isShow = !this.isShow; 
    this.loader.showLoading();
    this.searchApmModal.UserId = Number(this.UserId);
    this.searchApmModal.roleID = this.roleID;
    if(this.searchApmModal.ToDate == ''){
      this.searchApmModal.ToDate = this.searchApmModal.FromDate
    }
    else{
      this.searchApmModal.ToDate = this.searchApmModal.ToDate
    }
    this.appointment.searchAppointment(this.searchApmModal.UserId,this.searchApmModal.roleID,this.searchApmModal.FromDate,this.searchApmModal.ToDate).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.getApmList = data;
        this.toast.presentToast("Appointment searhced successfully!", "success", 'checkmark-circle-sharp');
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
          //e.appointmentDate = e.appointmentDate.split('T')[0];
        });
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Appointment not searhced", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Something went wrong", "danger", 'alert-circle-sharp');
    })
  }

  reschedule(event){
    this.isModalOpen = true;
  }


  exportExcel():void {
    this.excel.exportAsExcelFile(this.getApmList, 'appointment');
  }

  exportToCSV() {
    this.csv.exportToCsv(this.getApmList, 'appointment');
  }

  pdf() {
    var element = document.getElementById('table13');
    
    var opt = {
      margin: 0.2,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();{};

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}