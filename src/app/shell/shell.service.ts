import { Injectable } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

@Injectable({
  providedIn: 'root'
})
export class ShellService {
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