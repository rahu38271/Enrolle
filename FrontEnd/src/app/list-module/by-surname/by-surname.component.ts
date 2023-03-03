import { Component, OnInit } from '@angular/core';
import { VoterService} from 'src/app/services/voter.service'
import { Router } from '@angular/router'

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

  constructor(private voter:VoterService, private router:Router) { }

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
    this.voter.lastNameData(this.userId,this.roleID).subscribe(data=>{
      this.allData = data;
    })
  }

}
