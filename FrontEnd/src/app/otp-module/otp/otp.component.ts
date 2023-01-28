import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  config = {
    length: 4,
    allowNumbersOnly: true,
    placeholder: '-',
    inputStyles: {
      'background': '#fafafa',
    },
    autoFocus: true
  }

  constructor() { }

  ngOnInit(): void {
  }

}
