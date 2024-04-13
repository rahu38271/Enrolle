import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(
    private bluetoothSerial: BluetoothSerial
  ) {
    
   }

   connect(address: string) {
    return this.bluetoothSerial.connect(address);
  }

  disconnect() {
    return this.bluetoothSerial.disconnect();
  }

  print(data: any) {
    debugger;
    return this.bluetoothSerial.write(data);
  }

  PrintTable(){
    
  }

}
