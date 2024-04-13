import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoterService } from 'src/app/services/voter.service'


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  userId:any;
  isImage=true;
  isStatic=false;
  imageUrl:any;
  roleId:any;
  superId:any;
  adminId:any;

  constructor(
    private router:Router,
    private voter:VoterService,
    //private complaint:ComplaintService
  ) {
    
   }

  ngOnInit(): void {
    
  }

  ionViewWillEnter(){
    this.userId = localStorage.getItem("loginId");
    this.userId = Number(this.userId);
    this.roleId = localStorage.getItem('userType');
    this.superId = localStorage.getItem('superAdminId');
    this.adminId = localStorage.getItem('adminId');
    if(this.roleId == 2){
      this.userId = this.userId
    }
    else if(this.roleId == 3 || this.roleId == 4 || this.roleId == 5 || this.roleId == 6){
      this.userId = this.superId
    }
    
    this.voter.getLandingImage(this.userId).subscribe((data: Blob) => {
      if(data.type != 'text/plain'){
        this.saveFile(data);
        this.fetchImage(data);
        setTimeout(() => {
          this.imageUrl=true;
          if(this.roleId==2 || this.roleId==3 || this.roleId==4){
            this.router.navigate(['/home/mobile-dashboard'])
          }else if(this.roleId==5){
            this.router.navigate(['/complaint-book']);
          }else if(this.roleId==6){
            this.router.navigate(['/complaint-book/all-complaints']);
          }
          
        }, 1000);
        this.isStatic=false;
        
      }
      else{
        this.isStatic=true;
        setTimeout(() => {
          this.isStatic=true;
          if(this.roleId==2 || this.roleId==3 || this.roleId==4){
            this.router.navigate(['/home/mobile-dashboard'])
          }else if(this.roleId==5){
            this.router.navigate(['/complaint-book']);
          }else if(this.roleId==6){
            this.router.navigate(['/complaint-book/all-complaints']);
          }
        }, 1000);
      }
      
    },(err)=>{
     
    })
    
    
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    
  }

  // to download image from get api
  fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

}
