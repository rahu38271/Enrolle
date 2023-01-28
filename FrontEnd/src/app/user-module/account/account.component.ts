import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoaderService} from 'src/app/services/loader.service'
import { UserService} from 'src/app/services/user.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  User: any = '';
  getUserData: any;
  roleName: any;
  
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
}

  constructor
    ( 
      public alertController: AlertController,
      private loader:LoaderService,
      private user:UserService,
      private route:ActivatedRoute
    ) 
    { }


  ngOnInit() {
    this.userDetails();
  }

  userDetails(){
    this.user.getUserData().subscribe((data) =>{
      const Uid = this.route.snapshot.paramMap.get('id');
      [this.User] = data.filter((User) => User.id == Uid);
      this.getUserData = this.User;
    })
  }

  async deleteUser() {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Delete User !',
      message: 'Are you sure, you want to delete this user',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'no',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          id: 'confirm-button',
          cssClass: 'yes',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
