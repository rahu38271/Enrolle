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

  appointmentModal:any={};
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
  minDate:String = new Date().toISOString();
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
    private appointment:AppointmentService,
    private toast:IonicToastService,
    private router:Router,
    private contact:ContactService
  ) {
    
   }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.name = localStorage.getItem("loginUser");
    this.getDistrict();
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
        this.appointmentModal.District = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  addAppointment(){
    var dateparts = this.appointmentModal.AppointmentDate.split(' ');
    var time= dateparts[1].split(':');
    var hr = dateparts[2] == 'PM'?(Number(time[0])+12)+':'+time[1] :dateparts[1];
    this.appointmentModal.AppointmentDate = dateparts[0]+' '+hr;
    this.appointmentModal.AdminName = this.name;
    this.appointmentModal.UserId = Number(this.UserId);
    this.appointmentModal.AppointmentDate = this.appointmentModal.AppointmentDate;
    this.appointmentModal.WardNo = Number(this.appointmentModal.WardNo);
    this.appointmentModal.PinCode = Number(this.appointmentModal.PinCode);
    this.loader.showLoading();
    this.appointment.addSingleAppointment(this.appointmentModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.appointmentModal = {};
        this.toast.presentToast("Appointment added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/appointment']);
        
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Appointment not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      
    })
    
  }

  onSubmit(f: NgForm) {
    if (this.appointmentModal.invalid) {
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
