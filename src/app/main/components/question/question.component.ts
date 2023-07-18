import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Word } from 'src/app/models/word';
import { Unit } from 'src/app/models/unit';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  currentWordNumber:number=0;
  selectedUnit:number=0;
  slecetedLang:string="";
  known:string="";
  unknown:string="";
  answer:string="";
  showAnswer:boolean=false;
  words:Array<Word>;
  units:Array<Unit>;

  constructor(private langService:LanguageService) { }

  ngOnInit(): void {
    this.units=this.langService.db.Units;
    this.words=this.langService.db.Words;
  }

  GenerateRandomNumber (min:number, max:number){
    return Math.floor(Math.random() * (max - min+1) + min);
  };

  GenerateWordForQustion(){
    let words=((this.filterUnitId>0)?this.langService.db.findWordByUnitId(this.filterUnitId):this.langService.db.Words);
    if(words.length>0){
        let rnm=0;
        if(words.length>1){
            rnm=this.GenerateRandomNumber(0,words.length);
            while(rnm==this.currentWordNumber){
                rnm=this.GenerateRandomNumber(0,words.length);
            }
        }
        let word=words[rnm];
        this.currentWordNumber=rnm;
        let first;
        let last;
        if(word){
          this.answer="";
          this.showAnswer=false;
              // $("#word-question .main-word .last").addClass("d-none");
              // $("#word-question .main-word svg").removeClass("d-none");
              // $("#word-question .input .check-answer").removeClass("d-none");
              // $("#word-question .input").removeClass("d-none");
              // if(lang==0){
              //    let rndmN=generateRandomNumber(0,2);
              //    if(rndmN==1){
              //        first=  word.nameAz;
              //        last=  word.nameEn;
              //     }
              //     else{
              //         last=  word.nameAz;
              //          first=  word.nameEn;}
              //   }
              //   else if(lang=="az"){
              //        first=  word.nameAz;
              //        last=  word.nameEn;
              //   }
              //   else{
              //        last=  word.nameAz;
              //        first=  word.nameEn;
              //   }  
              // $("#word-question .main-word .first").text(first);
              // $("#word-question .main-word .last").text(last);
        }
    }
    
}

}
