import { Injectable } from '@angular/core';
import { SiteCache } from 'src/app/models/cache.model';

@Injectable({
  providedIn: 'root'
})
export class CasheService {
  cache:SiteCache=new SiteCache();
  constructor() {this.getCache(); }
  getCache(){
    if(window.localStorage.getItem("wordCache")!=null){
      this.cache=JSON.parse((localStorage.getItem("wordCache")) as string);
    }
  }
  setCashe(){
    window.localStorage.setItem("wordCache",JSON.stringify(this.cache));
  }
}
