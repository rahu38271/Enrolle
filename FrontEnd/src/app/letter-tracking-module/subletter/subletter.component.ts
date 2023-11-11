import { Component, OnInit } from '@angular/core';
import {ModalController, AlertController,LoadingController,ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LetterService } from 'src/app/services/letter.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-subletter',
  templateUrl: './subletter.component.html',
  styleUrls: ['./subletter.component.css']
})
export class SubletterComponent implements OnInit {
  id:any;
  isModalOpen = false;
  isModalEdit = false;
  allSubLetters:any;
  allOffice:any;
  allDept:any;
  subletter:any={};
  editSubletter:any={};
  file:any;
  fileSize:any;
  fileType:any;
  fileName:any;
  value:any;
  UserId:any;
  name:any;
  RoleId:any;
  PageNo:any=1;
  NoofRow:any=25;
  allSubLtr:any;
  imageUrl:any;
  addedSubletter:any;
  isCompleted = false;
  isPending = false;
  isCompleted1 = false;
  isPending1 = false;
  status: string;

  constructor(
    public modalCtrl: ModalController,
    private location: Location,
    private letterService:LetterService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private route:ActivatedRoute,
    public alertController: AlertController,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.UserId = localStorage.getItem('loginId');
    this.name = localStorage.getItem('loginUser');
    this.RoleId = localStorage.getItem('userType');
    
  }

  ionViewWillEnter(){
    this.subLetterList();
    this.officeList();
    this.deptList();
    this.listSubLtrs();
    //this.allSubLetterList(this.UserId,this.RoleId,this.PageNo,this.NoofRow);
    
  }

  // Letter by id
  subLetterList(){
    this.id = this.id;
    this.letterService.getAllSubLetter(this.id).subscribe(data=>{
      if(data){
        this.allSubLetters = data;
        this.allSubLetters.forEach(e => {
          e.letter_Submit_Date = e.letter_Submit_Date.split('T')[0];
          e.status = e.status;
          if(e.status !== "Completed"){
            this.isPending1 =true;
          }
          else{
            this.isCompleted1 = true;
          }
        });
      }
      else{

      }
    },(err)=>{

    })
  }

  // all sublettres of that id
  listSubLtrs(){
    this.letterService.getSubletterList(this.id).subscribe(data=>{
      if(data){
        this.addedSubletter = data;
        this.addedSubletter.forEach(e => {
          e.status = e.status;
          if(e.status !== "Completed"){
            this.isCompleted = false;
            this.isPending =true;
          }
          else{
            this.isCompleted = true;
            this.isPending = false;
          }
          e.letter_Realese_Date = e.letter_Realese_Date.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
  
  }
  


  officeList(){
    this.letterService.getAllOffice().subscribe(data=>{
      this.allOffice = data;
    })
  }

  deptList(){
    this.letterService.getAllDept().subscribe(data=>{
      this.allDept = data;
    })
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    link.download = '';
    link.click();
  }

  // download subletter
  downloadFile(event:any){
    debugger;
    this.loader.showLoading();
    this.id = Number(event.target.id);
    this.letterService.downloadSubLetter(this.id).subscribe((data: Blob)=>{
      if(data.size!= 0){
        this.loader.hideLoader();
        this.saveFile(data);
        this.fetchImage(data);
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No File!", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  // to download image from get api
  fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0]
    this.file = file;
    this.fileSize = file.size;
    this.fileType = file.type;
    this.fileName = file.name;
    if (this.fileSize >= 10000000) {
      this.toast.presentToast("Maximum file size is 10 MB", "danger", 'checkmark-circle-sharp');
      //this.disabled = true;
    }
    else {
      this.toast.presentToast("File added successfully!", "success", 'checkmark-circle-sharp');
    }
    //this.fileSize = this.fileSize + Math.round(this.fileSize/1024).toFixed(2) + " KB";
    if (this.fileSize < 1000000) {
      this.fileSize = Math.round(this.fileSize / 1024).toFixed(2) + " KB";
    }
    else {
      this.fileSize = (this.fileSize / 1048576).toFixed(2) + " MB";
      console.log(this.fileSize)
    }
    if (
      this.fileType == "image/jpg" ||
      this.fileType == "image/jpeg" ||
      this.fileType == "image/png" ||
      this.fileType == "video/mp4" ||
      this.fileType == "video/3gp" ||
      this.fileType == "video/mkv" ||
      this.fileType == "video/webm" ||
      this.fileType == "video/flv" ||
      this.fileType == "video/mov" ||
      this.fileType == "application/pdf"
    ) {
      this.fileType = this.fileType;
      this.fileSize = this.fileSize;
    }
    else {
      //this.disabled = true;
      this.toast.presentToast("This file format is not allowed.", "danger", 'alert-circle-sharp');
    }
  }

  // add subletter
  subLetter(){
    //this.subletter.UserId = Number(this.UserId);
    this.subletter.UserName = this.name;
    this.subletter.LetterID = Number(this.id);
    this.subletter = JSON.stringify(this.subletter);
    this.loader.showLoading();
    this.letterService.addSubLetter(this.subletter, this.file).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.subletter={};
        this.toast.presentToast("SubLetter added successfully!", "success", 'checkmark-circle-sharp');
        this.closeFamily();
        this.ionViewWillEnter();
      }
      else{
        this.loader.hideLoader();
        this.closeFamily();
        this.toast.presentToast("SubLetter not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.closeFamily();
      this.loader.hideLoader();
    })
  }

  EditsubLetter(){
    debugger;
    this.subletter.UserId = Number(this.UserId);
    this.subletter.UserName = this.name;
    this.subletter.LetterID = Number(this.id);
    this.subletter = JSON.stringify(this.subletter);
    this.loader.showLoading();
    this.letterService.addSubLetter(this.subletter, this.file).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.subletter={};
        this.toast.presentToast("SubLetter added successfully!", "success", 'checkmark-circle-sharp');
        this.closeFamily();
        this.ionViewWillEnter();
      }
      else{
        this.loader.hideLoader();
        this.closeFamily();
        this.toast.presentToast("SubLetter not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }


  // delete subletter
  async letterDelete(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete Subletter',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Subletter',
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
            this.letterService.deleteSubletter(id).subscribe(data=>{
              this.loader.hideLoader();
              this.ionViewWillEnter();
              this.toast.presentToast("Subletter deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  family(){
    this.isModalOpen = true;
  }

  EditSubltr(data:any){
    this.isModalEdit = true;
  }

  // checked(event){
  //   this.value = event.target.value;
  // }

  closeFamily(){
    this.isModalOpen = false;
  }

  closeEditLtr(){
    this.isModalEdit = false;
  }

  goBack() {
    this.location.back();
  }

}
