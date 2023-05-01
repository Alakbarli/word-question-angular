import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { QuestionComponent } from './components/question/question.component';
import { FormsModule } from '@angular/forms';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../shared/material/material.module';
import { UnitsComponent } from './components/units/units.component';
import { WordsComponent } from './components/words/words.component';
import { NewWordComponent } from './components/new-word/new-word.component';
import { UploadJsonComponent } from './components/upload-json/upload-json.component';
import { DownloadJsonComponent } from './components/download-json/download-json.component';
import { ClearDataComponent } from './components/clear-data/clear-data.component';
import { VideoGuideComponent } from './components/video-guide/video-guide.component';
import { LanguageService } from './services/language.service';


@NgModule({
  declarations: [
    QuestionComponent,
    UnitsComponent,
    WordsComponent,
    NewWordComponent,
    UploadJsonComponent,
    DownloadJsonComponent,
    ClearDataComponent,
    VideoGuideComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    //ShellModule,
    FormsModule,
    //ReactiveFormsModule,
    CommonModule,
    //RouterModule,
    MainRoutingModule,
    //HttpClientModule,
    //FontAwesomeModule,
    MaterialModule
  ],
  
})
export class MainModule { }
