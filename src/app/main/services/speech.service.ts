import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  isComplete:boolean=false;
  synth:any;
  voices:Array<SpeechSynthesisVoice>;
  constructor() { 
    this.voices=this.synth.getVoices();
  }
  getVoices():Promise<Array<SpeechSynthesisVoice>> {
    return new Promise<Array<SpeechSynthesisVoice>>((resolve,reject) => {
      let voices=window.speechSynthesis.getVoices();
      
    });
  }
  play(){
      const utterThis = new SpeechSynthesisUtterance("Hello");
      const selectedOption = "Microsoft David - English (United States)";
      utterThis.voice =this.voices[0];
      utterThis.pitch = 1;
      utterThis.rate = 1;
      this.synth.speak(utterThis);
    }
}
