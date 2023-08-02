import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Unit } from 'src/app/models/unit';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateWordDialogComponent } from '../../dialogs/create-word-dialog/create-word-dialog.component';
import { WordDialogData } from 'src/app/models/word-dialog-data';
import { DialogActionTypes } from '../../const/dialog-action-types';
import { Word } from 'src/app/models/word';
import { ErrorSnacbarComponent } from '../../snacBars/error-snacbar/error-snacbar.component';
import { SnackBarData } from 'src/app/models/snack-bar-data.model';
import { SnackBarTypes } from '../../const/snack-bar-types';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ShellService } from 'src/app/shell/shell.service';
import { SpeechService } from '../../services/speech.service';
import { CasheService } from '../../services/cashe.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsComponent implements OnInit {
  unitId:Array<number>=[];
  wordAz:string="";
  wordEn:string="";
  unitList:Array<Unit>|null=null;
  displayedColumns: string[] = ['no', 'nameAz', 'nameEn', 'unitName','operation'];


  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  pageIndex: number = 0;
  pageSize: number = 5;
  length:any;
  pageSizeOptions = [5, 10, 25];

  langList:Array<SpeechSynthesisVoice>;
  selectedSpeechLang:string;

  constructor(private cd :ChangeDetectorRef, private cs:CasheService, private shellService:ShellService, public dialog:MatDialog,private langService:LanguageService,private _snackBar: MatSnackBar,private sp:SpeechService) { 
    shellService.showLoader();
    this.unitList=this.langService.db.Units;
    this.storiedData=this.langService.db.Words;
    this.filteredData=this.langService.db.Words;
  }
  dataSource:MatTableDataSource<Word>=new MatTableDataSource<Word>();
  storiedData:Array<Word>=[];
  filteredData:Array<Word>=[];
  ngOnInit(): void {
    this.sp.getVoices(window).then(res=>{
      this.langList=res;
      this.getSpeechSettings();
    });
    if(this.cs.cache.selectedUnits&&this.cs.cache.selectedUnits.length>0){
      this.unitId=this.cs.cache.selectedUnits;
    }
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.filter();
    this.shellService.hideLoader();
  }
  trackByFn(index: number, item: any): number {
    return item.id;
  }
  addWord(){
    let dialogRef = this.dialog.open(CreateWordDialogComponent, {
      data :new WordDialogData(null,null,null,DialogActionTypes.add)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
         if(data as WordDialogData){
           this.langService.addWord(data);
           this.filter(this.pageIndex);
           this.cd.detectChanges();
           let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
            data:new SnackBarData('Söz əlavə olundu',SnackBarTypes.success) ,
            panelClass: [SnackBarTypes.success],
            duration:3000
          });
         }
       }
     )
  }
  editWord(w:Word){
    let dialogRef = this.dialog.open(CreateWordDialogComponent, {
      data :new WordDialogData(w.nameAz,w.nameEn,w.unitId,DialogActionTypes.update)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
        if(data as WordDialogData){
          w.nameAz=data.nameAz as string;
          w.nameEn=data.nameEn as string;
          w.unitId=data.unitId as number;
          this.langService.editWord(w);
          this.filter(this.pageIndex);
          this.cd.detectChanges();
          let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
            data:new SnackBarData('Sözdə düzəliş edildi',SnackBarTypes.info) ,
            panelClass: [SnackBarTypes.info],
            duration:3000
          });
        }
       }
     )
  }
  deleteWord(w:Word){
    let dialogRef = this.dialog.open(CreateWordDialogComponent, {
      data :new WordDialogData(w.nameAz,w.nameEn,w.unitId,DialogActionTypes.delete)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
        if(data){
          let deletedWord=w;
          let index=this.langService.db.Words.findIndex(x=>x.id==w.id);

          this.langService.deleteWord(w.id);
          this.filter();
          let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
            data:new SnackBarData('Söz silindi',SnackBarTypes.info,"Geri al") ,
            panelClass: [SnackBarTypes.info],
            duration:3000
          });
          snackbarRef.onAction().subscribe(() => {
            this.langService.insertAtWord(index,deletedWord);
            this.filter();
          });
        }
       }
     )
  }
  getUnitName(id:number):string|null|undefined{
    return this.unitList?.find(x=>x.id==id)?.name;
  }
  change(){
    this.cs.cache.selectedUnits=this.unitId;
    this.cs.setCashe();
    this.filter();
  }
  changeAz(){
    this.filter();
  }
  changeEn(){
    this.filter();
  }
  filter(page:number=0){
    this.filteredData=this.storiedData.filter(
      w=>
            ((this.unitId&&this.unitId.length>0)?this.unitId?.includes(+w.unitId):true)&&
            ((this.wordAz.isEmpty())?true:(w.nameAz.toLowerCase().trim().includes(this.wordAz.toLowerCase().trim())))&&
            ((this.wordEn.isEmpty())?true:(w.nameEn.toLowerCase().trim().includes(this.wordEn.toLowerCase().trim())))
      );
      
      //this.length = this.dataSource.data.length;
      //this.dataSource.paginator  = this.paginator;
      this.getWords(page);
      //this.paginator.firstPage();
  }
  getWords(page:number) {
    let takenStart=page*this.pageSize;
    this.dataSource.data=this.filteredData.slice(takenStart,takenStart+this.pageSize);
    this.length = this.filteredData.length;
    //this.paginator.length=this.length;
    //console.log(this.paginator)
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.paginator.length=this.length;
  }
  pageChanged(event: any) {
    //this.paginator.hasNextPage();
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getWords(this.pageIndex);
  }

  play(context:string){
    this.sp.play(context,window.speechSynthesis,this.langList.find(x=>x.name==this.selectedSpeechLang) as SpeechSynthesisVoice);
  }
  getSpeechSettings(){
    if(this.cs.cache.selectedSpeechLang){
      this.selectedSpeechLang=this.cs.cache.selectedSpeechLang;
    }
    else{
      this.selectedSpeechLang=this.langList.find(x=>x.name.toLowerCase().includes("english"))?.name||this.langList[0].name;
    }
  }
}
