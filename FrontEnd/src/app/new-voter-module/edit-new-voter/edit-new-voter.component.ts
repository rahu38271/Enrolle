import { Component, OnInit,ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { NewVoterService } from 'src/app/services/new-voter.service';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-edit-new-voter',
  templateUrl: './edit-new-voter.component.html',
  styleUrls: ['./edit-new-voter.component.css']
})
export class EditNewVoterComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  newVoterModal:any={};
  maxDate:String = new Date().toISOString();
  loginId:any;
  name:any;
  adminId:any;
  superAdminId:any;
  roleId:any;
  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

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

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  constructor(
    private loader:LoaderService,
    private toast:IonicToastService,
    private newVoter:NewVoterService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.newVoterModal = this.router.getCurrentNavigation().extras.state;
    this.loginId = localStorage.getItem("loginId");
    this.name = localStorage.getItem("loginUser");
    this.adminId = localStorage.getItem("adminId");
    this.superAdminId = localStorage.getItem("superAdminId");
    this.roleId = localStorage.getItem("userType");
    this.roleId = Number(this.roleId);
  }

 

  updateNewVoter(){
    this.loader.showLoading();
    this.newVoterModal.userId = Number(this.loginId);
    this.newVoterModal.userName = this.name;
    if(this.roleId == 2){
      this.newVoterModal.udminId = Number(this.loginId)
    }
    if(this.roleId == 3){
      this.newVoterModal.udminId = Number(this.superAdminId)
    }
    this.newVoterModal.assemblyNo = Number(this.newVoterModal.assemblyNo);
    this.newVoterModal.partNo = Number(this.newVoterModal.partNo);
    this.newVoterModal.age = Number(this.newVoterModal.age);
    this.newVoter.addSingleNewVoter(this.newVoterModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.newVoterModal={};
        this.toast.presentToast("Voter updated successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/new-voter']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("voter not updated", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
