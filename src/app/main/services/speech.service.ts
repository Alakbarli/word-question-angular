import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CasheService } from './cashe.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  constructor(private cs:CasheService) { 
  }
  getVoices(window:Window):Promise<Array<SpeechSynthesisVoice>>{
    return new Promise<Array<SpeechSynthesisVoice>>((resolve,reject)=>{
      let id=setInterval(()=>{
        if(window.speechSynthesis.getVoices()&&window.speechSynthesis.getVoices().length>0){
          clearInterval(id);
          resolve(window.speechSynthesis.getVoices());
        }
      },1);
    })
  }
  play(context:string,synth:any,voice:SpeechSynthesisVoice){
      const utterThis = new SpeechSynthesisUtterance(context);
      utterThis.voice =voice;
      utterThis.pitch = this.cs.cache.speechRate;
      utterThis.rate = this.cs.cache.speechRate;
      synth.speak(utterThis);
  }
}
