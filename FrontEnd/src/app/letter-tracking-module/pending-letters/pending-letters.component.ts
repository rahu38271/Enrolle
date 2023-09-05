import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pending-letters',
  templateUrl: './pending-letters.component.html',
  styleUrls: ['./pending-letters.component.css']
})
export class PendingLettersComponent implements OnInit {

  constructor(
    private location:Location,
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }

}
