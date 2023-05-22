import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router, NavigationEnd } from '@angular/router';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {
  isModalOpen = false;
  getApmList: any;
  status: any;
  Status: any;
  id: any;
  Id: any;
  value: any;
  dateTime: any;
  apmId: any;
  apmStatus: string;
  rowId: any;

  updateStatusModal: any = {
    Id: '',
    Status: '',
    dateTime: ''
  }

  UserId:any;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=10;
  SearchText:any;
  totalItems:any;

  constructor(
    private appointment: AppointmentService,
    private router: Router,
    private toast: IonicToastService,
    public modalCtrl: ModalController,
    private location: Location,
    private loader:LoaderService,
    private excel:ExcelService,
    private csv:CsvService,
  ) { }

  ngOnInit(): void {
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
  }

  ionViewWillEnter(){
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.rejectedList(this.UserId,this.roleID,this.PageNo,this.NoofRow,this.SearchText);
    
  }

  goBack() {
    this.location.back();
  }



  rejectedList(UserId:any,roleID:any,PageNo:any,NoofRow:any,SearchText:any) {
    this.appointment.getRejectedAppointments(UserId,roleID,PageNo,NoofRow,this.SearchText).subscribe(data => {
      if (data.length != 0) {
        this.getApmList = data;
        this.totalItems=data[0].totalCount;
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else {
      }
    }, (err) => {

    })

  }

  event(event:any){
    this.PageNo=event
    this.rejectedList(this.UserId,this.roleID,this.PageNo,this.NoofRow,this.SearchText);
  }

  // changeStatus(event){
  //   this.Id = event.target.id
  //   this.updateStatusModal.Id = Number(this.Id)
  //   this.updateStatusModal.Status = this.updateStatusModal.Status;
  //   if(this.updateStatusModal.dateTime == ''){
  //     this.updateStatusModal.dateTime = ''
  //   }
  //   else{
  //     this.updateStatusModal.dateTime = this.updateStatusModal.dateTime
  //   }
  //   this.appointment.updateApmStatus(
  //     this.updateStatusModal.Id,
  //     this.updateStatusModal.Status,
  //     this.updateStatusModal.dateTime
  //     ).subscribe(data=>{
  //         if(this.updateStatusModal.Status == "Approved"){
  //           this.updateStatusModal = {}
  //           this.router.navigate(['/approved-appointment']);
  //           this.toast.presentToast("Appointment approved successfully!", "success", 'checkmark-circle-sharp');
  //         }
  //         else if(this.updateStatusModal.Status == "Reschedule"){
  //           this.updateStatusModal = {}
  //           this.router.navigate(['/approved-appointment']);
  //           this.toast.presentToast("Appointment approved successfully!", "success", 'checkmark-circle-sharp');
  //         }

  //       })
  //   }

  approveApm(event) {
    this.Id = event.target.id
    this.updateStatusModal.Id = Number(this.Id)
    this.updateStatusModal.Status = "Approved"
    if (this.updateStatusModal.dateTime == '') {
      this.updateStatusModal.dateTime = ''
    }
    else {
      this.updateStatusModal.dateTime = this.updateStatusModal.dateTime
    }
    this.appointment.updateApmStatus(
      this.updateStatusModal.Id,
      this.updateStatusModal.Status,
      this.updateStatusModal.dateTime
    ).subscribe(data => {
      if (this.updateStatusModal.Status == "Approved") {
        this.updateStatusModal = {}
        this.router.navigate(['/approved-appointment']);
        this.toast.presentToast("Appointment approved successfully!", "success", 'checkmark-circle-sharp');
      }
      else if (this.updateStatusModal.Status == "Reschedule") {
        this.updateStatusModal = {}
        this.router.navigate(['/approved-appointment']);
        this.toast.presentToast("Appointment approved successfully!", "success", 'checkmark-circle-sharp');
      }

    })
  }

  rescheduleApm(event){
    this.isModalOpen = true;
    this.Id = event.target.id
  }

  closeReschedule(){
    this.isModalOpen = false;
    this.modalCtrl.dismiss();
  }

  saveAppointment(){
    this.Id = this.Id
    this.updateStatusModal.Id = Number(this.Id)
    this.updateStatusModal.Status = "Reschedule"
    if (this.updateStatusModal.dateTime == '') {
      this.updateStatusModal.dateTime = ''
    }
    else {
      this.updateStatusModal.dateTime = this.updateStatusModal.dateTime
    }
    this.appointment.updateApmStatus(
      this.updateStatusModal.Id,
      this.updateStatusModal.Status,
      this.updateStatusModal.dateTime
    ).subscribe(data => {
      if (this.updateStatusModal.Status == "Approved") {
        this.updateStatusModal = {}
        this.router.navigate(['/approved-appointment']);
        this.toast.presentToast("Appointment approved successfully!", "success", 'checkmark-circle-sharp');
      }
      else if (this.updateStatusModal.Status == "Reschedule") {
        this.updateStatusModal = {}
        this.router.navigate(['/approved-appointment']);
        this.toast.presentToast("Appointment rescheduled successfully!", "success", 'checkmark-circle-sharp');
        this.closeReschedule();
      }

    })
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow = this.totalItems;
    var SearchText = ''
    this.loader.showLoading();
    this.appointment.getRejectedAppointments(this.UserId,this.roleID,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getApmList = data;
        this.totalItems = data[0].totalCount;
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        this.toast.presentToast("File downloded successfully!", "success", 'checkmark-circle-sharp');
        this.excel.exportAsExcelFile(this.getApmList, 'rejected appointment');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err)=>{
      this.loader.hideLoader();
    })
    
  }

  exportToCSV() {
    this.PageNo=1;
    this.NoofRow = this.totalItems;
    var SearchText = ''
    this.loader.showLoading();
    this.appointment.getRejectedAppointments(this.UserId,this.roleID,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getApmList = data;
        this.totalItems = data[0].totalCount;
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        this.toast.presentToast("File downloded successfully!", "success", 'checkmark-circle-sharp');
        this.csv.exportToCsv(this.getApmList, 'rejected appointment');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err)=>{
      this.loader.hideLoader();
    })
    
  }

}
