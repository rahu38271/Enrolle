import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { AppointmentService } from 'src/app/services/appointment.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {

  getApmList:any; 
  searchWeb:string;
  year : number = new Date().getFullYear();
  myForm1: any;
  searchApmModal:any={
    apmDate:''
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private appointment:AppointmentService,
    private loader:LoaderService,
    private router:Router, 
    private toast:IonicToastService
    ) { }

    ngOnInit() {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.appoinmentList();
      })
    }

  appoinmentList(){
    this.loader.showLoading();
    
    this.appointment.getAppointments().subscribe(data=>{
      if(data != 0){
        this.getApmList = data;
        this.loader.hideLoader();
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  editAppointment(data:any){
    this.router.navigateByUrl('/appointment/edit-appointment', { state: data });
  }

  resetForm(){
    this.myForm1.reset();
  }

  search(){
    this.loader.showLoading();
    this.appointment.searchAppointment(this.searchApmModal.apmDate).subscribe(data=>{
      if(data){
        if(data != 0){
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
          this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
        }
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
              this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
              ).subscribe(() => {
                this.appoinmentList();
              })
              this.toast.presentToast("Appointment deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }


  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
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
