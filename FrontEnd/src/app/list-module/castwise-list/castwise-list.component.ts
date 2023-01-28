import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-castwise-list',
  templateUrl: './castwise-list.component.html',
  styleUrls: ['./castwise-list.component.scss'],
})
export class CastwiseListComponent implements OnInit {

  isShow = false;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor() { }

  ngOnInit() {}

}
