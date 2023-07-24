import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DB } from 'src/app/models/db';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.scss']
})
export class UploadJsonComponent implements OnInit,AfterViewInit,OnDestroy {
  @ViewChild('inputFile',{static:false}) input:ElementRef|undefined;
  errorMessage="";
  uploaded=false;
  jsonUploaded: DB |null=null;
  constructor(private langService:LanguageService) { }
  ngOnDestroy(): void {
    this.uploaded=false;
    this.errorMessage="";
  }
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
    this.uploaded=false;
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
     this.langService.syncAll();
     this.uploaded=true;
     this.jsonUploaded=null;
     
    }
  }

}
