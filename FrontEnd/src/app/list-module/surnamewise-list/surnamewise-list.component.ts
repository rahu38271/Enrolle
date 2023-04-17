import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoterService } from 'src/app/services/voter.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-surnamewise-list',
  templateUrl: './surnamewise-list.component.html',
  styleUrls: ['./surnamewise-list.component.scss'],
})
export class SurnamewiseListComponent implements OnInit {
  Language:any;
  isShow = false;
  lastName: any;
  surnameWiseData : any[]=[];
  searchMob:string;
  userId: any;
  roleID:any;
  id:any;
  PageNo:any=1;
  NoofRow:any=5;
  totalItems:any;

  search() {
    this.isShow = !this.isShow
  }

  constructor(private voter: VoterService, private route: ActivatedRoute, private router:Router,private translateConfigService: TranslateConfigService,) {
    this.Language = this.translateConfigService.getCurrentLang();
  }

  event(event:any){
    this.PageNo = event;
    this.lastNameWiseVoterData(this.userId,this.roleID,event,this.NoofRow,this.Language)
  }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.lastName= this.route.snapshot.paramMap.get('lastName')
   // this.route.queryParams.subscribe(params => {
      //this.lastName //= params['lastName'];
    this.lastNameWiseVoterData(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language);
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   

  

  lastNameWiseVoterData(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any){
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
    this.voter.voterByLastName(this.lastName,userId,roleID,PageNo,NoofRow,this.Language).subscribe(data => {
      if(data){
        this.surnameWiseData = data;
        this.totalItems = data[0].totalCount
      }
      else{

      }
  },(err)=>{

  });
  }
}
