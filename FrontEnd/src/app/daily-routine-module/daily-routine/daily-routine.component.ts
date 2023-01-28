import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController ,ToastController  } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'


@Component({
  selector: 'app-daily-routine',
  templateUrl: './daily-routine.component.html',
  styleUrls: ['./daily-routine.component.scss'],
})
export class DailyRoutineComponent implements OnInit {
  myForm1: any;
  date1 = '';
  User = '';
  purpose = '';
  place = '';
  progDate = '';
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  placeHeader: any = {
    header: 'कार्यक्रमाचे ठिकाण'
  };

  purposeHeader: any = {
    header: 'कार्यक्रमाचे स्वरूप'
  };
  user: any = {
    header: 'वापरकर्ता'
  }

  constructor(public alertController: AlertController,public loadingController: LoadingController,public toastController: ToastController) { }

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

  ngOnInit() { 
    $('#table5').DataTable({
      lengthMenu: [ [5, 50, 100, -1], [25, 50, 100, "All"] ],
      pageLength: 5,
      autoWidth: false,
      "columnDefs": [
        { "width": "40px", "targets": 0 },
        { "width": "100px", "targets": 1 },
        { "width": "80px", "targets": 2 },
        { "width": "100px", "targets": 3 },
        { "width": "100px", "targets": 4 },
        { "width": "100px", "targets": 5 },
        { "width": "100px", "targets": 6 },
        { "width": "75px", "targets": 7 },
        { "width": "40px", "targets": 8 }
      ],
    });
  }

  async deleteRoutine() {
    const alert = await this.alertController.create({
      header: ' Delete Routine ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this routine',
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

  


  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  pdf() {
    var element = document.getElementById('table5');
    
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
