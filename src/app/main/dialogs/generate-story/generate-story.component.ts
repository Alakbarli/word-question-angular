import { Component, Inject, OnInit } from '@angular/core';
import { AIModels, DisabledAIModels } from '../../const/ai-models';
import { StoryLenght } from '../../const/story-lenght';
import { LanguageLevels } from '../../const/language-levels';
import { CreateWordDialogComponent } from '../create-word-dialog/create-word-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogData } from 'src/app/models/common-dialog-data';
import { Story } from 'src/app/models/story';
import { CustomValidatorsService } from '../../Utilities/custom-validators.service';
import { LanguageService } from '../../services/language.service';
import { DialogActionTypes } from '../../const/dialog-action-types';
import { CustomStateMatcher } from '../../Utilities/custom-state-matcher';
import { Utility } from '../../Utilities/utility';
import { KeyValue } from 'src/app/models/key-value';
import { OpenaiService } from '../../services/openai.service';
import { TextCortexAiService } from '../../services/text-cortex-ai.service';
import { PromptService } from '../../services/prompt.service';
import { TextCortexPost } from 'src/app/models/text-cortex-post.model';
import { CortexAiTextResponse } from 'src/app/models/cortex-ai-text-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnacbarComponent } from '../../snacBars/error-snacbar/error-snacbar.component';
import { SnackBarData } from 'src/app/models/snack-bar-data.model';
import { SnackBarTypes } from '../../const/snack-bar-types';
export class textResponse{
  sno:number=1;
  text:string='';
  response:any='';
}

@Component({
  selector: 'app-generate-story',
  templateUrl: './generate-story.component.html',
  styleUrls: ['./generate-story.component.scss']
})
export class GenerateStoryComponent implements OnInit {
  dialogTitle:string="Hekayə yarat";
  mainButtonText:string="Yarat";
  isDelete:boolean=false;

  generatedText:any="";

  motor:number;
  tags:string="";
  length:number;
  level:string;

  motorList:Array<KeyValue<number,string>>;
  lengthList:Array<KeyValue<number,string>>;
  levelList:Array<KeyValue<number,string>>;

  isLoading=false;

  constructor(
    public dialogRef: MatDialogRef<CreateWordDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:CommonDialogData<Story>,
    private CustomVal:CustomValidatorsService,private langService:LanguageService,private openAi:OpenaiService,
    private cortexAi:TextCortexAiService,private prompt:PromptService,private _snackBar: MatSnackBar
    ) {
    this.setDialogTexts();
    this.loadLookUps();
   }
  matcher = new CustomStateMatcher();
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async onAddClick():Promise<void>{
    this.isLoading=true;
    if(!this.buttonStatus){
      switch(this.motor){
        case AIModels['Text Cortex AI']:
          await this.generateTextCortex(this.tags,this.level,this.length).then().catch(err=>{console.log(err)});
          break;
      }
      this.isLoading=false;
      let story=this.createStory();
      this.dialogRef.close(new CommonDialogData<Story>(DialogActionTypes.add,story));
    }
    if(this.isDelete){
      this.dialogRef.close(true);
    }
  }
  submit(){
    this.onAddClick();
  }
  get buttonStatus(){
    return (this.tags.isEmpty()||this.motor==null||this.length==null||this.level==null)&&!this.isDelete;
  }
  createStory():Story{
    let uniqueId=Utility.makeId();
    let newStory=new Story(uniqueId,this.level,this.length,this.tags,this.generatedText);
    return newStory;
  }
  setDialogTexts(){
    switch(this.data.actionType){
      case DialogActionTypes.delete:
        this.dialogTitle="Hekayəni sil";
        this.mainButtonText="Sil";
        this.isDelete=true;
        break;
    }
  }
  isDisableAI(key:any){
    return Object.keys(DisabledAIModels).some((v) => v === key);
  }
  loadLookUps(){
    this.motorList=Utility.GenerateKeyValue(AIModels);
    this.lengthList=Utility.GenerateKeyValue(StoryLenght);
    this.levelList=Utility.GenerateKeyValue(LanguageLevels);
  }


  //TEXT
  textList:textResponse[]=[{sno:1,text:'',response:''}];
  generateTextGpt(data:textResponse) {
    this.openAi.generateText(data.text).then(text => {
      data.response = text;
      if(this.textList.length===data.sno){
        this.textList.push({sno:1,text:'',response:''});
      }
    });
  }

  generateTextCortex(tags:string,level:string,length:number):Promise<void> {
    return new Promise<void>((resolve,reject) => {
      let prompt=this.prompt.GeneratePromptForCotrex(length,level);
      let keywords=this.tags.split(",");
      let postData=new TextCortexPost(prompt,keywords,"en","en","Story");
      this.cortexAi.post(JSON.stringify(postData)).subscribe({
        next:res=>{
          let cortexRes =res as CortexAiTextResponse;
          if(cortexRes?.data?.outputs[0]){
            this.generatedText=cortexRes?.data?.outputs[0].text;
           resolve();
          }
          else{
            let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
              data:new SnackBarData('Hekayə yaradılmadı',SnackBarTypes.info) ,
              panelClass: [SnackBarTypes.info],
              duration:3000
            });
            reject("Hekayə yaradılmadı");
          }
        },
        error:(err)=>{
          let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
            data:new SnackBarData('Xəta baş verdi',SnackBarTypes.error) ,
            panelClass: [SnackBarTypes.error],
            duration:3000
          });
          reject(`Cortex Api Error ${JSON.stringify(err)}`);
        }
      })
    });
  }
  generateArticle(){
    this.generatedText=this.openAi.generateText("generate short article for impove english level")
  }

}
