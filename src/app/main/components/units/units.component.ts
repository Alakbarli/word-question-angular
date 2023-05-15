import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Unit } from 'src/app/models/unit';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'operation'];
  constructor(private langService:LanguageService) {
    this.dataSource=langService.db.Units;
   }
  dataSource:Array<Unit>;
  ngOnInit(): void {
    this.dataSource=this.langService.db.Units;
    console.log(this.dataSource)
  }

}
