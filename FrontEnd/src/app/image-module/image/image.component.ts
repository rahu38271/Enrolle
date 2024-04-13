import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoterService } from 'src/app/services/voter.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  userId: any;
  isImage = true;
  isStatic = false;
  imageUrl: any;
  roleId: any;
  superId: any;
  adminId: any;
  token: string;
  contact: string;
  password: string;

  constructor(
    private router: Router,
    private voter: VoterService,
    //private complaint:ComplaintService
    private toast: IonicToastService,
    private auth: AuthenticationService
  ) {

  }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.userId = localStorage.getItem("loginId");
    this.userId = Number(this.userId);
    this.roleId = localStorage.getItem('userType');
    this.superId = localStorage.getItem('superAdminId');
    this.adminId = localStorage.getItem('adminId');
    this.contact = localStorage.getItem('contact');
    this.password = localStorage.getItem('password');
    this.token = localStorage.getItem('token');
    if (this.roleId == 2) {
      this.userId = this.userId
    }
    else if (this.roleId == 3 || this.roleId == 4 || this.roleId == 5 || this.roleId == 6) {
      this.userId = this.superId
    }
    if (this.token == null || this.token == "") {
      this.auth.loginAdmin(this.contact, this.password).subscribe(data => {
        if (typeof data === "object") {
          this.token = data.token;
          localStorage.setItem('token',this.token);
          localStorage.setItem("loginUser", data.user[0].name);
          localStorage.setItem("loginId", data.user[0].id);
          localStorage.setItem("userType", data.user[0].roleId);
          localStorage.setItem("contact", data.user[0].contact);
          localStorage.setItem("password", data.user[0].password);
        }
      },
      );
    }
    this.voter.getLandingImage(this.userId).subscribe((data: Blob) => {
      if (data.type != 'text/plain') {
        this.saveFile(data);
        this.fetchImage(data);
        setTimeout(() => {
          this.imageUrl = true;
          if (this.roleId == 2 || this.roleId == 3 || this.roleId == 4) {
            this.router.navigate(['/home/mobile-dashboard'])
          } else if (this.roleId == 5) {
            this.router.navigate(['/complaint-book']);
          } else if (this.roleId == 6) {
            this.router.navigate(['/complaint-book/all-complaints']);
          }

        }, 1000);
        this.isStatic = false;

      }
      else {
        this.isStatic = true;
        setTimeout(() => {
          this.isStatic = true;
          if (this.roleId == 2 || this.roleId == 3 || this.roleId == 4) {
            this.router.navigate(['/home/mobile-dashboard'])
          } else if (this.roleId == 5) {
            this.router.navigate(['/complaint-book']);
          } else if (this.roleId == 6) {
            this.router.navigate(['/complaint-book/all-complaints']);
          }
        }, 1000);
      }

    }, (err) => {
      console.log(err)
      this.toast.presentToast(err, "danger", 'alert-circle-sharp');
    })


  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);

  }

  // to download image from get api
  fetchImage(image: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

}
