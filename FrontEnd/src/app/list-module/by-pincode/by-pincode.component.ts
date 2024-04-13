import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-pincode',
  templateUrl: './by-pincode.component.html',
  styleUrls: ['./by-pincode.component.css']
})
export class ByPincodeComponent implements OnInit {

  isShow = false;

  constructor() { }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {

  }

}
