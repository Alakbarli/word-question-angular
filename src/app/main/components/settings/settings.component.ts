import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../../services/speech.service';
import { Subject } from 'rxjs';
import { CasheService } from '../../services/cashe.service';
import { ShellService } from 'src/app/shell/shell.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  testText="Are you enjoying learning ?";
  langList:Array<SpeechSynthesisVoice>;
  selectedSpeechLang:string;
  rate:number=1;
  pitch:number=1;
  panelOpenState = false;
  constructor(private sp:SpeechService,private cs:CasheService, private shell:ShellService) {

  }

  ngOnInit(): void {
    this.shell.showLoader();
    this.sp.getVoices(window).then(res=>{
      this.langList=res;
      this.getSpeechSettings();
      this.shell.hideLoader();
    });

  }
  getSpeechSettings(){
    if(this.cs.cache.pichSpeech){
      this.pitch=this.cs.cache.pichSpeech;
    }
    if(this.cs.cache.speechRate){
      this.rate=this.cs.cache.speechRate;
    }
    if(this.cs.cache.selectedSpeechLang){
      this.selectedSpeechLang=this.cs.cache.selectedSpeechLang;
    }
  }
  setSpeechSettings(){
    this.cs.cache.pichSpeech=this.pitch;
    this.cs.cache.speechRate=this.rate;
    this.cs.cache.selectedSpeechLang=this.selectedSpeechLang;
    this.cs.setCashe();
  }
  play(){
    this.sp.play(this.testText,window.speechSynthesis,this.langList.find(x=>x.name==this.selectedSpeechLang) as SpeechSynthesisVoice);
  }
  

}
