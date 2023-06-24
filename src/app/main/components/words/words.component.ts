import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Unit } from 'src/app/models/unit';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  unitId:Array<number>|null|undefined=null;
  wordAz:string|null|undefined=null;
  unitEn:string|null|undefined=null;
  unitList:Array<Unit>|null=null;
  constructor(private ls:LanguageService) { 
    this.unitList=ls.db.Units;
  }

  ngOnInit(): void {
  }
  addWord(){

  }
  change(){
    console.log(this.unitId);
  }

}
