import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-todays-appointment',
  templateUrl: './todays-appointment.component.html',
  styleUrls: ['./todays-appointment.component.css']
})
export class TodaysAppointmentComponent implements OnInit {
  

  UserId:any;
  roleID:any;
  todayApm:any[]=[];
  currentDate = new Date();

  updateStatusModal:any={
    Id:'',
    Status:'',
    dateTime:''
  };
  Id:any;
  SearchText:any;
  PageNo:any=1;
  NoofRow:any=10;
  totalItems:any;

  constructor(
    public alertController: AlertController,
    private appointment:AppointmentService,
    private excel:ExcelService,
    private csv:CsvService,
    private router:Router, 
    private toast:IonicToastService,
    private location: Location,
    ) {
    
   }

  ngOnInit(): void {
    if(this.SearchText == undefined){
      this.SearchText = ""
    }
    else{
      this.SearchText = this.SearchText
    }
  }
  
  ionViewWillEnter(){
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.todayApmList(this.UserId,this.roleID,this.PageNo,this.NoofRow,this.SearchText);
  }

  event(event:any){
    this.PageNo=event
    this.todayApmList(this.UserId,this.roleID,this.PageNo,this.NoofRow,this.SearchText);
  }

  todayApmList(UserId:any,roleID:any,PageNo:any,NoofRow:any,SearchText:any){
    this.appointment.todaysApm(UserId,roleID,PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.todayApm = data;
        this.totalItems = data[0].totalCount;
        this.todayApm.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        
      }
      else{

      }
    })
  }

  

  goBack() {
    this.location.back();
  }

  editAppointment(data:any){
    this.router.navigateByUrl('/appointment/edit-appointment', { state: data });
  }

  changeStatus(event){
    this.Id = event.target.id
    this.updateStatusModal.Id = Number(this.Id)
    this.updateStatusModal.Status = this.updateStatusModal.Status;
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
          if(this.updateStatusModal.Status == "Approved"){
            this.updateStatusModal = {}
            this.router.navigate(['/approved-appointment']);
            this.toast.presentToast("Appointment approved successfully!", "success", 'checkmark-circle-sharp');
          }
          else if(this.updateStatusModal.Status == "Rejected"){
            this.updateStatusModal = {}
            this.router.navigate(['/approved-appointment/rejected']);
            this.toast.presentToast("Appointment rejected successfully!", "success", 'checkmark-circle-sharp');
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
    this.excel.exportAsExcelFile(this.todayApm, 'appointment');
  }

  exportToCSV() {
    this.csv.exportToCsv(this.todayApm, 'appointment');
  }



}
