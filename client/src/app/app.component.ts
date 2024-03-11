import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <div class="pt-[135px] md:pt-10 justify-center items-center flex">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'client';
}
