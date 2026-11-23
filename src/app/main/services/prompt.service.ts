import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor() { }

  GeneratePromptForCotrex(length:number,level:string):string{
    return `write a story. The story should be a maximum of ${length} words. Story level should be ${level} English. Just write a story. Dont write dialog to me`;
  }
}
