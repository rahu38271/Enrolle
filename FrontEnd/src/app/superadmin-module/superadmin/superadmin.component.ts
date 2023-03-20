
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { AlertController } from '@ionic/angular';
import { SuperadminService } from 'src/app/services/superadmin.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import { IonicToastService } from 'src/app/services/ionic-toast.service'

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {
  isDB = false;

  Template = '';
  Content = '';
  NormalMsg = '';
  whatsappMsg = '';
  isShow = false;
  searchWeb: string;
  cp: number = 1;
  getAdminList: any = [];

  currentDate = new Date();
  roleId: any;
  superId:any;
  adminid:any;
  Partnoassigned:string;
  superadminId:any;
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
    ) {

  }

  ngOnInit() {
    this.superId = localStorage.getItem("loginId");
    this.adminid = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType")
    this.roleId = Number(this.roleId)
    this.id = localStorage.getItem("loginId");
    this.getAllAdminList();
    if(this.roleId == 1){
      this.isDB = !this.isDB;
    }
    else{
      this.isDB = this.isDB;
    }
  }



  getAllAdminList() {
    
    //All users List for Masteradmin
    if(this.roleId == 1){
      this.sadmin.getAllAdmin().subscribe(data => {
        if (data != 0) {
          var list = data.forEach(e => {
            if (e.roleId == 1) {
              e = { ...e, roleName: "MasterAdmin" };
            }
            else if (e.roleId == 2) {
              e = { ...e, roleName: "SuperAdmin" };
            }
            else if (e.roleId == 3) {
              e = { ...e, roleName: "Admin" };
            }
            else if (e.roleId == 4) {
              e = { ...e, roleName: "Volunteer" };
            }
            this.getAdminList.push(e);
            this.getAdminList.forEach(e => {
              e.createdDate = e.createdDate.split('T')[0];
            });
          });
        }
        else {
          this.loader.hideLoader();
        }
      })
    }

    //All users list for Superadmin
    if(this.roleId == 2){
      this.sadmin.GetAdminbySuperAdminId(this.superId).subscribe(AdminbyS => {
        if (AdminbyS != 0) {
          this.loader.hideLoader();
          var list = AdminbyS.forEach(e => {
            this.sadmin.GetpartByUserid(e.id).subscribe(data=>{
              // this.Partnoassigned=data;
                e.Partnoassigned=data.partNo;
            })
            if (e.roleId == 1) {
              e = { ...e, roleName: "MasterAdmin" };
            }
            else if (e.roleId == 2) {
              e = { ...e, roleName: "SuperAdmin" };
            }
            else if (e.roleId == 3) {
              e = { ...e, roleName: "Admin" };
            }
            else if (e.roleId == 4) {
              e = { ...e, roleName: "Volunteer" };
            }
            this.getAdminList.push(e);
            this.getAdminList.forEach(e => {
              e.createdDate = e.createdDate.split('T')[0];
            });
            
          });
        }
        else {
          //this.loader.hideLoader();
        }
      })
    }

    //All users list for Admin
    if(this.roleId == 3){
      debugger;
      this.sadmin.GetVolunterbyAdminId(this.adminid).subscribe(data => {
        if (data != 0) {
          //this.loader.hideLoader();
          var list = data.forEach(e => {
            this.sadmin.GetpartByUserid(e.id).subscribe(data=>{
              // this.Partnoassigned=data;
                e.Partnoassigned=data.partNo;
            })
            if (e.roleId == 1) {
              e = { ...e, roleName: "MasterAdmin" };
            }
            else if (e.roleId == 2) {
              e = { ...e, roleName: "SuperAdmin" };
            }
            else if (e.roleId == 3) {
              e = { ...e, roleName: "Admin" };
            }
            else if (e.roleId == 4) {
              e = { ...e, roleName: "Volunteer" };
            }
            this.getAdminList.push(e);
            this.getAdminList.forEach(e => {
              e.createdDate = e.createdDate.split('T')[0];
            });
          });
        }
        else {
          //this.loader.hideLoader();
        }
      })
    }
  }

  EditSA(data: any) {
    this.router.navigateByUrl('/superadmin/edit-superadmin', { state: data })
  }

  LinkDB(id:any){
    this.router.navigate(['superadmin/db', id])
  }
  
  SAdetails(id:number){
    this.router.navigate(['/superadmin/account', id])
  }

  

  goBack() {
    this.location.back();
  }

  deleteSA(){
    // this.sadmin.delete(this.id).subscribe(data=>{
    //   console.log(data);
    // })
  }

  // async deleteSA() {
  //   const alert = await this.alertController.create({
  //     header: ' Delete Superadmin ?',
  //     cssClass: 'alertHeader',
  //     message: 'Are you sure want to delete this superadmin',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'no',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Delete',
  //         cssClass: 'yes',
  //         handler: () => {
  //           console.log('Confirm Ok');
  //         }
  //       }
  //     ],
  //   });

  //   await alert.present();
  // }

}
