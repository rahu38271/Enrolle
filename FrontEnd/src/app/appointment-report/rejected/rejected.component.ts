import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ModalController } from '@ionic/angular';


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

  constructor(
    private appointment: AppointmentService,
    private router: Router,
    private toast: IonicToastService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.rejectedList();
    })

  }

  

  isBigEnough(element, index, array) {
    return (element.status == "Rejected");
  }

  rejectedList() {
    this.appointment.getAppointments(this.UserId,this.roleID).subscribe(data => {
      if (data != 0) {
        this.getApmList = data.filter(this.isBigEnough)
      }
      else {
      }
    }, (err) => {

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
    debugger;
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

}
