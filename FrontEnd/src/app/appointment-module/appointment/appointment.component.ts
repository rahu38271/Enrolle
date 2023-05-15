import { Component, OnInit, ViewChild, ElementRef     } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import html2pdf from 'html2pdf.js'
import { AppointmentService } from 'src/app/services/appointment.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router, NavigationEnd } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
  
})
export class AppointmentComponent implements OnInit {

  id:any;
  Id:any;
  apmCount:any;
  UserId:any;
  roleID:any;

 
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  currentDate: number = Date.now();

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private appointment:AppointmentService
    ) { }

    ngOnInit() {

    }

    ionViewWillEnter() {
      this.UserId = localStorage.getItem("loginId");
      this.roleID = localStorage.getItem("userType")
      this.apmCountData();
  }


  apmCountData(){
    this.appointment.getApmCounts(this.UserId,this.roleID).subscribe(data=>{
      this.apmCount = data
    })
  }

}
