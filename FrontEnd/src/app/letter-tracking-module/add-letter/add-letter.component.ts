import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { PopoverController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LetterService } from 'src/app/services/letter.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-letter',
  templateUrl: './add-letter.component.html',
  styleUrls: ['./add-letter.component.css']
})
export class AddLetterComponent implements OnInit {
  UserId:any;
  districtList: any;
  talukaList: any;
  letter:any={}
  fileSize:any;
  fileType:any;
  fileName:any;
  file:any;
  name:any;
  //disabled:boolean=true;
  year:number=new Date().getFullYear();
  maxDate:String=new Date().toISOString();
  allOffice:any;
  allDept:any;
  officeModal:any={
    Office_Name:''
  }
  deptModal:any={
    Department_Name:''
  }

  constructor(
    public contact: ContactService,
    public popoverController: PopoverController,
    private location:Location,
    private letterService:LetterService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private router:Router
  ) { }

  getDistrict() {
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        this.districtList = data;
      }
    }, (error) => {

    })
  }

  getTaluka(dId: any) {
    this.contact.getTalukaData(dId).subscribe((data) => {
      if (data.length > 0) {
        this.letter.district = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  OfficeList(){
    this.letterService.getAllOffice().subscribe(data=>{
      this.allOffice = data;
    })
  }

  DeptList(){
    this.letterService.getAllDept().subscribe(data=>{
      this.allDept = data;
    })
  }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.name = localStorage.getItem('loginUser');
    this.getDistrict();
    
  }

  ionViewWillEnter(){
    this.OfficeList();
    this.DeptList();
    
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  goBack(){
    this.location.back();
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];
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

  addLetter(){
    debugger;
    this.letter.UserId = Number(this.UserId);
    this.letter.UserName = this.name;
    this.letter.Status = "Pending"
    if(this.file==undefined){
      this.file = ''
    }
    else{
      this.file = this.file
    }
    this.letter = JSON.stringify(this.letter);
    this.loader.showLoading();
    this.letterService.addSingleLetter(this.letter, this.file).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.letter={};
        this.toast.presentToast("Letter added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/letter-tracking/all-letters'])
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Letter not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  addOfficeName(){
    this.letterService.addOffice(this.officeModal).subscribe(data=>{
      if(data){
        this.officeModal={};
        this.ionViewWillEnter();
        this.toast.presentToast("Office added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{

      }
    })
  }

  adddeptName(){
    debugger;
    this.letterService.addDept(this.deptModal).subscribe(data=>{
      if(data){
        this.deptModal={};
        this.ionViewWillEnter();
        this.toast.presentToast("Department added successfully!", "success", 'checkmark-circle-sharp');
      }
    })
  }

}
