import { Component } from '@angular/core';
import { VoterService} from 'src/app/services/voter.service'
import { Router, ActivatedRoute } from '@angular/router'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'

@Component({
  selector: 'app-voterby-user',
  templateUrl: './voterby-user.component.html',
  styleUrls: ['./voterby-user.component.css']
})
export class VoterbyUserComponent  {
  id: any;
  voterListByUser: any[]=[];
  isShow = true;

  search(){
    this.isShow = !this.isShow
  }
  
  constructor
    (
      private voter:VoterService,
      private router: Router,
      private route:ActivatedRoute,
      private toast:IonicToastService,
      private loader:LoaderService,
    ) 
    {
    
   }

   ngOnInit(){
    this.id = localStorage.getItem("loginId");
    this.loader.showLoading();
    this.voter.getVoterByUser(this.id).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.voterListByUser = data;
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
    })
  }



   voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }




}
