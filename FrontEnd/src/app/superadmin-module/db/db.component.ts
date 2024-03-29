import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  loginId:any;
  id:any;
  superadminId:any;
  DBConfigModal:any = {
    
  }

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

  myForm;

  constructor
    (
      public popoverController: PopoverController,
      private auth:AuthenticationService,
      private loader:LoaderService,
      private toast:IonicToastService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    //this.dbAssign();
  }

  dbAssign(){
    debugger;
    this.DBConfigModal.superAdminId = Number(this.id);
    this.loader.showLoading();
    this.auth.DBConfig(this.DBConfigModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.DBConfigModal = {};
        this.toast.presentToast("DB assigned successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/superadmin']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("DB not assigned", "danger", 'alert-circle-sharp');
      }
    }, (err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Oops something went wrong!", "danger", 'alert-circle-sharp');
    })
  }

  resetForm() {
    this.myForm.reset();
  }


  onSubmit(f){

  }

}
