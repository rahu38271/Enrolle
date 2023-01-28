import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { AlertController } from '@ionic/angular';
import { AssemblyService } from 'src/app/services/assembly.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router} from '@angular/router'

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.css']
})
export class AssemblyComponent implements OnInit {

  isShow = false;
  getAssembly:any;
  searchWeb: string;
  currentDate = new Date();

  search(){
    this.isShow = !this.isShow
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor
    (
      public alertController: AlertController, 
      private assembly:AssemblyService,
      private loader:LoaderService,
      private router:Router
    ) { 
    
  }

  assemblyList(){
    this.loader.showLoading();
    this.assembly.getAssemblyData().subscribe(data=>{
      console.log(data);
      this.loader.hideLoader();
      this.getAssembly = data;
    })
  }

  ngOnInit(): void {
    this.assemblyList();
  }

  EditAssembly(data:any){
    this.router.navigateByUrl('/assembly/edit-assembly', {state: data});
  }



  async deleteAssembly() {
    const alert = await this.alertController.create({
      header: ' Delete Assembly ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this assembly ?',
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
    xlsx.writeFile(wb, 'users.xlsx');
  }

  pdf() {
    var element = document.getElementById('userAdminTable');
    
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
