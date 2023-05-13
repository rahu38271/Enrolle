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
  surnameWiseData : any;
  searchMob:string;
  userId: any;
  roleID:any;
  id:any;
  PageNo:any=1;
  NoofRow:any=10;
  totalCount:any;
  SearchText:any;

  search() {
    this.isShow = !this.isShow
  }

  constructor(private voter: VoterService, private route: ActivatedRoute, private router:Router,private translateConfigService: TranslateConfigService,) {
    this.Language = this.translateConfigService.getCurrentLang();
  }

  event(event:any){
    this.PageNo = event;
    this.lastNameWiseVoterData(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.lastName = this.route.snapshot.paramMap.get('lastName')
    // this.route.queryParams.subscribe(params => {
    //this.lastName //= params['lastName'];
    if (this.SearchText == undefined) {
      this.SearchText = ''
    }
    else {
      this.SearchText = this.SearchText
    }
    this.lastNameWiseVoterData(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language,this.SearchText);
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }


  lastNameWiseVoterData(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    this.Language = this.translateConfigService.getCurrentLang();
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
    this.voter.voterByLastName(this.lastName,userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data => {
      if(data.length != 0){
        this.surnameWiseData = data;
        this.totalCount = data[0].totalCount
      }
      else{

      }
  },(err)=>{

  });
  }

  onSearchChange(SearchText:any){
    this.PageNo=1;
    this.NoofRow=this.totalCount;
    this.SearchText=SearchText;
    this.lastNameWiseVoterData(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

   keyPress(SearchText:any){
    this.PageNo=1;
    this.NoofRow=this.totalCount;
    this.SearchText=SearchText;
    this.lastNameWiseVoterData(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }
}
