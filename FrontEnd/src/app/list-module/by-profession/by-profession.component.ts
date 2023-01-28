import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-profession',
  templateUrl: './by-profession.component.html',
  styleUrls: ['./by-profession.component.css']
})
export class ByProfessionComponent implements OnInit {

  isShow = false;

  constructor() { }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {}

}
