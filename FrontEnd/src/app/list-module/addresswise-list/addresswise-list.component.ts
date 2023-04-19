import { Component, OnInit } from '@angular/core'
import { VoterService } from 'src/app/services/voter.service';
import { Router, ActivatedRoute } from '@angular/router'
import { IonicToastService} from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-addresswise-list',
  templateUrl: './addresswise-list.component.html',
  styleUrls: ['./addresswise-list.component.scss'],
})
export class AddresswiseListComponent implements OnInit {
  Language:any;
  isShow = false;
  addressName: any;
  coloumnName: any;
  addressWiseList: any[]=[];
  searchMob:string;
  userId:any;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(
      private voter:VoterService, 
      private router:Router, 
      private route:ActivatedRoute,
      private toast:IonicToastService,
      private loader:LoaderService,
      private translateConfigService: TranslateConfigService,
      ) {
        this.Language = this.translateConfigService.getCurrentLang();
       }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.addressName= this.route.snapshot.paramMap.get('addressName')
    this.addressWiseVoterData(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language) 

  }

  event(event:any){
    this.PageNo = event;
    this.addressWiseVoterData(this.userId,this.roleID,event,this.NoofRow,this.Language)
  }

  addressWiseVoterData(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any){
    if(this.Language == "kn"){
      this.Language = "Kannada"
    }
    else if(this.Language == "mr"){
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else{
      this.Language = "English"
    }
    this.voter.voterByAddress(this.addressName,userId,roleID,PageNo,NoofRow,this.Language).subscribe(data=>{
      this.addressWiseList = data;
      this.totalItems = data[0].totalCount
    })
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

}
