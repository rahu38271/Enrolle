import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import html2pdf from 'html2pdf.js'
import { AppointmentService } from 'src/app/services/appointment.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router, NavigationEnd } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.css']
})
export class AllAppointmentsComponent implements OnInit {
  isShow=false;
  isModalOpen = false;
  getApmList: any;
  searchWeb: string;
  year: number = new Date().getFullYear();
  myForm1: any;
  searchApmModal: any = {
    apmDate: '',
    UserId: '',
    roleID: ''
  }
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
  };
  UserId: any;
  roleID: any;
  isColumn = false
  PageNo: any = 1;
  NoofRow: any = 10;
  SearchText: String = '';
  totalItems: any;
  allDataExport:any;
  search(){
    this.isShow = !this.isShow
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  currentDate: number = Date.now();

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private appointment: AppointmentService,
    private loader: LoaderService,
    private router: Router,
    private toast: IonicToastService,
    private excel: ExcelService,
    private csv: CsvService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    if (this.SearchText == undefined) {
      this.SearchText = ''
    }
    else {
      this.SearchText = this.SearchText
    }
  }

  ionViewWillEnter() {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.appoinmentList(this.UserId, this.roleID, this.PageNo, this.NoofRow, this.SearchText);

  }

  event(event: any) {
    this.PageNo = event;
    this.appoinmentList(this.UserId, this.roleID, event, this.NoofRow, this.SearchText);
  }

  // isBigEnough(element, index, array) {
  //   return (element.status == "" || element.status == null);
  // }

  showColumn() {
    this.isColumn = !this.isColumn
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  appoinmentList(UserId: any, roleID: any, PageNo: any, NoofRow: any, SearchText: any) {
    this.appointment.getAppointments(UserId, roleID, PageNo, NoofRow, this.SearchText).subscribe((data: any) => {
      if (data.length != 0) {
        // this.getApmList = data.filter(this.isBigEnough);
        this.getApmList = data;
        this.totalItems = data[0].totalCount
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else {
      }
    }, (err) => {

    })
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText=='') {
      this.PageNo = 1;
      this.SearchText = SearchText;
      this.NoofRow = this.totalItems;
      this.appoinmentList(this.UserId, this.roleID, this.PageNo, this.NoofRow, SearchText);
    }
    else {
      this.PageNo=1
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.appointment.getAppointments(this.UserId, this.roleID, this.PageNo, this.NoofRow, this.SearchText).subscribe(data=> {
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
      this.appoinmentList(this.UserId, this.roleID, this.PageNo, this.NoofRow, SearchText);
    }
    else {
      this.PageNo=1
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.appointment.getAppointments(this.UserId, this.roleID, this.PageNo, this.NoofRow, this.SearchText).subscribe((data: any) => {
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



  editAppointment(data: any) {
    this.router.navigateByUrl('/appointment/edit-appointment', { state: data });
  }

  resetForm() {
    this.myForm1.reset();
  }

  reschedule(event) {
    this.isModalOpen = true;
  }

  goBack() {
    this.location.back();
  }

  changeStatus(event) {
    this.Id = event.target.id
    this.updateStatusModal.Id = Number(this.Id)
    this.updateStatusModal.Status = this.updateStatusModal.Status;
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
      else if (this.updateStatusModal.Status == "Rejected") {
        this.updateStatusModal = {}
        this.router.navigate(['/approved-appointment/rejected']);
        this.toast.presentToast("Appointment rejected successfully!", "success", 'checkmark-circle-sharp');
      }
    })
  }


  async deleteApm(id: any) {
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
            this.appointment.deleteAppointment(id).subscribe(data => {
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

  exportExcel(): void {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = '';
    this.loader.showLoading();
    this.appointment.getAppointments(this.UserId, this.roleID, this.PageNo, this.NoofRow,SearchText).subscribe((data: any) => {
      if (data.length != 0) {
        this.loader.hideLoader();
        // this.getApmList = data.filter(this.isBigEnough);
        this.getApmList = data;
        this.totalItems = data[0].totalCount
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        this.excel.exportAsExcelFile( this.getApmList, 'appointment');
        this.toast.presentToast("File downloded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
    })
  }

  exportToCSV() {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = ''
    this.loader.showLoading();
    this.appointment.getAppointments(this.UserId, this.roleID, this.PageNo, this.NoofRow,SearchText).subscribe((data: any) => {
      if (data.length != 0) {
        // this.getApmList = data.filter(this.isBigEnough);
        this.loader.hideLoader();
        this.getApmList = data;
        this.getApmList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        this.csv.exportToCsv(this.getApmList, 'appointment');
        this.toast.presentToast("File downloded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
    })
    
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
    html2pdf().set(opt).from(element).save(); { };

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}
