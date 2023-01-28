import { Component, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent {

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
