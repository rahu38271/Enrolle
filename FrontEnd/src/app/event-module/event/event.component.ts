import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { Router } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  myForm1: any;
  Bdate = '';
  area = '';
  Bgroup = '';
  mobile = '';
  cp: number = 1;
  karyakartaModel: any = {};
  

  areaHeader: any = {
    header: 'एरिया'
  };

  bloodgroup: any = {
    header: 'रक्तगट'
  };

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
 
  constructor(public alertController: AlertController,public loadingController: LoadingController,public toastController: ToastController, private router:Router) { }

  resetForm(){
    this.myForm1.reset();
  }

  async downloadExcel() {
    const toast = await this.toastController.create({
      message: 'Request added to export.',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  async downloadPDF() {
    const toast = await this.toastController.create({
      message: 'Request added to download doc.',
      duration: 2000,
      position: 'top',
      color: 'primary',
    });
    toast.present();
  }

  ngOnInit() { 
    
  }

  onSubmit(){
    if(this.karyakartaModel.invalid){
      return;
    }
  }

  refresh(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/contact', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
 

  async deleteEvent() {
    const alert = await this.alertController.create({
      header: 'Delete Event ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Event',
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
            console.log('Confirm Ok');
          }
        }
      ],
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Searching...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  pdf() {
    var element = document.getElementById('table6');
    
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
