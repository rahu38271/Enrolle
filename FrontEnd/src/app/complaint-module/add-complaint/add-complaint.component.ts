import { Component, OnInit,ViewChild } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { IonModal } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {

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
  addSingleComplaint:any={}
  UserId:any;
  roleID:any;
  name:any;
  file:any;
  year: number = new Date().getFullYear();
  maxDate:String = new Date().toISOString();

  clickedImage: string;
  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    private complaint:ComplaintService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private router:Router,
    private location: Location,
    private camera: Camera
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.name = localStorage.getItem("loginUser");
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];
    this.file = file;
    //this.addSingleComplaint(file,this.societycomplaint);
    // const file:File = event.target.files[0];
    // const societycomplaint = { }
    // this.addSingleComplaint(file,this.societycomplaint);
  }

  addComplaint(){
    debugger;
    this.societycomplaint.UserId = Number(this.UserId);
    this.societycomplaint.RoleId = Number(this.roleID);
    this.societycomplaint.UserName = this.name;
    this.societycomplaint = JSON.stringify(this.societycomplaint);
  // this.societycomplaint = JSON.parse(this.societycomplaint);
    if(this.file==undefined){
      this.file = ''
    }
    else{
      this.file = this.file;
    }
    this.loader.showLoading();
    
    this.complaint.addSingleComplaint(this.file, this.societycomplaint).subscribe((data)=>{
    if(data==1)
    {
      this.loader.hideLoader();
        this.toast.presentToast("Complaint added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/complaint-book/all-complaints'])
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Complaint not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      
    })
  }

  goBack() {
    this.location.back();
  }

  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

}
