import { Component, OnInit, ViewChild, ElementRef     } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import html2pdf from 'html2pdf.js'
import { AppointmentService } from 'src/app/services/appointment.service'
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';


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
  totalApm:any;
  todayApm:any;
  approvedApm:any;
  rejectedApm:any;

  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public title: String;
  public palette1: string[];
  public legendSettings: Object;
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = ['#00bdae', '#5e6368', '#357cd2', '#f97369', '#29dd52'];
    args.fill = seriesColor[args.point.index];
  };

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
      this.totalApm = data[0].totalAppointment;
      this.todayApm = data[0].todayAppointment;
      this.approvedApm = data[0].approved;
      this.rejectedApm = data[0].rejected;

      this.datalabel = { visible: true };
      this.tooltip = { enable: true };
      this.title = 'Appointments';
      this.palette1 = ["#ccc", "#ffd34f", "#0bbb5f", "#f00"]
      this.apmCount = [
        { 'x': 'All', y: this.totalApm }, { 'x': 'Today', y: this.todayApm },
        { 'x': 'Approved', y: this.approvedApm }, { 'x': 'Rejected', y: this.rejectedApm }
      ];
    })
  }

}
