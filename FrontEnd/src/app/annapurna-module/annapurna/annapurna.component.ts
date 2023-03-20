<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController,ModalController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
>>>>>>> feature/partassign

@Component({
  selector: 'app-annapurna',
  templateUrl: './annapurna.component.html',
  styleUrls: ['./annapurna.component.css']
})
export class AnnapurnaComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit(): void {
=======
  year : number = new Date().getFullYear();

  myForm1: any;
  Adate = '';
  Status = '';
  Priority = '';
  Responsibility = '';

  status: any = {
    header: 'सद्यस्थिती'
  };

  preference: any = {
    header: ' प्राधान्य'
  };

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  closeModal() {
    this.modalCtrl.dismiss();
  }

  constructor(public modalCtrl: ModalController,public alertController: AlertController,public loadingController: LoadingController,public toastController: ToastController) { }

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

  async deleteAppointment() {
    const alert = await this.alertController.create({
      header: 'Delete बैठक नोंदी ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this बैठक नोंदी',
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
>>>>>>> feature/partassign
  }

}
