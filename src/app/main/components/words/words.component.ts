import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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
  constructor(private shellService:ShellService, public dialog:MatDialog,private langService:LanguageService,private _snackBar: MatSnackBar) { 
    shellService.showLoader();
    this.unitList=this.langService.db.Units;
    this.storiedData=this.langService.db.Words;
    this.filteredData=this.langService.db.Words;
  }
  dataSource:MatTableDataSource<Word>=new MatTableDataSource<Word>();
  storiedData:Array<Word>=[];
  filteredData:Array<Word>=[];
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.getWords(0);
    setTimeout(() => {
      this.shellService.hideLoader();
    }, 1);
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
           this.filter();
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
          this.filter();
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
            data:new SnackBarData('Bölmə silindi',SnackBarTypes.info,"Geri al") ,
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
    this.filter();
  }
  changeAz(){
    this.filter();
  }
  changeEn(){
    this.filter();
  }
  filter(){
    this.paginator.firstPage()
    this.filteredData=this.storiedData.filter(
      w=>
            ((this.unitId&&this.unitId.length>0)?this.unitId?.includes(+w.unitId):true)&&
            ((this.wordAz.isEmpty())?true:(w.nameAz.toLowerCase().includes(this.wordAz.toLowerCase())))&&
            ((this.wordEn.isEmpty())?true:(w.nameEn.toLowerCase().includes(this.wordEn.toLowerCase())))
      );
      
      //this.length = this.dataSource.data.length;
      //this.dataSource.paginator  = this.paginator;
      this.getWords(0);
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
}
