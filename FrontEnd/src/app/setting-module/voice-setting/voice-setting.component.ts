import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voice-setting',
  templateUrl: './voice-setting.component.html',
  styleUrls: ['./voice-setting.component.scss'],
})
export class VoiceSettingComponent implements OnInit {

  ismyTextFieldType: boolean;
  togglemyPasswordFieldType() {
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }

  public voiceForm : any [] = [{
    id : 1,
    file : '',
  }] 

  myForm

  voiceModel: any = { };
  
  constructor() { }

  ngOnInit() {}

  resetForm(){
    this.myForm.reset();
  }

  addFile(){
    this.voiceForm.push({
      id : this.voiceForm.length + 1,
      file : '',
    })
  }

  removeFile(i : number){
    this.voiceForm.pop();
  }

  onSubmit(){
    if(this.voiceModel.invalid){
      return
    }else{
      alert('success');
    }
  }

}
