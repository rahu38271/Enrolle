import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ActivatedRoute,Route,Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-societywise-list',
  templateUrl: './societywise-list.component.html',
  styleUrls: ['./societywise-list.component.css']
})
export class SocietywiseListComponent implements OnInit {

  isShow = false;
  Language:any;
  UserId:any;
  roleId:any;
  SearchText:any;
  society:any;
  voterWithSoci:any;
  PageNo:any=1;
  NoofRow:any=25;
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
    private location:Location
    ) {
      this.Language = this.translateConfigService.getCurrentLang();
     }

  ngOnInit(): void {
    this.UserId=localStorage.getItem('loginId');
    this.roleId=localStorage.getItem('userType');
    this.society = this.route.snapshot.paramMap.get('society');
    if(this.SearchText==undefined){
      this.SearchText=''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.allSociList(this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,this.SearchText)
  }

  allSociList(UserId:any,roleId:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.voter.voterBySoci(this.society,UserId,roleId,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data != 0){
        this.voterWithSoci = data;
        this.totalItems = data[0].totalCount;
      }
      else{

      }
    },(err)=>{

    })
  }

  // data with state
  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

     // data with id
  voterDetails(id: number) {
    this.router.navigate(['/voterdata-management/voter-details', id])
  }

   onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.allSociList(this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterBySoci(this.society,this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data => {
        if (data) {
          this.voterWithSoci = data;
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
      this.allSociList(this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.voterBySoci(this.society,this.UserId,this.roleId,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data => {
        if (data) {
          this.voterWithSoci = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
   }

   EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  goBack(){
    this.location.back();
  }

}
