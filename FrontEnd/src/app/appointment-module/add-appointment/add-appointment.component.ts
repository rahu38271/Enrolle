import { Component, OnInit, ViewChild  } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service'
import { AppointmentService } from 'src/app/services/appointment.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service'
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  appointments:any={};
  districtList: any;
  talukaList: any;
  year : number = new Date().getFullYear();
  myForm;
  status = '';
  subject = '';
  Edate = '';
  responsibility = '';
  priority = '';
  inpresence = '';
  place = '';
  date = '';
  UserId:any;
  roleID:any;
  name:any;
  file:any;
  minDate:String = new Date().toISOString();
  maxDate:String = new Date().toISOString();
  adminId:any;
  superAdminId:any;

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
    private appointment:AppointmentService,
    private toast:IonicToastService,
    private router:Router,
    private contact:ContactService
  ) {
    
   }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.superAdminId = localStorage.getItem("superAdminId");
    this.roleID = localStorage.getItem("userType");
    this.name = localStorage.getItem("loginUser");
    this.getDistrict();
    if(this.roleID==2 ){
      this.adminId = this.UserId
    }
    else{
      this.adminId = this.superAdminId
    }
  }

  getDistrict() {
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.districtList = data;
      }
    }, (error) => {

    })
  }

  getTaluka(dId: any) {
    this.contact.getTalukaData(dId).subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.appointments.District = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0]
    this.file = file
    
  }

  addAppointment(){
    // var dateparts = this.appointments.AppointmentDate.split(' ');
    // var time= dateparts[1].split(':');
    // var hr = dateparts[2] == 'PM'?(Number(time[0])+12)+':'+time[1] :dateparts[1];
    // this.appointments.AppointmentDate = dateparts[0]+' '+hr;
    this.appointments.AppointmentDate = this.appointments.AppointmentDate
    this.appointments.AdminName = this.name;
    this.appointments.UserName = this.name;
    this.appointments.UserId = Number(this.UserId);
    this.appointments.WardNo = Number(this.appointments.WardNo);
    this.appointments.PinCode = Number(this.appointments.PinCode);
    this.appointments.AdminId = Number(this.UserId);
    if(this.file==undefined){
      this.file = ""
    }
    else{
      this.file = this.file
    }
    this.appointments =  JSON.stringify(this.appointments);
    this.loader.showLoading();
    this.appointment.addSingleAppointment(this.file, this.appointments).subscribe(data=>{
      if(data==2){
        this.loader.hideLoader();
        this.toast.presentToast("Appointment added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/appointment/all-appointments']);
        
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Appointment not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      
    })
    
  }

  trimInput(){
    this.appointments.FirstName = this.appointments.FirstName.trim();
    this.appointments.MiddleName = this.appointments.MiddleName.trim();
    this.appointments.LastName = this.appointments.LastName.trim();
    this.appointments.HouseNo = this.appointments.HouseNo.trim();
    this.appointments.Soc_BldgName = this.appointments.Soc_BldgName.trim();
    this.appointments.WardNo = this.appointments.WardNo.trim();
    this.appointments.PinCode = this.appointments.PinCode.trim();
    this.appointments.City_Village = this.appointments.City_Village.trim();
    this.appointments.Remark = this.appointments.Remark.trim();
  }

  onSubmit(f: NgForm) {
    if (this.appointments.invalid) {
      return;
    }
    f.resetForm();
    // window.location.reload();
  }

  resetForm(){
    this.myForm.reset();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
