import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-pdf-setting',
  templateUrl: './edit-pdf-setting.component.html',
  styleUrls: ['./edit-pdf-setting.component.scss'],
})
export class EditPdfSettingComponent implements OnInit {

  files: File[] = [];

onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
}

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

  myForm;

  birthDate = '';
  anniDate = '';
  Logo = '';

  year : number = new Date().getFullYear();
  
  pdfModel: any = { };
  
  constructor() {
    
   }


  ngOnInit() {
    
  }

  resetForm(){
    this.myForm.reset();
  }


  onSubmit(){
    if(this.pdfModel.invalid){
      return
    }else{
      alert('success');
    }
  }

}
