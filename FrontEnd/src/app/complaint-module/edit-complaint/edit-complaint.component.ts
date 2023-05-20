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

  constructor(
    private complaint:ComplaintService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private router:Router
  ) {
    this.societycomplaint = this.router.getCurrentNavigation().extras.state
   }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.name = localStorage.getItem("loginUser");
  }

  onFileSelected(event:any){
    debugger;
    const file:File = event.target.files[0];
    this.file = file;
  }

  updateComplaint(){
    debugger;
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
