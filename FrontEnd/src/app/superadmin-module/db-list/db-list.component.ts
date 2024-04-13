import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'


@Component({
  selector: 'app-db-list',
  templateUrl: './db-list.component.html',
  styleUrls: ['./db-list.component.css']
})
export class DbListComponent implements OnInit {

  @Output() toggleChange = new EventEmitter<boolean>();
  isChecked: boolean = false;
  id:any;
  Id:any;
  value:boolean;
  dbList:any;
  Type:any;
  giveSMSPermit:any={}

  constructor(
    private location:Location,
    private auth:AuthenticationService,
    private loader:LoaderService,
      private toast:IonicToastService,
  ) { }

  ngOnInit(): void {

    
  }

  ionViewWillEnter(){
    this.allDBList();
  }

  allDBList(){
    this.auth.getDBConfigure().subscribe(data=>{
      if(data){
        this.dbList = data;
        this.dbList.forEach(e => {
          e.messageSent = e.messageSent;
          if(e.messageSent=="Y"){
            this.giveSMSPermit.Type.value="Y"
          }
        });
      }else{

      }
    },(err)=>{
      
    })
  }

  // onToggle(value: boolean) {
  //   debugger;
  //   this.isChecked = value;
  //   this.toggleChange.emit(value);
  // }

  event(event:any){
    this.id = event.target.id;
  }

  givePermit(){
    this.giveSMSPermit.Id = this.id;
    this.auth.smsPermit(this.giveSMSPermit.Id,this.giveSMSPermit.Type).subscribe(data=>{
      if(data){
        this.toast.presentToast("SMS permissions set successfully!", "success", 'checkmark-circle-sharp');
      }else{
      }
    },(err)=>{
    })
  }

  // onToggle(event:any) {
  //   debugger;
  //   this.id = event.target.id;
  //   this.isChecked = event.target.checked;
  //   this.toggleChange.emit(this.isChecked);
  //   this.Id = this.id;
  //   if(this.isChecked==true){
  //     this.Type="Y"
  //   }else{
  //     this.Type="N"
  //   }
  //   this.loader.showLoading();
  //   if(this.Type="Y"){
  //     this.auth.smsPermit(this.Id,this.Type).subscribe(data=>{
  //       if(data){
  //         this.loader.hideLoader();
  //         this.toast.presentToast("SMS permissions set successfully!", "success", 'checkmark-circle-sharp');
  //       }
  //     })
  //   }else{
  //     this.auth.smsPermit(this.Id,this.Type).subscribe(data=>{
  //       if(data){
  //         this.loader.hideLoader();
  //         this.toast.presentToast("SMS permissions removed successfully!", "success", 'checkmark-circle-sharp');
  //       }
  //     })
  //   }
    
  // }

  goBack() {
    this.location.back();
  }

}
