import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voted',
  templateUrl: './voted.component.html',
  styleUrls: ['./voted.component.scss'],
})
export class VotedComponent implements OnInit {

  isShow = false;

  constructor() { }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {
    
  }

}
