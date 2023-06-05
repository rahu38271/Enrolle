import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-daily-news',
  templateUrl: './edit-daily-news.component.html',
  styleUrls: ['./edit-daily-news.component.scss'],
})
export class EditDailyNewsComponent implements OnInit {

  dailynews:any={ }
  file:any;

  year : number = new Date().getFullYear();

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

  myForm;
  
  subject = '';
  link = '';
  reporter = '';
  modeType = '';
  mode = '';
  adminId:any;
  UserId:any;
  roleID:any;
  superAdminId:any;
  date:any;
  medium:any;

  constructor(
    private news:NewsService,
    private toast:IonicToastService,
    private loader:LoaderService,
    private router:Router
  ) { 
    this.dailynews = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.adminId = localStorage.getItem("adminId");
  }

  resetForm(){
    this.myForm.reset();
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];
    this.file=file;
  }

  type(event){
    this.medium=event.target.value;
  }

  save(){
    debugger;
    this.loader.showLoading();
    this.dailynews.userid=Number(this.UserId);
    this.dailynews.adminId = Number(this.UserId);
    this.dailynews=JSON.stringify(this.dailynews);
    if(this.file==undefined){
      this.file = ''
    }
    else{
      this.file = this.file;
    }
    this.news.addSingleNews(this.file,this.dailynews).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.dailynews={}
        this.router.navigate(['/daily-news'])
        this.toast.presentToast("News updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("News not updated", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
