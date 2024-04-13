import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SuperadminService } from 'src/app/services/superadmin.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router'
import { Location } from '@angular/common';
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  @ViewChild('popover') popover;

  isOpen = false;
  disableModal:any={}
 

  isDB = false;
  Template = '';
  Content = '';
  NormalMsg = '';
  whatsappMsg = '';
  isShow = false;
  searchWeb: string;
  cp: number = 1;
  getAdminList: any[] = [];

  currentDate = new Date();
  roleId: any;
  superId: any;
  adminid: any;
  Partnoassigned: string;
  superadminId: any;
  id: any;
  Id:any;
  IsActive:any;
  roleName: string;
  dbList=false;
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
      private route: ActivatedRoute
    ) {
      
  }

  ngOnInit() {
    
  }


  dbLink(){
    this.router.navigate(['/superadmin/db-list']);
  }


  ionViewWillEnter(){
    this.superId = localStorage.getItem("loginId");
    this.adminid = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType")
    this.roleId = Number(this.roleId)
    this.id = localStorage.getItem("loginId");

    if (this.roleId == 1) {
      this.isDB = !this.isDB;
      this.dbList = !this.dbList;
    }
    else {
      this.isDB = this.isDB;
      this.dbList = this.dbList;
    }
    this.getAllAdminList();
  }

  getAllAdminList() {
    //All users List for Masteradmin
    if (this.roleId == 1) {
      this.sadmin.getAllAdmin().subscribe(data => {
        if (data != 0) {
          this.getAdminList = [];
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
            else if (e.roleId == 5) {
              e = { ...e, roleName: "Society" };
            }
            else if (e.roleId == 6) {
              e = { ...e, roleName: "Member" };
            }
            this.getAdminList.push(e);
            
          });
         
        }
        else {
          this.loader.hideLoader();
        }
      })
    }

    //All users list for Superadmin
    if (this.roleId == 2) {
      this.sadmin.GetAdminbySuperAdminId(this.superId).subscribe(AdminbyS => {
        if (AdminbyS != 0) {
          this.loader.hideLoader();
          this.getAdminList = [];
          var list = AdminbyS.forEach(e => {
            this.sadmin.GetpartByUserid(e.id).subscribe(data => {
              e.Partnoassigned = data.partNo;
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
            else if (e.roleId == 5) {
              e = { ...e, roleName: "Society" };
            }
            else if (e.roleId == 6) {
              e = { ...e, roleName: "Member" };
            }
            this.getAdminList.push(e);
            
          });
          
        }
        else {
          
        }
      })
    }

    //All users list for Admin
    if (this.roleId == 3) {
      this.sadmin.GetVolunterbyAdminId(this.adminid).subscribe(data => {
        if (data != 0) {
          this.getAdminList = [];
          var list = data.forEach(e => {
            this.sadmin.GetpartByUserid(e.id).subscribe(data => {
              
              e.Partnoassigned = data.partNo;
              
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
            else if (e.roleId == 5) {
              e = { ...e, roleName: "Society" };
            }
            else if (e.roleId == 6) {
              e = { ...e, roleName: "Member" };
            }
            this.getAdminList.push(e);
           
          });
        }
        else {
          
        }
      })
    }

    // All users list for Society
    if(this.roleId == 5){
      this.sadmin.getMemberBySociety(this.id).subscribe(memberByso=>{
        if(memberByso.length != 0){
          this.getAdminList = [];
          var list = memberByso.forEach(e => {
            if (e.roleId == 6) {
              e = { ...e, roleName: "Member" };
            }
            this.getAdminList.push(e);
            
          });
        }
      })
    }
  }

  EditSA(data: any) {
    this.router.navigateByUrl('/superadmin/edit-superadmin', { state: data })
  }

  LinkDB(id: any) {
    this.router.navigate(['superadmin/db', id])
  }

  SAdetails(id: number) {
    this.router.navigate(['/superadmin/account', id])
  }

  goBack() {
    this.location.back();
  }

  onSearchChange(event: CustomEvent) {
    if (event.detail.value) {
      this.searchWeb = event.detail.value.trim();
    }
  }

  async deleteUser(id: any) {
    const alert = await this.alertController.create({
      header: ' Delete User ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this User',
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
            debugger;
            this.sadmin.deleteUser(id).subscribe(data => {
              // if(this.roleId==1){
              //   this.sadmin.deleteDBConfig(this.id).subscribe(data=>{
              //     console.log(data);
              //   })
              // }
              
              this.ionViewWillEnter();
              this.toast.presentToast("User deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  presentPopover(event: any) {
    debugger;
    this.popover.event = event;
    this.isOpen = true;
    this.Id = event.target.id;
    this.Id = Number(this.Id);
  }

  closePopover(){
    this.isOpen = false;
  }


  disable(){
    debugger;
    this.disableModal.Id = this.Id
    if(this.IsActive=="Y"){
      this.IsActive="Y"
    }else{
      this.IsActive="N"
    }
    this.sadmin.disableUser(this.disableModal.Id,this.disableModal.IsActive).subscribe(data=>{
      this.ionViewWillEnter();
      this.closePopover();
      this.toast.presentToast("User status changed Succesfully!", "success", 'checkmark-circle-sharp');
    },(err)=>{
      
    })
  }
}
