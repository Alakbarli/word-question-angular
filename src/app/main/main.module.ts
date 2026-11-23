import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { QuestionComponent } from './components/question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { UnitsComponent } from './components/units/units.component';
import { WordsComponent } from './components/words/words.component';
import { UploadJsonComponent } from './components/upload-json/upload-json.component';
import { VideoGuideComponent } from './components/video-guide/video-guide.component';
import { CreateUnitDialogComponent } from './dialogs/create-unit-dialog/create-unit-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorSnacbarComponent } from './snacBars/error-snacbar/error-snacbar.component';
import { CreateWordDialogComponent } from './dialogs/create-word-dialog/create-word-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ReadingComponent } from './components/reading/reading.component';
import { GenerateStoryComponent } from './dialogs/generate-story/generate-story.component';
import { ReadStoryComponent } from './dialogs/read-story/read-story.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [
    QuestionComponent,
    UnitsComponent,
    WordsComponent,
    UploadJsonComponent,
    VideoGuideComponent,
    CreateUnitDialogComponent,
    ErrorSnacbarComponent,
    CreateWordDialogComponent,
    ConfirmDialogComponent,
    ReadingComponent,
    GenerateStoryComponent,
    ReadStoryComponent,
    SettingsComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  
})
export class MainModule { }
