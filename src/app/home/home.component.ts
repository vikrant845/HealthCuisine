import { trigger, transition, animate, keyframes, style, animation, useAnimation, query, group, state, animateChild } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { appearAnimation } from '../animations/appearAnimation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('containerAnimation', [
      transition('* => *', [
        group([
          query('.top-text h1, .bottom-text h1, .buttons button', [
            useAnimation(appearAnimation, {
              params: {
                hideDist: '8rem',
                time: '500ms',
                fadePercent: '0',
                delay: '500ms'
              }
            })
          ]),
          query('.hero-text p', [
            useAnimation(appearAnimation, {
              params: {
                hideDist: '10.5%',
                time: '500ms',
                fadePercent: '0',
                delay: '0ms'
              }
            })
          ]),
        ]),
        query('@fadeIn', animateChild())
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
