import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { QuestionComponent } from './components/question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../shared/material/material.module';
import { UnitsComponent } from './components/units/units.component';
import { WordsComponent } from './components/words/words.component';
import { UploadJsonComponent } from './components/upload-json/upload-json.component';
import { DownloadJsonComponent } from './components/download-json/download-json.component';
import { ClearDataComponent } from './components/clear-data/clear-data.component';
import { VideoGuideComponent } from './components/video-guide/video-guide.component';
import { LanguageService } from './services/language.service';
import { CreateUnitDialogComponent } from './dialogs/create-unit-dialog/create-unit-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorSnacbarComponent } from './snacBars/error-snacbar/error-snacbar.component';
import { CreateWordDialogComponent } from './dialogs/create-word-dialog/create-word-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    QuestionComponent,
    UnitsComponent,
    WordsComponent,
    UploadJsonComponent,
    DownloadJsonComponent,
    ClearDataComponent,
    VideoGuideComponent,
    CreateUnitDialogComponent,
    ErrorSnacbarComponent,
    CreateWordDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    //ShellModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    //RouterModule,
    MainRoutingModule,
    //HttpClientModule,
    //FontAwesomeModule,
    MaterialModule
  ],
  
})
export class MainModule { }
