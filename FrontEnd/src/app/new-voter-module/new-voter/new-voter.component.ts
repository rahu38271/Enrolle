import { Component, OnInit } from '@angular/core';
import { NewVoterService } from 'src/app/services/new-voter.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router' 
import { AlertController } from '@ionic/angular';
import { IonicToastService } from 'src/app/services/ionic-toast.service';

@Component({
  selector: 'app-new-voter',
  templateUrl: './new-voter.component.html',
  styleUrls: ['./new-voter.component.css']
})
export class NewVoterComponent implements OnInit {

  getnewVoter:any;
  searchWeb: string;

  constructor(
    private newVoter:NewVoterService,
    private loader:LoaderService,
    private router:Router,
    public alertController: AlertController,
    private toast:IonicToastService
    ) { }

  ngOnInit(): void {
    this.newVoterList();
  }

  newVoterList(){
    this.loader.showLoading();
    this.newVoter.getAllNewVoter().subscribe(data=>{
      if(data != 0){
        this.loader.hideLoader();
        this.getnewVoter = data;
        this.getnewVoter.forEach(e => {
          e.dob = e.dob.split('T')[0]
        });
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  editNewVoter(data:any){
    this.router.navigateByUrl('/new-voter/edit-new-voter', {state:data});
  }

  async deleteNewVoter(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete Appointment',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Appointment',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'no',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          cssClass: 'yes',
          handler: () => {
            this.newVoter.deleteNewVoter(id).subscribe(data=>{
              this.ngOnInit();
              this.toast.presentToast("Appointment deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

}
