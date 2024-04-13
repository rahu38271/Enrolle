import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  appName: string;

  constructor() { }

  setApkName(name: string) {
    debugger;
    this.appName = name;
  }

  getApkName() {
    return this.appName;
  }
}
