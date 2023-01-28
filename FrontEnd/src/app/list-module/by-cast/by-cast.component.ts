import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-cast',
  templateUrl: './by-cast.component.html',
  styleUrls: ['./by-cast.component.scss'],
})
export class ByCastComponent implements OnInit {

  isShow = false;

  constructor() { }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {}

}
