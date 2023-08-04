import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellService } from '../shell/shell.service';
import { DownloadJsonComponent } from './components/download-json/download-json.component';
import { QuestionComponent } from './components/question/question.component';
import { UnitsComponent } from './components/units/units.component';
import { UploadJsonComponent } from './components/upload-json/upload-json.component';
import { VideoGuideComponent } from './components/video-guide/video-guide.component';
import { WordsComponent } from './components/words/words.component';
import { ReadingComponent } from './components/reading/reading.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';

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
    },
    {
      path: 'read',
      component: ReadingComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {path:'**',component:QuestionComponent}
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
