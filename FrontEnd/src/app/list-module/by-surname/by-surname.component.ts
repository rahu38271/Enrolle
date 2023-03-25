import { Component, OnInit } from '@angular/core';
import { VoterService} from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'

@Component({
  selector: 'app-by-surname',
  templateUrl: './by-surname.component.html',
  styleUrls: ['./by-surname.component.scss'],
})
export class BySurnameComponent implements OnInit {

  isShow = false;
  allData: any;
  searchMob:string;
  userId: any;
  roleID:any;

  constructor(
    private voter:VoterService, 
    private router:Router,
    private loader:LoaderService
    ) { }

  search(){
    this.isShow = !this.isShow
  }

  lastName(columnName){
   this.router.navigate(['/list/surnamewise-list/',  {lastName :columnName} ])
  }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem('userType')
    this.allLastName();
  }

  allLastName(){
    this.loader.showLoading();
    this.voter.lastNameData(this.userId,this.roleID).subscribe(data=>{
      if(data != 0){
        this.loader.hideLoader();
        this.allData = data;
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
