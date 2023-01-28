import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name: any;
  roleName: string;
  id: any;

  constructor(public popoverController: PopoverController, private router: Router, private route:ActivatedRoute) { }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.name = localStorage.getItem("loginUser")
    this.roleName = localStorage.getItem("userType");
  }

  userDetails(id: number) {
    this.router.navigate(['/user/account', id])
  }

  EditUser(id:number){
    this.router.navigate(['/user/edit-user', id])
  }



  LogOut(){
    localStorage.removeItem("loginUser");
    localStorage.removeItem("userType");
    this.router.navigateByUrl('/');
  }

}
