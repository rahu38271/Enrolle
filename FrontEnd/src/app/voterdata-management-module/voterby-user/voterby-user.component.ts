import { Component  } from '@angular/core';
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
  RoleId:any;
  voterListByUser: any;
  isShow = true;
  isMike : boolean;
  isRecording = false;
  searchWeb:string;
  EditVoter:any;
  cp: number = 1;
  pageNo:any= 1
  NoofRow:any= 100
  totalCount:any;
  search(){
    this.isShow = !this.isShow
  }
  
  constructor
    (
      private voter:VoterService,
      private router: Router,
      private route:ActivatedRoute,
      private toast:IonicToastService,
      private loader:LoaderService
    ) 
    {
    
   }

   ngOnInit(){
    this.id = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    this.voterList(this.id,this.RoleId,this.pageNo,this.NoofRow);
    this.totalVoterCount();
  }

  event(event:any){
    this.pageNo = event;
    this.voterList(this.id,this.RoleId,event,this.NoofRow)
  }

  totalVoterCount(){
    this.voter.getVoterCountByUser(this.id,this.RoleId).subscribe(data=>{
      this.totalCount = data
    })
  }

  voterList(id:any,RoleId:any,pageNo:any,NoofRow:any){
    this.loader.showLoading();
    this.voter.getVoterByUser(id,RoleId,pageNo,NoofRow).subscribe((data)=>{
      if(data != 0){
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

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   toggleMike(){
    this.isMike = !this.isMike;
   }


}
