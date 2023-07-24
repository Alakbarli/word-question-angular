import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { TextCortexAiService } from '../../services/text-cortex-ai.service';
import { PromptService } from '../../services/prompt.service';
import { TextCortexPost } from 'src/app/models/text-cortex-post.model';
import { CortexAiTextResponse } from 'src/app/models/cortex-ai-text-response';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../services/language.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Story } from 'src/app/models/story';
import { MatTableDataSource } from '@angular/material/table';
import { GenerateStoryComponent } from '../../dialogs/generate-story/generate-story.component';
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
  //filter
  tags:string;
  level:string;
  storyLength:number;

  generatedText:any="";

  displayedColumns: string[] = ['no', 'level', 'tags', 'length','content'];

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  pageIndex: number = 0;
  pageSize: number = 5;
  length:any;
  pageSizeOptions = [5, 10, 25];

  dataSource:MatTableDataSource<Story>=new MatTableDataSource<Story>();
  storiedData:Array<Story>=[];

  constructor(private openAi:OpenaiService,private cortexAi:TextCortexAiService,private prompt:PromptService, public dialog:MatDialog,private langService:LanguageService,private _snackBar: MatSnackBar) {
    this.storiedData=this.langService.db.Stories;
    this.getStories();
   }

  ngOnInit(): void {
  }

  generateHistory(){
    let dialogRef = this.dialog.open(GenerateStoryComponent, {
    //  data :new WordDialogData(null,null,null,DialogActionTypes.add)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
        //  if(data as WordDialogData){
        //    this.langService.addWord(data);
        //    this.filter();
        //    let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
        //     data:new SnackBarData('Söz əlavə olundu',SnackBarTypes.success) ,
        //     panelClass: [SnackBarTypes.success],
        //     duration:3000
        //   });
        //  }
       }
     )
  }

  // deleteWord(w:Word){
  //   let dialogRef = this.dialog.open(CreateWordDialogComponent, {
  //     data :new WordDialogData(w.nameAz,w.nameEn,w.unitId,DialogActionTypes.delete)
  //    });
  //    dialogRef.afterClosed().subscribe(
  //      data=>{
  //       if(data){
  //         let deletedWord=w;
  //         let index=this.langService.db.Words.findIndex(x=>x.id==w.id);

  //         this.langService.deleteWord(w.id);
  //         this.filter();
  //         let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
  //           data:new SnackBarData('Bölmə silindi',SnackBarTypes.info,"Geri al") ,
  //           panelClass: [SnackBarTypes.info],
  //           duration:3000
  //         });
  //         snackbarRef.onAction().subscribe(() => {
  //           this.langService.insertAtWord(index,deletedWord);
  //           this.filter();
  //         });
  //       }
  //      }
  //    )
  // }

  //getUnitName(id:number):string|null|undefined{
   // return this.unitList?.find(x=>x.id==id)?.name;
 // }
  change(){
    this.filter();
  }
  changeAz(){
    this.filter();
  }
  changeEn(){
    this.filter();
  }
  filter(){
    // this.dataSource.data=this.storiedData.filter(
    //   w=>
    //         ((this.unitId&&this.unitId.length>0)?this.unitId?.includes(+w.unitId):true)&&
    //         ((this.wordAz.isEmpty())?true:(w.nameAz.toLowerCase().includes(this.wordAz.toLowerCase())))&&
    //         ((this.wordEn.isEmpty())?true:(w.nameEn.toLowerCase().includes(this.wordEn.toLowerCase())))
    //   );
      
    //   this.length = this.dataSource.data.length;
    //   this.dataSource.paginator  = this.paginator;
    //   this.paginator.firstPage();
  }
  getStories() {
    this.dataSource.data=this.storiedData;
    this.length = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
  }
  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
