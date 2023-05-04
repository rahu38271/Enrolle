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

  @ViewChild(IonModal) modal: IonModal;
  complaintModal:any={}
  UserId:any;
  roleID:any;
  name:any;
  year: number = new Date().getFullYear();

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

  addComplaint(){
    debugger;
    this.complaintModal.UserId = Number(this.UserId);
    this.complaintModal.RoleId = Number(this.roleID);
    this.complaintModal.UserName = this.name;
    this.loader.showLoading();
    this.complaint.addSingleComplaint(this.complaintModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.complaintModal = {};
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
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
