import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router'
import { IonicToastService } from 'src/app/services/ionic-toast.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isShow = false;
  getUserData: any=[];
  cp: number = 1;
  search() {
    this.isShow = !this.isShow
  }
  searchWeb: string;
  searchMob: string;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor
    (
      public alertController: AlertController,
      private loader: LoaderService,
      private user: UserService,
      private router: Router,
      private toast: IonicToastService
    ) {

  }

  ngOnInit() {
    this.userList();
  }

  EditUser(data: any) {
    this.router.navigateByUrl('/user/edit-user', { state: data })
  }

  userDetails(id: number) {
    this.router.navigate(['/user/account', id])
  }

  userList(){
    this.loader.showLoading();
    this.user.getUserData().subscribe(data => {
      if (data != 0) {
        this.loader.hideLoader();
       var list =  data.forEach(e => {
          //e.createdDate = e.createdDate.split('T')[0];
          if (e.roleId == 1) {
             e = { ...e, roleName: "SuperAdmin"};
          }
          else if (e.roleId == 2) {
            e = { ...e, roleName: "Admin"};
          }
          else if (e.roleId == 3) {
            e = { ...e, roleName: "Volunteer"};
          }
          else{
            e = { ...e, roleName: ""};
          }
          this.getUserData.push(e);
          this.getUserData.forEach(e => {
            e.createdDate = e.createdDate.split('T')[0];
          });
        });
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err) =>{
        this.loader.hideLoader();
        this.toast.presentToast("Something went wrong !", "danger", 'alert-circle-sharp');
    })
  }

  async deleteUser(id: any) {
    const alert = await this.alertController.create({
      header: ' Delete User ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this user',
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
            this.user.delete(id).subscribe((data) => {
              this.toast.presentToast("User deleted successfully!", "success", 'checkmark-circle-sharp');
              this.userList();
            }, (err) => {
              this.toast.presentToast("User not deleted", "danger", 'alert-circle-sharp');
            })
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
