import { Component, OnInit } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
export class textResponse{
  sno:number=1;
  text:string='';
  response:any='';
}
@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {
  textList:textResponse[]=[{sno:1,text:'',response:''}];
  generatedText:any="";
  constructor(private openAi:OpenaiService) { }

  ngOnInit(): void {
  }
  generateText(data:textResponse) {
    this.openAi.generateText(data.text).then(text => {
      data.response = text;
      if(this.textList.length===data.sno){
        this.textList.push({sno:1,text:'',response:''});
      }
    });
  }
  generateArticle(){
    this.generatedText=this.openAi.generateText("generate short article for impove english level")
  }
}
