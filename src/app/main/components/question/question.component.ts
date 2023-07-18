import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Word } from 'src/app/models/word';
import { Unit } from 'src/app/models/unit';
import { Language } from 'src/app/models/language';
import { Languages } from '../../const/languages';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  currentWordNumber:number=0;
  selectedUnit:Array<number>=[];
  slecetedLang:number=0;

  askedWord:string="";
  answeredWord:string="";
  correctAnswer:string="";

  showAnswer:boolean=false;

  words:Array<Word>;
  units:Array<Unit>;
  langList:Array<Language>=[
    new Language(Languages.Azərbaycan,Languages[Languages.Azərbaycan]),
    new Language(Languages.İngilis,Languages[Languages.İngilis])
  ];

  submit:boolean=false;
  isCorrect:boolean=true;

  constructor(private langService:LanguageService) { }

  ngOnInit(): void {
    this.units=this.langService.db.Units;
    this.words=this.langService.db.Words;
  }

  checkAnswer() {
    if(this.answeredWord&&this.answeredWord.trim()){
        this.isCorrect= this.correctAnswer.split(",")
        .some(x=>this.answeredWord.split(",")
        .some(y=>y.trim().toLowerAz()==x.trim().toLowerAz()));
        this.submit=true;
    }
  }
  changeAnswer(){
    this.submit=false;
  }
  showAnswerText(){
    this.showAnswer=!this.showAnswer;
  }

  GenerateRandomNumber (min:number, max:number){
    return Math.floor(Math.random() * (max - min+1) + min);
  };
  GenerateWordForQustion(){
    this.answeredWord="";
    this.correctAnswer="";
    this.showAnswer=false;
    this.askedWord="";
    this.submit=false;
    let _words=this.words.filter(
      w=>((this.selectedUnit&&this.selectedUnit.length>0)?this.selectedUnit?.includes(+w.unitId):true)
      );
    if(_words.length>0){
        let rnm=0;
        if(_words.length>1){
            rnm=this.GenerateRandomNumber(0,_words.length-1);
            while(rnm==this.currentWordNumber){
                rnm=this.GenerateRandomNumber(0,_words.length-1);
            }
        }
        let word=_words[rnm];
        this.currentWordNumber=rnm;
        if(word){
              if(this.slecetedLang==0){
                 let rndmN=this.GenerateRandomNumber(0,2);
                 if(rndmN==1){
                     this.askedWord=  word.nameAz;
                     this.correctAnswer=  word.nameEn;
                  }
                  else{
                    this.correctAnswer=  word.nameAz;
                      this.askedWord=  word.nameEn;}
                }
                else if(this.slecetedLang==Languages.Azərbaycan){
                  this.askedWord=  word.nameAz;
                  this.correctAnswer=  word.nameEn;
                }
                else{
                  this.correctAnswer=  word.nameAz;
                  this.askedWord=  word.nameEn;
                }
        }
    }
    
}

}
