import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Unit } from 'src/app/models/unit';
import { MatDialog } from '@angular/material/dialog';
import { CreateUnitDialogComponent } from '../../dialogs/create-unit-dialog/create-unit-dialog.component';
import { UnitDialogData } from 'src/app/models/unit-dialog';
import { DialogActionTypes } from '../../const/dialog-action-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnacbarComponent } from '../../snacBars/error-snacbar/error-snacbar.component';
import { SnackBarTypes } from '../../const/snack-bar-types';
import { SnackBarData } from 'src/app/models/snack-bar-data.model';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'operation'];
  constructor(public dialog:MatDialog,private langService:LanguageService,private _snackBar: MatSnackBar) {
    this.dataSource=langService.db.Units;
   }
  dataSource:Array<Unit>;
  ngOnInit(): void {
    this.dataSource=this.langService.db.Units;
  }
  addUnit(){
    let dialogRef = this.dialog.open(CreateUnitDialogComponent, {
     // height: '400px',
     // width: '600px',
     data :new UnitDialogData(null,DialogActionTypes.add)
    });
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data){
          this.langService.addUnit(data);
        }
      }
    )
  }
  editUnit(unit:Unit){
    let dialogRef = this.dialog.open(CreateUnitDialogComponent, {
      // height: '400px',
      // width: '600px',
      data :new UnitDialogData(unit.name,DialogActionTypes.update)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
        if(data){
          this.langService.editUnit(unit.id,data);
        }
       }
     )
  }
  
  deleteUnit(unit:Unit){
    if(this.langService.hasWordOfUnit(unit.id)){
      this._snackBar.openFromComponent(ErrorSnacbarComponent, {
        data:new SnackBarData('Bu bölməyə aid söz olduğu üçün bölmə silinə bilməz',SnackBarTypes.error) ,
        panelClass: [SnackBarTypes.error],
        duration:1500
      });
      return;
    }
    let dialogRef = this.dialog.open(CreateUnitDialogComponent, {
      // height: '400px',
      // width: '600px',
      data :new UnitDialogData(unit.name,DialogActionTypes.delete)
     });
     dialogRef.afterClosed().subscribe(
       data=>{
        if(data){
          let deletedUnit=unit;
          let index=this.langService.db.Units.findIndex(x=>x.id==unit.id);

          this.langService.deleteUnit(unit.id);
          let snackbarRef=this._snackBar.openFromComponent(ErrorSnacbarComponent, {
            data:new SnackBarData('Bölmə silindi',SnackBarTypes.info,"Geri al") ,
            panelClass: [SnackBarTypes.info],
            duration:3000
          });
          snackbarRef.onAction().subscribe(() => {
            this.langService.insertAtUnit(index,deletedUnit);
          });
        }
       }
     )
  }

}
