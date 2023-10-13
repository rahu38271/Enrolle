import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  progress = 0;
  uploading=false;
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

  @ViewChild('file', { static: false }) fileInput: ElementRef; //declaration

  @ViewChild(IonModal) modal: IonModal;
  societycomplaint: any = {}
  imageUrl: any;
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
  id: any;
  link: any;
  fileName: any;
  selectedFile: any;

  constructor(
    private complaint: ComplaintService,
    private loader: LoaderService,
    private toast: IonicToastService,
    private router: Router
  ) {
    debugger;
    this.societycomplaint = this.router.getCurrentNavigation().extras.state
    this.societycomplaint.fileName = this.societycomplaint.fileName;
    // if(this.societycomplaint.fileName == 'blob'){
    //   this.societycomplaint.fileName = '';
    // }
    // else{
    //   this.societycomplaint.fileName = this.societycomplaint.fileName;
    // }

    fetch(this.societycomplaint.fileName, { mode: 'no-cors' })
      .then(res => res.blob())
      .then(blob => {
        const data = new ClipboardEvent('').clipboardData || new DataTransfer();
        data.items.add(new File([blob], this.societycomplaint.fileName));
        this.fileInput.nativeElement.files = data.files;
        this.fileInput.nativeElement.value = data.files[0];
      });
    this.complaint.getFile(this.societycomplaint.id).subscribe((data: Blob) => {
      this.societycomplaint.file = data;
      this.societycomplaint.fileName = this.societycomplaint.fileName;
      const file: File = this.societycomplaint.file;
      this.file = file;
      this.fileSize = file.size;
      this.fileType = file.type;
      if (this.fileSize < 1000000) {
        this.fileSize = Math.round(this.fileSize / 1024).toFixed(2) + " KB";
      }
      else {
        this.fileSize = (this.fileSize / 1048576).toFixed(2) + " MB";
      }
    })
  }


  ngOnInit(): void {
    debugger;
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

  // to download image from get api
  fetchImage(image: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  onFileSelected(event) {
    debugger;
    const file: File = event.target.files[0];
    this.file = file;
    this.fileSize = file.size;
    this.fileType = file.type;
    this.fileName = file.name;
     
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
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.progress = 100;
        this.uploading=false;
        this.toast.presentToast("File added successfully!", "success", 'checkmark-circle-sharp');
      }
    }, 100);
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

  updateComplaint() {
    debugger
    this.societycomplaint.userId = Number(this.UserId);
    //this.societycomplaint.roleID = Number(this.roleID);
    this.societycomplaint.userName = this.name;
    this.file = this.file;
    if (this.file == undefined) {
      this.file = ''
    }
    else {
      this.file = this.file;
    }
    this.societycomplaint = JSON.stringify(this.societycomplaint);
    //this.loader.showLoading();
    this.complaint.addSingleComplaint(this.file, this.societycomplaint).subscribe(data => {
      if (data == 1) {
        //this.loader.hideLoader();
        this.toast.presentToast("Complaint updated successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/complaint-book/all-complaints'])
      }
      else {
        //this.loader.hideLoader();
        this.toast.presentToast("Complaint not saved", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      //this.loader.hideLoader();
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
