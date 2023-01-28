import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-daily-work',
  templateUrl: './daily-work.page.html',
  styleUrls: ['./daily-work.page.scss'],
})
export class DailyWorkPage implements OnInit {

  currentDate = new Date();

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(public toastController: ToastController) { 
    
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

  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
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

  ngOnInit() {
    $('#table2').DataTable({
      lengthMenu: [ [25, 50, 100, -1], [25, 50, 100, "All"] ],
      pageLength: 25,
      autoWidth: false,
      "columnDefs": [
        { "width": "40px", "targets": 0 },
        { "width": "500px", "targets": 1 },
        { "width": "300px", "targets": 2 }
      ],
    });
  }

}
