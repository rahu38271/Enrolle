import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'


@Component({
  selector: 'app-karyakarta',
  templateUrl: './karyakarta.component.html',
  styleUrls: ['./karyakarta.component.scss'],
})
export class KaryakartaComponent implements OnInit {

  myForm1: any;
  Bdate = '';
  area = '';
  Bgroup = '';
  mobile = '';

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
 
  constructor(public alertController: AlertController,public loadingController: LoadingController,public toastController: ToastController) { }

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
    

    // $('#table6').DataTable({
    //   lengthMenu: [ [25, 50, 100, -1], [25, 50, 100, "All"] ],
    //   pageLength: 25,
    //   autoWidth: false,
    //   "columnDefs": [
    //     { "width": "40px", "targets": 0 },
    //     { "width": "200px", "targets": 1 },
    //     { "width": "100px", "targets": 2 },
    //     { "width": "50px", "targets": 3 },
    //     { "width": "70px", "targets": 4 },
    //     { "width": "100px", "targets": 5 },
    //     { "width": "50px", "targets": 6 },
    //     { "width": "100px", "targets": 7 },
    //     { "width": "100px", "targets": 8 },
    //     { "width": "40px", "targets": 9 }
    //   ],
    // });
  }

  onSubmit(){
    if(this.karyakartaModel.invalid){
      return;
    }
  }
 

  async deleteKaryakarta() {
    const alert = await this.alertController.create({
      header: 'Delete कार्यकर्ते ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this कार्यकर्ते',
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


  exportExcel() {
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
