import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellService } from '../shell/shell.service';
import { DownloadJsonComponent } from './components/download-json/download-json.component';
import { NewWordComponent } from './components/new-word/new-word.component';
import { QuestionComponent } from './components/question/question.component';
import { UnitsComponent } from './components/units/units.component';
import { UploadJsonComponent } from './components/upload-json/upload-json.component';
import { VideoGuideComponent } from './components/video-guide/video-guide.component';
import { WordsComponent } from './components/words/words.component';

const routes: Routes = [
  ShellService.childRoutes([
    { path: '', redirectTo: '/question', pathMatch: 'full'},
    {
      path: 'question',
      component: QuestionComponent
    },
    {
      path: 'units',
      component: UnitsComponent
    },
    {
      path: 'words',
      component: WordsComponent
    },
    {
      path: 'new-word',
      component: NewWordComponent
    },
    {
      path: 'upload',
      component: UploadJsonComponent
    },
    {
      path: 'download',
      component: DownloadJsonComponent
    },
    {
      path: 'guide',
      component: VideoGuideComponent
    }
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
