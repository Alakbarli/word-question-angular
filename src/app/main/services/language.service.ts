import { Injectable } from '@angular/core';
import { DB } from 'src/app/models/db';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  unitId:number=1;
  wordId:number=1;
  db:DB=new DB();
  constructor() {
    //this.id=Math.floor(Math.random() * (10 - 0+1) + 0);
   }

   findLastIdWord(){
    let wId=this.wordId;
    this.db.Words.forEach(
        function(w){
            if(wId<w.id){
                wId=w.id;
            }
        }
    )
    this.wordId=wId+1;
    }
    findLastIdUnit(){
      let uId=this.unitId;
      this.db.Units.forEach(
          function(u){
              if(uId<u.id){
                  uId=u.id;
              }
          }
      )
      this.unitId=uId+1;
  }
  setDbLocalstorage(){
    window.localStorage.setItem("wordDb",JSON.stringify(this.db));
  }
  getDbLocalstorage(){
    if(window.localStorage.getItem("wordDb")){
      this.db=JSON.parse((window.localStorage.getItem("wordDb")))
      newDb.Words=.Words;
      newDb.Units=JSON.parse((window.localStorage.getItem("wordDb"))).Units;
      newDb.activePage=JSON.parse((window.localStorage.getItem("wordDb"))).activePage;
      newDb.unitSelectVal=JSON.parse((window.localStorage.getItem("wordDb"))).unitSelectVal;
      newDb.languageVal=JSON.parse((window.localStorage.getItem("wordDb"))).languageVal;
      findLastIdUnit();
      findLastIdWord();
      synWords();
      synUnits();
      synPage();
  }
  }
  sync(){
    this.setDbLocalstorage();
    this.findLastIdUnit();
    this.findLastIdWord();
  }
}
