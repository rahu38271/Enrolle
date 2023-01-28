import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-mobiledata-group',
  templateUrl: './mobiledata-group.component.html',
  styleUrls: ['./mobiledata-group.component.scss'],
})
export class MobiledataGroupComponent implements OnInit {

  myForm1: any;
  GroupName = '';
  

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
 
  constructor(public alertController: AlertController,public toastController: ToastController) { }

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
    $('#table33').DataTable({
      lengthMenu: [ [25, 50, 100, -1], [25, 50, 100, "All"] ],
      pageLength: 25,
      autoWidth: false,
      "columnDefs": [
        { "width": "50px", "targets": 0 },
        { "width": "400px", "targets": 1 },
        { "width": "50px", "targets": 2 },
      ],
    });
  }

  async deleteMdataGroup() {
    const alert = await this.alertController.create({
      header: 'Delete Mobiledata Group ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Mobiledata Group',
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
    var element = document.getElementById('table33');
    
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
