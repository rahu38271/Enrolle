import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'; 
import { NewVoterService } from 'src/app/services/new-voter.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-new-voter',
  templateUrl: './add-new-voter.component.html',
  styleUrls: ['./add-new-voter.component.css']
})
export class AddNewVoterComponent implements OnInit {

  newVoterModal:any={};
  maxDate:String = new Date().toISOString();

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
  }

  addNewVoter(){
    this.loader.showLoading();
    this.newVoterModal.AssemblyNo = Number(this.newVoterModal.AssemblyNo);
    this.newVoterModal.PartNo = Number(this.newVoterModal.PartNo);
    this.newVoterModal.Age = Number(this.newVoterModal.Age);
    this.newVoter.addSingleNewVoter(this.newVoterModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.newVoterModal = {}
        this.toast.presentToast("New voter added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/new-voter']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("New voter not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
