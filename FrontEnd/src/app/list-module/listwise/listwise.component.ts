import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-listwise',
  templateUrl: './listwise.component.html',
  styleUrls: ['./listwise.component.scss'],
 
})
export class ListwiseComponent implements OnInit {

  Template = '';
  Content = '';
  NormalMsg = '';
  whatsappMsg = '';
  
  
  
 

  currentDate = new Date();

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(public toastController: ToastController,public loadingController: LoadingController) { }

  ngOnInit() {
    
  }

  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Sending SMS...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  pdf() {
    var element = document.getElementById('table');
    
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
