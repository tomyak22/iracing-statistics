import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], //  Add RouterOutlet to imports
  template: `<router-outlet></router-outlet>`, //  The key is the router-outlet
})
export class AppComponent {
  title = 'my-app';
}