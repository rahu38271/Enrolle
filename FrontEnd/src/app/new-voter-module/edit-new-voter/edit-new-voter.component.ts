import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { NewVoterService } from 'src/app/services/new-voter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-new-voter',
  templateUrl: './edit-new-voter.component.html',
  styleUrls: ['./edit-new-voter.component.css']
})
export class EditNewVoterComponent implements OnInit {

  newVoterModal:any={};

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

  constructor(
    private loader:LoaderService,
    private toast:IonicToastService,
    private newVoter:NewVoterService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.newVoterModal = this.router.getCurrentNavigation().extras.state
  }

  updateNewVoter(){
    this.loader.showLoading();
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

}
