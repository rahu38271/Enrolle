import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { AlertController } from '@ionic/angular';
import { SuperadminService} from 'src/app/services/superadmin.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router} from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  
  Template = '';
  Content = '';
  NormalMsg = '';
  whatsappMsg = '';
  isShow = false;
  searchWeb: string;
  cp: number = 1;
  
  TemplateHeader:any = {
    header: 'Select Template'
  }

  currentDate = new Date();
  getAllMAdmin: any;

  search(){
    this.isShow = !this.isShow
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor
    (
      public alertController: AlertController,
      private sadmin:SuperadminService,
      private loader:LoaderService,
      private router:Router,
      private location: Location
    ) 
    {

     }

    getMAdmin(){
      this.sadmin.getAllMAdmin().subscribe(data=>{
        this.loader.showLoading();
        if(data != 0){
          this.getAllMAdmin = data;
          this.loader.hideLoader();
        }
        else{
          
        }
      })
    }

    EditSA(data:any){
      this.router.navigateByUrl('/superadmin/edit-superadmin', {state:data})
    }

    SAdetails(id:number){
      this.router.navigate(['/superadmin/account', id])
    }

  ngOnInit() {
    this.getMAdmin();
  }

  goBack(){
    this.location.back();
  }

  async deleteSA() {
    const alert = await this.alertController.create({
      header: ' Delete Superadmin ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this superadmin',
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

}
