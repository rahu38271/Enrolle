import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppNameService {

  constructor(
    private config: Config
  ) {
    
   }

  
}
