import { Injectable } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShellService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private nightModeSubject=new BehaviorSubject<boolean>(true);
  nightMode$=this.nightModeSubject.asObservable();

  showLoader(): void {
    this.isLoadingSubject.next(true);
  }

  hideLoader(): void {
    this.isLoadingSubject.next(false);
  }

  changeNightMode(){
    this.nightModeSubject.next(!this.nightModeSubject.value);
  }
  /**
     * Creates routes using the shell component and authentication.
     * @param routes The routes to add.
     * @return {Route} The new route using shell as the base.
     */
   static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      // =canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
  }