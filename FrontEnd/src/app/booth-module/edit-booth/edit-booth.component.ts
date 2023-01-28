import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { BoothService } from 'src/app/services/booth.service';
import { AssemblyService } from 'src/app/services/assembly.service'

@Component({
  selector: 'app-edit-booth',
  templateUrl: './edit-booth.component.html',
  styleUrls: ['./edit-booth.component.css']
})
export class EditBoothComponent implements OnInit {

  addBoothModal: any = {};
  myForm;
  //assemblyList:any;
  
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
      private loader:LoaderService,
      private toast:IonicToastService,
      private booth:BoothService,
      private assembly:AssemblyService
    ) 
    {

     }



  ngOnInit() {
    //this.assemblyList();
  }

  resetForm(){
    this.myForm.reset();
  }

  onSubmit(f:NgForm){
    if(this.addBoothModal.invalid){
      return;
    }else{

    }
    f.resetForm();
  }

}
