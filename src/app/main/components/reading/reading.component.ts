import { Component, OnInit } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { TextCortexAiService } from '../../services/text-cortex-ai.service';
import { PromptService } from '../../services/prompt.service';
import { TextCortexPost } from 'src/app/models/text-cortex-post.model';
import { CortexAiTextResponse } from 'src/app/models/cortex-ai-text-response';
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
  tags:string;
  level:string;
  generatedText:any="";
  constructor(private openAi:OpenaiService,private cortexAi:TextCortexAiService,private prompt:PromptService) { }

  ngOnInit(): void {
  }
  generateTextGpt(data:textResponse) {
    this.openAi.generateText(data.text).then(text => {
      data.response = text;
      if(this.textList.length===data.sno){
        this.textList.push({sno:1,text:'',response:''});
      }
    });
  }
  generateTextCortex() {
    let prompt=this.prompt.GeneratePromptForCotrex(50,"elemntary");
    //let keywords=this.tags.split(",");
    let keywords=["cat,dog"];
    let postData=new TextCortexPost(prompt,keywords,"en","en","Story");
    this.cortexAi.post(JSON.stringify(postData)).subscribe(
      res=>{
         let resp =res as CortexAiTextResponse;
         console.log(resp);
      }
    )
  }
  generateArticle(){
    this.generatedText=this.openAi.generateText("generate short article for impove english level")
  }
}
