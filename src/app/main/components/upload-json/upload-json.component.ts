import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DB } from 'src/app/models/db';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.scss']
})
export class UploadJsonComponent implements OnInit,AfterViewInit {
  @ViewChild('inputFile',{static:false}) input:ElementRef|undefined;
  errorMessage=""
  jsonUploaded: DB |null=null;
  constructor(private langService:LanguageService) { }
  ngAfterViewInit(): void {
  }
  
  upload(){
    this.input?.nativeElement.click()
  }
  ngOnInit(): void {

  }
  uploadFile(event: Event) {
    let compThis=this;
    this.errorMessage="";
    const element = event.currentTarget as HTMLInputElement;
    let file: File| null |undefined= element.files?.item(0);
    if (file) {
      if(file.type.toLowerCase()!="application/json"){
        this.errorMessage="Düzgün fayl seçin."
      }
      else{
        let reader = new FileReader;
             reader.onloadend = function (rd) {
                let data=rd.target?.result?.toString();
                if(data){
                  let json=JSON.parse(data);
                  compThis.jsonUploaded=json;
                }
                else{
                  compThis.errorMessage ="Düzgün fayl seçin."
                }
                 
             }
             reader.readAsText(file);
      }
    }
  }
  addWords(){
    if(this.jsonUploaded!=null){
     this.langService.db=this.jsonUploaded;
     this.langService.sync();
    }
  }

}
