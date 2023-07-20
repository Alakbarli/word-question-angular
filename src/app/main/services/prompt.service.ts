import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor() { }

  generatePromptForArticle(length:string,level:string,tags?:string):string{
    return "";
  }
}
