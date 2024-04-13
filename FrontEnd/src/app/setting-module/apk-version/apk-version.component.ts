import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { VersionService } from 'src/app/services/version.service';

@Component({
  selector: 'app-apk-version',
  templateUrl: './apk-version.component.html',
  styleUrls: ['./apk-version.component.css']
})
export class ApkVersionComponent implements OnInit {

  versionModal:any={}
  NewVersionDate:any;
  year: number = new Date().getFullYear();
  maxDate:String = new Date().toISOString();

  constructor(
    private loader:LoaderService,
    private toast:IonicToastService,
    private versionService:VersionService
  ) { }

  ngOnInit(): void {
  }

  updateVersion(){
    debugger;
    this.loader.showLoading();
    this.versionModal.Installedversion = null;
    this.versionService.addNewVersion(this.versionModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.versionModal={}
        this.toast.presentToast("version added successfully!", "success", 'checkmark-circle-sharp');
      }else{
        this.loader.hideLoader();
        this.toast.presentToast("version not added", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
