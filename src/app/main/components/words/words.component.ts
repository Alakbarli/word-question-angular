import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  unitId:Array<number>=[];
  wordAz:string="";
  wordEn:string="";
  unitList:Array<Unit>|null=null;
  displayedColumns: string[] = ['no', 'nameAz', 'nameEn', 'unitName','operation'];
  htmlForRender="";
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  currentSize: number = 0;
  pageSize: number = 8;
  constructor(public dialog:MatDialog,private langService:LanguageService,private _snackBar: MatSnackBar) { 
    
  }
  dataSource:MatTableDataSource<Word>=new MatTableDataSource<Word>();
  storiedData:Array<Word>=[];
  ngOnInit(): void {
    this.unitList=this.langService.db.Units;
    this.dataSource.data=this.langService.db.Words;
    this.storiedData=this.langService.db.Words;
    //this.renderWordHtml()
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
  // renderWordHtml(){
  //   let count=1;
  //   this.htmlForRender="";
  //   for(let i=0;i<this.dataSource.length;i++){
  //     this.htmlForRender+= `
  //               <tr data-id=${this.dataSource[i].id}>
  //                   <th scope="row">${count}</th>
  //                   <td>${this.dataSource[i].nameAz}</td>
  //                   <td>${this.dataSource[i].nameEn}</td>
  //                   <td>${((this.findUnit(this.dataSource[i].unitId)!=undefined))}</td>
  //                   <td>
  //                       <span (click)="editWord(${this.dataSource[i]})" class="edit"><i title="Düzəliş et" class="fal fa-edit"></i></span>
  //                       <span (click)="deleteWord(${this.dataSource[i]})" class="remove"><i title="Sil" class="fal fa-trash-alt"></i></span>
  //                   </td>
  //               </tr>
  //               `;
  //               count++;
  //   }
  // }
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
    this.filter();
  }
  changeAz(){
    this.filter();
  }
  changeEn(){
    this.filter();
  }
  filter(){
    this.dataSource.data=this.storiedData.filter(
      w=>
            (this.unitId&&this.unitId.length>0)?this.unitId?.includes(w.unitId):true&&
            ((this.wordAz.isEmpty())?true:(w.nameAz.includes(this.wordAz as string)))&&
            ((this.wordEn.isEmpty())?true:(w.nameEn.includes(this.wordEn as string)))
      );
      (this.paginator as MatPaginator).length = this.dataSource.data.length;
      this.dataSource.paginator  = this.paginator;
  }
  pageChanged(event: any) {
    let pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;
    let previousSize = this.pageSize * pageIndex;
    this.getNextData(previousSize, (pageIndex + 1).toString(), this.pageSize.toString());
  }
}
