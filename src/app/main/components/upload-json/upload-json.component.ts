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
      if(!file.name.toLowerCase().endsWith(".json")){
        this.errorMessage="Düzgün fayl seçin."
      }
      else{
        let reader = new FileReader;
             reader.onloadend = function (rd) {
                let data=rd.target?.result?.toString();
                let json:any=null;
                try{
                  json=data?JSON.parse(data):null;
                }
                catch{
                  json=null;
                }
                if(compThis.isValidDb(json)){
                  compThis.jsonUploaded=json;
                }
                else{
                  compThis.jsonUploaded=null;
                  compThis.errorMessage ="Düzgün fayl seçin."
                }

             }
             reader.readAsText(file);
      }
      element.value="";
    }
  }
  isValidDb(json:any):json is DB{
    if(!json||typeof json!="object"||!Array.isArray(json.Units)||!Array.isArray(json.Words)){
      return false;
    }
    if(json.Stories!=undefined&&!Array.isArray(json.Stories)){
      return false;
    }
    let validUnits=json.Units.every((u:any)=>u&&typeof u.id=="number"&&typeof u.name=="string");
    let validWords=json.Words.every((w:any)=>w&&typeof w.id=="number"&&typeof w.nameAz=="string"&&typeof w.nameEn=="string"&&w.unitId!=null);
    return validUnits&&validWords;
  }
  addWords(){
    if(this.jsonUploaded!=null){
     this.jsonUploaded.Stories=this.jsonUploaded.Stories||[];
     this.langService.db=this.jsonUploaded;
     this.langService.syncAll();
     this.uploaded=true;
     this.jsonUploaded=null;
     
    }
  }

}
