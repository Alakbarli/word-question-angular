import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { CommonDialogData } from 'src/app/models/common-dialog-data';
import { DialogActionTypes } from '../../const/dialog-action-types';
import { ErrorSnacbarComponent } from '../../snacBars/error-snacbar/error-snacbar.component';
import { SnackBarData } from 'src/app/models/snack-bar-data.model';
import { SnackBarTypes } from '../../const/snack-bar-types';
import { ReadStoryComponent } from '../../dialogs/read-story/read-story.component';
import { KeyValue } from '@angular/common';
import { Utility } from '../../Utilities/utility';
import { AIModels } from '../../const/ai-models';
import { StoryLenght } from '../../const/story-lenght';
import { LanguageLevels } from '../../const/language-levels';
import { ShellService } from 'src/app/shell/shell.service';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit,AfterViewInit {
  
  displayedColumns: string[] = ['no','tags', 'level', 'length','content','operation'];

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  pageIndex: number = 0;
  pageSize: number = 5;
  length:any;
  pageSizeOptions = [5, 10, 25];

  dataSource:MatTableDataSource<Story>=new MatTableDataSource<Story>();
  storiedData:Array<Story>=[];
  filteredData:Array<Story>=[];

  motor:number;
  tags:string="";
  storyLength:Array<number>;
  level:Array<string>;

  motorList:Array<KeyValue<number,string>>;
  lengthList:Array<KeyValue<number,string>>;
  levelList:Array<KeyValue<number,string>>;

  constructor(private cd:ChangeDetectorRef, private shellService:ShellService,public dialog:MatDialog,private langService:LanguageService,private _snackBar: MatSnackBar) {
    //shellService.showLoader();
    this.storiedData=this.langService.db.Stories;
    this.filteredData=this.langService.db.Stories;
    this.loadLookUps();
   }
  ngAfterViewInit(): void {
    this.getStories(0);
    this.cd.detectChanges();
   // this.shellService.hideLoader();
  }

  ngOnInit(): void {
  }
  

  generateHistory(){
    let dialogRef = this.dialog.open(GenerateStoryComponent, {
      data :new CommonDialogData<Story>(DialogActionTypes.add)
     });
     dialogRef.afterClosed().subscribe(
       storyData=>{
         if(storyData as CommonDialogData<Story>){
          this.langService.addStory(storyData.model);
           this.filter();
          //  let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
          //   data:new SnackBarData('Hekayə əlavə olundu',SnackBarTypes.success) ,
          //   panelClass: [SnackBarTypes.success],
          //   duration:3000
          // });
          this.readStory(storyData.model);
         }
       }
     )
  }

  deleteStory(story:Story){
    let dialogRef = this.dialog.open(GenerateStoryComponent, {
      data :new CommonDialogData(DialogActionTypes.delete,story)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
        if(data){
          let deletedStory=story;
          let index=this.langService.db.Stories.findIndex(x=>x.id==story.id);

          this.langService.deleteStory(story.id);
          this.filter();
          let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
            data:new SnackBarData('Hekayə silindi',SnackBarTypes.info,"Geri al") ,
            panelClass: [SnackBarTypes.info],
            duration:3000
          });
          snackbarRef.onAction().subscribe(() => {
            this.langService.insertAtStory(index,deletedStory);
            this.filter();
          });
        }
       }
     )
  }

  //getUnitName(id:number):string|null|undefined{
   // return this.unitList?.find(x=>x.id==id)?.name;
 // }
  change(){
    this.filter();
  }
  filter(){
    this.paginator.firstPage()
    this.filteredData=this.storiedData.filter(
      w=>
            ((this.tags.isEmpty())?true:(w.tags.toLowerCase().includes(this.tags.toLowerCase())))&&
            ((this.level!=null&&this.level!=undefined&&this.level.length>0)?this.level?.includes(w.level):true)&&
            ((this.storyLength!=null&&this.storyLength!=undefined&&this.storyLength.length>0)?this.storyLength?.includes(w.lenght):true)
      );
      this.getStories(0);
  }
  getStories(page:number) {
    let takenStart=page*this.pageSize;
    this.dataSource.data=this.filteredData.slice(takenStart,takenStart+this.pageSize);
    this.length = this.filteredData.length;
  }
  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getStories(this.pageIndex);
  }

  loadLookUps(){
    this.motorList=Utility.GenerateKeyValue(AIModels);
    this.lengthList=Utility.GenerateKeyValue(StoryLenght);
    this.levelList=Utility.GenerateKeyValue(LanguageLevels);
  }

  readStory(story:Story){
    let readingDialogRef = this.dialog.open(ReadStoryComponent, {
      data :new CommonDialogData<Story>(DialogActionTypes.add,story)
     });
  }

  getName(key:any,arr:Array<KeyValue<any,any>>):any{
    return arr.find(x=>x.key==key)?.value;
  }
}
