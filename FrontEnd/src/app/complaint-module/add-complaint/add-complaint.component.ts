import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { IonModal } from '@ionic/angular';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  progress = 0;
  uploading=false;
  currentDatetime: string;
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

  @ViewChild(IonModal) modal: IonModal;
  superAdminId: any;
  adminId:any;
  societycomplaint: any = {}
  addSingleComplaint: any = {}
  UserId: any;
  roleID: any;
  name: any;
  file: any;
  year: number = new Date().getFullYear();
  maxDate: String = new Date().toISOString();
  fileType: any;
  fileSize: any;
  filesize: any;
  disabled: boolean = true;
  fileName:any;
  clickedImage: string;
  

  constructor(
    private complaint: ComplaintService,
    private loader: LoaderService,
    private toast: IonicToastService,
    private router: Router,
    private location: Location,
    public datepipe: DatePipe
  ) {
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.currentDatetime = currentDateTime;
   }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.name = localStorage.getItem("loginUser");
    this.superAdminId = localStorage.getItem("superAdminId");
    this.adminId = localStorage.getItem("adminId");
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.file = file;
    this.fileSize = file.size;
    this.fileType = file.type;
    this.fileName = file.name +'-'+ this.currentDatetime;
     
    if (this.fileSize >= 10000000) {
      this.toast.presentToast("Maximum file size is 10 MB", "danger", 'checkmark-circle-sharp');
      this.disabled = true;
    }
    else if(
      this.fileType == "image/jpg" ||
      this.fileType == "image/jpeg" ||
      this.fileType == "image/png" ||
      this.fileType == "video/mp4" ||
      this.fileType == "video/3gp" ||
      this.fileType == "video/mkv" ||
      this.fileType == "video/webm" ||
      this.fileType == "video/flv" ||
      this.fileType == "video/mov" ||
      this.fileType == "application/pdf" &&
      this.fileSize < 10000000
    ){
      this.uploading=true;
    //Simulate file upload progress (for demonstration purposes)
    const interval = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.progress = 100;
        this.uploading=false;
        this.toast.presentToast("File added successfully!", "success", 'checkmark-circle-sharp');
      }
    }, 10);
    }
   
    else {
      this.disabled = true;
      this.toast.presentToast("This file format is not allowed.", "danger", 'alert-circle-sharp');
    }
    if (this.fileSize < 1000000) {
      this.fileSize = Math.round(this.fileSize / 1024).toFixed(2) + " KB";
    }
    else {
      this.fileSize = (this.fileSize / 1048576).toFixed(2) + " MB";
      console.log(this.fileSize)
    }
    
  }


  addComplaint() {
    debugger;
    this.societycomplaint.UserId = Number(this.UserId);
    this.societycomplaint.RoleId = Number(this.roleID);
    this.societycomplaint.UserName = this.name;
    this.societycomplaint.Status = null;
    if(this.roleID==2 || this.roleID==3 || this.roleID==5){
      this.societycomplaint.AdminId = this.UserId;
    }
    if(this.roleID==6){
      this.societycomplaint.AdminId = this.adminId;
    }
    this.societycomplaint.AdminId = Number(this.societycomplaint.AdminId);
    this.file = this.file;
    this.societycomplaint = JSON.stringify(this.societycomplaint);
    if (this.file == undefined) {
      this.file = ''
    }
    else {
      this.file = this.file;
    }
    this.loader.showLoading();

    this.complaint.addSingleComplaint(this.file, this.societycomplaint).subscribe((data) => {
      if (data == 1) {
        this.loader.hideLoader();
        this.toast.presentToast("Complaint added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/complaint-book/all-complaints']);
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("Complaint not saved", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();

    })
  }

  goBack() {
    this.location.back();
  }



}
