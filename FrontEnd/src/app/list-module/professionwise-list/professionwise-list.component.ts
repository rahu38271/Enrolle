import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ActivatedRoute,Route,Router } from '@angular/router';

@Component({
  selector: 'app-professionwise-list',
  templateUrl: './professionwise-list.component.html',
  styleUrls: ['./professionwise-list.component.css']
})
export class ProfessionwiseListComponent implements OnInit {

  isShow = false;
  Language:any;
  UserId:any;
  roleId:any;
  SearchText:any;
  occupation:any;
  voterWithProf:any;
  PageNo:any=1;
  NoofRow:any=10;
  totalItems:any;
  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private loader:LoaderService,
    private voter:VoterService,
    private route:ActivatedRoute,
    private router:Router,
    private translateConfigService: TranslateConfigService,
    ) {
      this.Language = this.translateConfigService.getCurrentLang();
     }

  ngOnInit(): void {
    this.UserId=localStorage.getItem('loginId');
    this.roleId=localStorage.getItem('userType');
    this.occupation = this.route.snapshot.paramMap.get('occupation');
    if(this.SearchText==undefined){
      this.SearchText=''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.allProfList(this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,this.SearchText)
  }

  allProfList(UserId:any,roleId:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.voter.voterByProf(this.occupation,UserId,roleId,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data != 0){
        this.voterWithProf = data;
      }
      else{

      }
    },(err)=>{

    })
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.allProfList(this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.voter.voterByProf(this.occupation,this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data => {
        if (data) {
          this.voterWithProf = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
  }

   keyPress(SearchText:any){
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.allProfList(this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.voter.voterByProf(this.occupation,this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data => {
        if (data) {
          this.voterWithProf = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
   }

}
