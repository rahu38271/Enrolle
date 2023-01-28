import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-list',
  templateUrl: './by-list.component.html',
  styleUrls: ['./by-list.component.scss'],
})
export class ByListComponent implements OnInit {

  isShow = false;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor() { }

  ngOnInit() {

  }

}
