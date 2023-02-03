import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service'
import { AssemblyService } from 'src/app/services/assembly.service'
import { WardService } from 'src/app/services/ward.service'
import { BoothService } from 'src/app/services/booth.service'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  EditData: any = {};
  edModal: any = {};
  myForm;
  districtList: any;
  assemblyList: any;
  talukaList: any;
  wardList: any;
  boothList: any;
  roleList :any =[]

  constructor
  (
    private contact:ContactService,
    private assembly:AssemblyService,
    private ward:WardService,
    private booth:BoothService,
    private router:Router,
    private user:UserService,
    private toast:IonicToastService,
    private loader:LoaderService
  ) 
  {
   
   }

  
  ngOnInit() {
    this.EditData = this.router.getCurrentNavigation().extras.state;
    this.roleList =[{"roleId":1,"roleName":"SuperAdmin"},
    {"roleId":2,"roleName":"Admin"},
    {"roleId":3,"roleName":"Volunteer"}]
  //  this.getDistrict();
   // this.getAssembly();
   // this.getWard();
  //  this.getBooth();
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

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
}

 
  ismyTextFieldType: boolean;
  togglemyPasswordFieldType(){
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  getDistrict(){
    this.contact.getDistrictData().subscribe(data=>{
      if(data.length > 0){
        this.districtList = data;
      }
    })
  }

  getAssembly(){
    this.assembly.getAssemblyData().subscribe(data=>{
      if(data.length > 0){
        this.assemblyList = data;
      }
    })
  }

  getTaluka(dId:any){
    this.contact.getTalukaData(dId).subscribe((data)=>{
      if(data.length > 0){
        this.EditData.District = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    })
  }

  getWard(){
    this.ward.getWardData().subscribe(data=>{
      if(data.length > 0){
        this.wardList = data;
      }
    })
  }

  getBooth(){
    this.booth.getBoothData().subscribe(data=>{
      if(data.length > 0){
        this.boothList = data;
      }
    })
  }

  save(){
    this.loader.showLoading();
    this.EditData.roleName = this.EditData.roleName;
    this.user.update(this.EditData).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.EditData ={};
        this.toast.presentToast("User updated successfully!", "success", 'checkmark-circle-sharp');
      }
    }, (err) =>{
      this.loader.hideLoader();
      this.toast.presentToast("User not updated", "danger", 'alert-circle-sharp');
    })
  }

  onSubmit(f: NgForm) {
    if (this.EditData.invalid) {
      return;
    }
    f.resetForm();
    // window.location.reload();
  }

}
