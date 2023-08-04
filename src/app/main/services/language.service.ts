import { Injectable } from '@angular/core';
import { DB } from 'src/app/models/db';
import { Story } from 'src/app/models/story';
import { Unit } from 'src/app/models/unit';
import { Word } from 'src/app/models/word';
import { WordDialogData } from 'src/app/models/word-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  unitId:number=1;
  wordId:number=1;
  db:DB=new DB();

  url: string = 'assets/files/data.json';


  constructor() {
    this.getDbLocalstorage();
    this.getStoriesLocalstorage();
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
  generateJson(){
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(this.db, null, 2)], {type: "text/plain"}));
    a.setAttribute("download", "word-questions-word-list-data.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  hasWordOfUnit(unitId:number){
    return this.db.Words.some(x=>x.unitId==unitId);
  }
  addUnit(name:string){
    this.findLastIdUnit();
    let newUnit=new Unit(this.unitId,name);
    this.db.Units.push(newUnit);
    this.sync();
  }
  addWord(data:WordDialogData){
    this.findLastIdWord();
    let newWord=new Word(this.wordId,data.nameAz as string,data.nameEn as string,data.unitId as number);
    this.db.Words.push(newWord);
    this.sync();
  }
  addStory(data:Story){
    this.db.Stories.push(data);
    this.syncStories();
  }
  insertAtUnit(index:number,unit:Unit){
    this.db.Units.splice(index,0,unit);
    this.sync();
  }
  insertAtWord(index:number,word:Word){
    this.db.Words.splice(index,0,word);
    this.sync();
  }
  insertAtStory(index:number,story:Story){
    this.db.Stories.splice(index,0,story);
    this.syncStories();
  }
  editUnit(id:number,name:string){
    let unitIndex=this.db.Units.findIndex(x=>x.id==id);
    this.db.Units[unitIndex].name=name;
    this.sync();
  }
  editWord(word:Word){
    let unitIndex=this.db.Words.findIndex(x=>x.id==word.id);
    this.db.Words[unitIndex]=word;
    this.sync();
  }
  deleteUnit(id:number){
    let unitIndex=this.db.Units.findIndex(x=>x.id==id);
    this.db.Units.splice(unitIndex,1);
    this.sync();
  }
  deleteWord(id:number){
    let wordIndex=this.db.Words.findIndex(x=>x.id==id);
    this.db.Words.splice(wordIndex,1);
    this.sync();
  }
  deleteStory(id:string){
    let storyIndex=this.db.Stories.findIndex(x=>x.id==id);
    this.db.Stories.splice(storyIndex,1);
    this.syncStories();
  }
  setDbLocalstorage(){
    window.localStorage.setItem("wordDb",JSON.stringify(this.db));
  }
  setStoryLocalstorage(){
    window.localStorage.setItem("wordDbStories",JSON.stringify(this.db.Stories));
  }
  findUnit(id:number)
    {
        return this.db.Units.find(u=>u.id==id);
    }
  getDbLocalstorage(){
    if(window.localStorage.getItem("wordDb")!=null){
      this.db=JSON.parse((localStorage.getItem("wordDb")) as string)
      this.findLastIdUnit();
      this.findLastIdWord();
    }
    else{
    fetch(this.url)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.db=json;
      this.syncAll();
      window.location.reload();
    });
    }
  }
  getStoriesLocalstorage(){
    if(window.localStorage.getItem("wordDbStories")!=null&&window.localStorage.getItem("wordDbStories")!=undefined){
      this.db.Stories=JSON.parse((localStorage.getItem("wordDbStories")) as string);
  }
  else{
    this.db.Stories=[];
    this.setStoryLocalstorage();
  }
  }
  clear(){
    window.localStorage.removeItem("wordDb");
    window.localStorage.removeItem("wordDbStories");
    this.db=new DB();
  }
  sync(){
    this.setDbLocalstorage();
    this.findLastIdUnit();
    this.findLastIdWord();
  }
  syncStories(){
    this.setStoryLocalstorage();
  }
  syncAll(){
    this.setDbLocalstorage();
    this.findLastIdUnit();
    this.findLastIdWord();
    this.setStoryLocalstorage();
  }
}
