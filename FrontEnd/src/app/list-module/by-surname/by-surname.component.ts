import { Component, OnInit } from '@angular/core';
import { VoterService} from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-by-surname',
  templateUrl: './by-surname.component.html',
  styleUrls: ['./by-surname.component.scss'],
})
export class BySurnameComponent implements OnInit {
  Language:any;
  isShow = false;
  allData: any;
  searchMob:string;
  userId: any;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=200000;
  totalItems:any;
  SearchText:any;

  constructor(
    private voter:VoterService, 
    private router:Router,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    ) { 
      this.Language = this.translateConfigService.getCurrentLang();
    }

  search(){
    this.isShow = !this.isShow
  }

  lastName(columnName){
   this.router.navigate(['/list/surnamewise-list/',  {lastName :columnName} ])
  }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem('userType');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.allLastName(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  event(event:any){
    this.PageNo = event;
    this.allLastName(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  allLastName(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    this.loader.showLoading();
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
    this.voter.lastNameData(userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.allData = data;
        //this.totalItems = data[0].totalCount
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  onSearchChange(SearchText:any){
    if(this.SearchText==''){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.allLastName(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
    }
    else{
      this.PageNo=1;
      this.NoofRow=100;
      this.SearchText=SearchText;
      this.voter.lastNameData(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
        if(data.length != 0){
          this.allData = data;
          this.totalItems = data[0].totalCount
        }
        else{
        }
      })
    }
  }

  keyPress(SearchText:any){
    if(this.SearchText==''){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.allLastName(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
    }
    else{
      this.PageNo=1;
      this.NoofRow=100;
      this.SearchText=SearchText;
      this.voter.lastNameData(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
        if(data.length != 0){
          this.allData = data;
          this.totalItems = data[0].totalCount
        }
        else{
        }
      })
    }
  }

}
