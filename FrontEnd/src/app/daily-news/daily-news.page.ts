import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-daily-news',
  templateUrl: './daily-news.page.html',
  styleUrls: ['./daily-news.page.scss'],
})
export class DailyNewsPage implements OnInit {

  currentDate = new Date();

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(public toastController: ToastController) { }

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
    $('#table3').DataTable({
      lengthMenu: [ [25, 50, 100, -1], [25, 50, 100, "All"] ],
      pageLength: 25,
      autoWidth: false,
      "columnDefs": [
        { "width": "40px", "targets": 0 },
        { "width": "300px", "targets": 1 },
        { "width": "200px", "targets": 2 },
        { "width": "200px", "targets": 3 },
        { "width": "200px", "targets": 4 },
        { "width": "200px", "targets": 5 }
      ],
    });
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

}
