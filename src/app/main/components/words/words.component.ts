import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  unitId:Array<number>|null|undefined=null;
  wordAz:string|null|undefined=null;
  wordEn:string|null|undefined=null;
  unitList:Array<Unit>|null=null;
  constructor(public dialog:MatDialog,private langService:LanguageService,private _snackBar: MatSnackBar) { 
    this.unitList=langService.db.Units;
    this.dataSource=this.dataSource=langService.db.Words;
  }
  dataSource:Array<Word>;
  ngOnInit(): void {
  }
  addWord(){
    let dialogRef = this.dialog.open(CreateWordDialogComponent, {
      // height: '400px',
      // width: '600px',
      data :new WordDialogData(null,null,null,DialogActionTypes.add)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
         if(data as WordDialogData){
           this.langService.addWord(data);
         }
       }
     )
  }
  editWord(w:Word){
    let dialogRef = this.dialog.open(CreateWordDialogComponent, {
      // height: '400px',
      // width: '600px',
      data :new WordDialogData(w.nameAz,w.nameEn,w.unitId,DialogActionTypes.update)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
        if(data as WordDialogData){
          w.nameAz=data.nameAz as string;
          w.nameEn=data.nameEn as string;
          w.unitId=data.unitId as number;
          this.langService.editWord(w);
        }
       }
     )
  }
  deleteWord(w:Word){
    let dialogRef = this.dialog.open(CreateWordDialogComponent, {
      // height: '400px',
      // width: '600px',
      data :new WordDialogData(w.nameAz,w.nameEn,w.unitId,DialogActionTypes.delete)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
        if(data){
          let deletedWord=w;
          let index=this.langService.db.Words.findIndex(x=>x.id==w.id);

          this.langService.deleteWord(w.id);
          let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
            data:new SnackBarData('Bölmə silindi',SnackBarTypes.info,"Geri al") ,
            panelClass: [SnackBarTypes.info],
            duration:3000
          });
          snackbarRef.onAction().subscribe(() => {
            this.langService.insertAtWord(index,deletedWord);
          });
        }
       }
     )
  }
  findUnit(id:number):string|null|undefined{
    return this.unitList?.find(x=>x.id==id)?.name;
  }
  change(){
    console.log(this.unitId);
  }
}
