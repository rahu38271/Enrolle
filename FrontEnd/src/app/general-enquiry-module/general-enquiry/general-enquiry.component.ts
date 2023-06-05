import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController, LoadingController } from '@ionic/angular';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-general-enquiry',
  templateUrl: './general-enquiry.component.html',
  styleUrls: ['./general-enquiry.component.css']
})
export class GeneralEnquiryComponent implements OnInit {

  UserId:any;
  RoleId:any;
  SearchText:any;
  NoofRow:any=10;
  PageNo:any=1;
  enquiryList:any;
  totalItems:any;

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController, 
    public alertController: AlertController,
    private enquiry:EnquiryService,
    private toast:IonicToastService,
    private router:Router,
    private loader:LoaderService
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
  }

  ionViewWillEnter(){
    this.allEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
  }

  event(event){
    this.PageNo=event;
    this.allEnquiry(this.UserId,this.RoleId,event,this.NoofRow,this.SearchText);
  }

  onSearchChange(SearchText:any){
    if(this.SearchText==''){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.allEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
    }
    else{
      this.PageNo=1;
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.enquiry.getAllEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data){
          this.enquiryList = data;
          this.totalItems = data[0].totalCount;
          this.enquiryList.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0];
            e.anniversary = e.anniversary.split('T')[0];
          });
        }
        else{
  
        }
      });
    }
  }

  keyPress(SearchText:any){
    if(this.SearchText==''){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.allEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
    }
    else{
      this.PageNo=1;
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.enquiry.getAllEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data){
          this.enquiryList = data;
          this.totalItems = data[0].totalCount;
          this.enquiryList.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0];
            e.anniversary = e.anniversary.split('T')[0];
          });
        }
        else{
  
        }
      });
    }
  }

  allEnquiry(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    this.enquiry.getAllEnquiry(UserId,RoleId,PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data){
        this.enquiryList = data;
        this.totalItems = data[0].totalCount;
        this.enquiryList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
          e.anniversary = e.anniversary.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
  }

  editEnq(data:any){
    debugger;
    this.router.navigateByUrl('/general-enquiry/edit-enquiry',{state:data})
  }


  async deleteEnq(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete enquiry',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this enquiry',
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
            this.loader.showLoading();
            this.enquiry.deleteEnq(id).subscribe(data=>{
              this.loader.hideLoader();
              this.ionViewWillEnter();
              this.toast.presentToast("Enquiry deleted Succesfully!", "success", 'checkmark-circle-sharp');
            },(err)=>{
              this.loader.hideLoader();
            })
          }
        }
      ],
    });

    await alert.present();
  }

}
