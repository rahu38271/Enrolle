import { Component, OnInit, ViewChild, ElementRef     } from '@angular/core';
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


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
  
})
export class AppointmentComponent implements OnInit {

  isModalOpen = false;
  getApmList:any; 
  searchWeb:string;
  year : number = new Date().getFullYear();
  myForm1: any;
  searchApmModal:any={
    apmDate:'',
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
  apmCount:any;

  updateStatusModal:any={
    Id:'',
    Status:'',
    dateTime:''
  };
  UserId:any;
  roleID:any;
  isColumn = false
 
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  currentDate: number = Date.now();

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private appointment:AppointmentService,
    private loader:LoaderService,
    private router:Router, 
    private toast:IonicToastService,
    private excel:ExcelService,
    private csv:CsvService
    ) { }

    ngOnInit() {
      
      
      // this.router.events.pipe(
      //   filter(event => event instanceof NavigationEnd)
      // ).subscribe(() => {
      //   this.appoinmentList();
      //   this.apmCountData();
      // })
    }

    ionViewWillEnter() {
      this.UserId = localStorage.getItem("loginId");
      this.roleID = localStorage.getItem("userType")
      // if(this.roleID == 2){
      //   this.isSuperAdmin = !this.isSuperAdmin
      // }
      // else{
      //   this.isSuperAdmin = this.isSuperAdmin
      // }
      this.appoinmentList();
      this.apmCountData();
  }

    isBigEnough(element, index, array) { 
      return (element.status == "" || element.status == null ); 
   } 

   showColumn(){
     this.isColumn = !this.isColumn
   }

  appoinmentList(){
    this.appointment.getAppointments(this.UserId,this.roleID).subscribe((data:any)=>{
      if(data != 0){
        this.getApmList = data.filter(this.isBigEnough);
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else{
      }
    },(err)=>{

    })
  }

  

  apmCountData(){
    this.appointment.getApmCounts(this.UserId,this.roleID).subscribe(data=>{
      this.apmCount = data
    })
  }

  editAppointment(data:any){
    this.router.navigateByUrl('/appointment/edit-appointment', { state: data });
  }

  resetForm(){
    this.myForm1.reset();
  }

  reschedule(event){
    this.isModalOpen = true;
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


  // exportexcel() {
  //   const ws: xlsx.WorkSheet =
  //     xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   xlsx.writeFile(wb, 'epltable.xlsx');
  // }

  exportExcel():void {
    this.excel.exportAsExcelFile(this.getApmList, 'appointment');
  }

  exportToCSV() {
    this.csv.exportToCsv(this.getApmList, 'appointment');
  }

  exportPDF() {
    var element = document.getElementById('table13');
    
    var opt = {
      margin: 0.2,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();{};

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}
