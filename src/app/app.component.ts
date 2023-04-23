import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('1000ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ])
  ]
})
export class AppComponent {
  title = 'HealthCuisine';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
