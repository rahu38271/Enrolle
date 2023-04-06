import { Component, OnInit, ViewChild, ElementRef,ChangeDetectorRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { AlertController } from '@ionic/angular';
import { SuperadminService } from 'src/app/services/superadmin.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { SocietyService } from 'src/app/services/society.service'


@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.css']
})
export class SocietyComponent implements OnInit {

  getSocietyList:any;

  isShow = false;
  searchWeb: string;
  cp: number = 1;
  getAdminList: any = [];

  currentDate = new Date();
  roleId: any;
  superId:any;
  adminid:any;
  id:any;
  roleName: string;
 
  search() {
    this.isShow = !this.isShow
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor
    (
      public alertController: AlertController,
      private sadmin: SuperadminService,
      private loader: LoaderService,
      private router: Router,
      private location: Location,
      private toast: IonicToastService,
       private route: ActivatedRoute,
       private changeDetection: ChangeDetectorRef,
       private society:SocietyService
    ) {
      
  }

  ngOnInit() {
    this.roleId = Number(this.roleId)
    this.id = localStorage.getItem("loginId");
    // to update view data
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.societyList();
    })
  }

  societyList(){
    //this.loader.showLoading();
    this.society.getAllSociety().subscribe(data=>{
      if(data != 0){
        this.loader.hideLoader();
        this.getSocietyList = data
      }
      else{
        //this.loader.hideLoader();
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  

  EditSociety(data: any) {
    this.router.navigateByUrl('/society/edit-society', { state: data })
  }
  

  goBack() {
    this.location.back();
  }

  async deleteSociety(id:any) {
    const alert = await this.alertController.create({
      header: ' Delete Society ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Society',
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
            this.society.deleteSociety(id).subscribe(data=>{
              this.societyList();
              
              this.toast.presentToast("Society deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

}
