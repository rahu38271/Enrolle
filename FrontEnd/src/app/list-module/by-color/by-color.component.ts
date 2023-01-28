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

  constructor(private voter: VoterService, private router: Router) { }

  search() {
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.colorWiseVoterList();
  }

  opposition() {
    this.router.navigate(['/list/colorwise-list'])
  }

  colorWiseVoterList() {
    this.voter.getVoterByColor().subscribe(data => {
      this.colorList = data;
    })
  }


}
