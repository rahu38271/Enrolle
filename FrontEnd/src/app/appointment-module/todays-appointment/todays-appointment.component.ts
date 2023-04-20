import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(
    public alertController: AlertController,
    private appointment:AppointmentService,
    private excel:ExcelService,
    private csv:CsvService,
    private router:Router, 
    private toast:IonicToastService
    ) {
    
   }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.todayApmList();
  }

  todayApmList(){
    this.appointment.todaysApm(this.UserId,this.roleID).subscribe(data=>{
      if(data != 0){
        this.todayApm = data;
        this.todayApm.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else{

      }
    })
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
              this.ngOnInit();
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
