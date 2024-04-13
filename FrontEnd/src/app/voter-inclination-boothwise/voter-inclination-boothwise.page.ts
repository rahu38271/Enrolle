import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-voter-inclination-boothwise',
  templateUrl: './voter-inclination-boothwise.page.html',
  styleUrls: ['./voter-inclination-boothwise.page.scss'],
})
export class VoterInclinationBoothwisePage implements OnInit {

  myForm1: any;
  Caste = '';
   @ViewChild('epltable', { static: false }) epltable: ElementRef;
 
   CasteHeader: any = {
     header: 'Caste'
   };
 
   purposeHeader: any = {
     header: 'कार्यक्रमाचे स्वरूप'
   };
   user: any = {
     header: 'वापरकर्ता'
   }
 
   constructor(public alertController: AlertController,public toastController: ToastController) { }
 
   resetForm1(){
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
 
   
 
 
   exportexcel() {
     const ws: xlsx.WorkSheet =
       xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
     xlsx.writeFile(wb, 'epltable.xlsx');
   }
 
   pdf() {
     var element = document.getElementById('table36');
     
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
