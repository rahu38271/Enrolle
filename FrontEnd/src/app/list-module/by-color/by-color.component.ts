import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-by-color',
  templateUrl: './by-color.component.html',
  styleUrls: ['./by-color.component.css']
})
export class ByColorComponent implements OnInit {

  isShow = false;
  colorList: any;
  userId: any;
  roleID:any;

  constructor(private voter: VoterService, private router: Router) { }

  search() {
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.colorWiseVoterList();
  }


  colorWiseVoterList() {
    this.voter.getVoterByColor(this.userId,this.roleID).subscribe(data => {
      this.colorList = data;
    })
  }

  supporter(){
    this.router.navigate(['/list/supporter']);
  }

  opposition(){
    this.router.navigate(['/list/opposition']);
  }

  doubtful(){
    this.router.navigate(['/list/doubtful']);
  }

  other(){
    this.router.navigate(['/list/other']);
  }


}
