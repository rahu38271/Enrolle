import { Component, OnInit,ViewChild } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { Router } from '@angular/router'
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.component.html',
  styleUrls: ['./edit-complaint.component.css']
})
export class EditComplaintComponent implements OnInit {

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
  societycomplaint:any={}

  UserId:any;
  roleID:any;
  name:any;
  file:any;
  year: number = new Date().getFullYear();
  maxDate:String = new Date().toISOString();
  fileType:any;
  fileSize:any;
  filesize:any;
  disabled:boolean= true;
  id:any;
  link:any;
  fileName:any;
  constructor(
    private complaint:ComplaintService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private router:Router
  ) {
    this.societycomplaint = this.router.getCurrentNavigation().extras.state
    this.societycomplaint.fileName = this.fileName
   }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.name = localStorage.getItem("loginUser");
    
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    // link.download = 'image.jpg';
    link.download = '';
    link.click();
  }

  downloadFile(event: any) {
    debugger;
    this.id = Number(event.target.id);
    this.loader.showLoading();
    this.complaint.getFile(this.id).subscribe((data : Blob) => {
      if (data) {
        this.loader.hideLoader();
        this.saveFile(data);
      }
      else {
        this.loader.hideLoader();
      }
    }, (err) => {
      this.loader.hideLoader();
    })
  }

  onFileSelected(event){
    const file:File = event.target.files[0];
    this.file = file;
    this.fileSize = file.size;
    this.fileType = file.type;
    if(this.fileSize >= 10000000){
      this.toast.presentToast("Maximum file size is 10 MB", "danger", 'checkmark-circle-sharp');
      this.disabled=true;
    }
    else{
      this.toast.presentToast("File added successfully!", "success", 'checkmark-circle-sharp');
    }
    if(this.fileSize < 1000000){
      this.fileSize = Math.round(this.fileSize/1024).toFixed(2) + " KB";
    }
    else{
      this.fileSize = (this.fileSize / 1048576).toFixed(2) + " MB";
      console.log(this.fileSize)
    }
    if(
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
      ){
        this.fileType = this.fileType;
        this.fileSize = this.fileSize;
    }
    else{
      this.toast.presentToast("This file format is not allowed.", "danger", 'alert-circle-sharp');
    }
  }

  updateComplaint(){
    this.societycomplaint.userId = Number(this.UserId);
    //this.societycomplaint.roleID = Number(this.roleID);
    this.societycomplaint.userName = this.name;
    if(this.file==undefined){
      this.file = ''
    }
    else{
      this.file = this.file;
    }
    this.societycomplaint = JSON.stringify(this.societycomplaint);
    //this.loader.showLoading();
    this.complaint.addSingleComplaint(this.file,this.societycomplaint).subscribe(data=>{
      if(data==1){
        //this.loader.hideLoader();
        this.toast.presentToast("Complaint updated successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/complaint-book/all-complaints'])
      }
      else{
        //this.loader.hideLoader();
        this.toast.presentToast("Complaint not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
