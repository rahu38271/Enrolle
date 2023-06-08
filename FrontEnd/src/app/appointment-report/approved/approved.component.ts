import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router, NavigationEnd } from '@angular/router';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AlertController,ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {
  isModalOpen = false;
  getApmList:any;
  status:any;
  Status:any;
  id:any;
  Id:any;
  value:any;
  dateTime:any;
  apmId:any;
  apmStatus:string;
  rowId:any;
  isShow=false;

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  updateStatusModal:any={
    Id:'',
    Status:'',
    dateTime:''
  }

  UserId:any;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=10;
  SearchText:any;
  totalItems:any;

  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private appointment:AppointmentService,
    private router:Router, 
    private toast:IonicToastService,
    public modalCtrl: ModalController,
    private location: Location,
    public alertController: AlertController,
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
    this.approvedList(this.UserId,this.roleID,this.PageNo,this.NoofRow,this.SearchText);
    
  }
  
  event(event:any){
    this.PageNo=event
    this.approvedList(this.UserId,this.roleID,this.PageNo,this.NoofRow,this.SearchText);
  }

  approvedList(UserId:any,roleID:any,PageNo:any,NoofRow:any,SearchText:any){
    this.appointment.getApprovedAppointments(UserId,roleID,PageNo,NoofRow,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.getApmList = data
        this.totalItems = data[0].totalCount;
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else{
      }
    },(err)=>{

    })
    
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText=='') {
      this.PageNo = 1;
      this.SearchText = SearchText;
      this.NoofRow = this.totalItems;
      this.approvedList(this.UserId,this.roleID,this.PageNo,this.NoofRow,this.SearchText);
    }
    else {
      this.PageNo=1
      this.NoofRow=4;
      this.SearchText=SearchText;
      this.appointment.getApprovedAppointments(this.UserId, this.roleID, this.PageNo, this.NoofRow, this.SearchText).subscribe(data=> {
        if (data) {
          // this.getApmList = data.filter(this.isBigEnough);
          this.getApmList = data;
          this.totalItems = data[0].totalCount
          this.getApmList.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0];
          });
        }
      })
    }
  }

  keyPress(SearchText: any) {
    if (this.SearchText=='') {
      this.PageNo = 1;
      this.SearchText = SearchText;
      this.NoofRow = this.totalItems;
      this.approvedList(this.UserId,this.roleID,this.PageNo,this.NoofRow,this.SearchText);
    }
    else {
      this.PageNo=1
      this.NoofRow=4;
      this.SearchText=SearchText;
      this.appointment.getApprovedAppointments(this.UserId, this.roleID, this.PageNo, this.NoofRow, this.SearchText).subscribe((data: any) => {
        if (data) {
          // this.getApmList = data.filter(this.isBigEnough);
          this.getApmList = data;
          this.totalItems = data[0].totalCount
          this.getApmList.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0];
          });
        }
      })
    }
  }

  rejectApm(event){
    this.Id = event.target.id
    this.updateStatusModal.Id = Number(this.Id)
    this.updateStatusModal.Status = "Rejected"
    if(this.updateStatusModal.dateTime == ''){
      this.updateStatusModal.dateTime = ''
    }
    else{
      this.updateStatusModal.dateTime = this.updateStatusModal.dateTime
    }
    this.appointment.updateApmStatus(
      this.updateStatusModal.Id,
      this.updateStatusModal.Status,
      this.updateStatusModal.dateTime
      ).subscribe(data=>{
          if(this.updateStatusModal.Status == "Rejected"){
            this.updateStatusModal = {}
            this.router.navigate(['/approved-appointment/rejected']);
            this.toast.presentToast("Appointment rejected successfully!", "success", 'checkmark-circle-sharp');
          }
          
        })
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
  //         if(this.updateStatusModal.Status == "Rejected"){
  //           this.updateStatusModal = {}
  //           this.router.navigate(['/approved-appointment/rejected']);
  //           this.toast.presentToast("Appointment rejected successfully!", "success", 'checkmark-circle-sharp');
  //         }
          
  //       })
  // }

  rescheduleApm(event){
    this.isModalOpen = true;
    this.Id = event.target.id
  }

  closeReschedule(){
    this.isModalOpen = false;
    this.modalCtrl.dismiss();
  }

  goBack() {
    this.location.back();
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

  async deleteApm(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete Appointment',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Appointment',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'no',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          cssClass: 'yes',
          handler: () => {
            this.appointment.deleteAppointment(id).subscribe(data=>{
              this.ionViewWillEnter();
              this.toast.presentToast("Appointment deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow = this.totalItems;
    var SearchText = ''
    this.loader.showLoading();
    this.appointment.getApprovedAppointments(this.UserId,this.roleID,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getApmList = data;
        this.totalItems = data[0].totalCount;
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        this.toast.presentToast("File downloded successfully!", "success", 'checkmark-circle-sharp');
        this.excel.exportAsExcelFile(this.getApmList, 'approved appointment');
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
    this.appointment.getApprovedAppointments(this.UserId,this.roleID,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getApmList = data;
        this.totalItems = data[0].totalCount;
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        this.toast.presentToast("File downloded successfully!", "success", 'checkmark-circle-sharp');
        this.csv.exportToCsv(this.getApmList, 'approved appointment');
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
