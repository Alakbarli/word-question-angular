import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor() { }

  generatePromptForChatGPT(length:string,level:string,tags?:string):string{
    return "";
  }
  GeneratePromptForCotrex(length:number,level:string):string{
    return `write a story. The story should be a maximum of ${length} words. Story level should be ${level} English. Just write a story. Dont write dialog to me`;
  }
}
