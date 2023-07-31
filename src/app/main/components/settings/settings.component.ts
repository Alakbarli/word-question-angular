import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../../services/speech.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  langList:Array<SpeechSynthesisVoice>;
  selectedSpeechLang:string;
  rate:number=1;
  pich:number=1;
  panelOpenState = false;
  constructor(private sp:SpeechService) { }

  ngOnInit(): void {
    this.langList=this.sp.voices;
    
  }

}
