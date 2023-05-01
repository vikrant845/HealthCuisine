import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.triggerScrollAnimations();
    }, 0);
  }
  
  triggerScrollAnimations() {
    gsap.from(this.container.nativeElement.querySelector('.top-text h1'), {
      x: (this.container.nativeElement.querySelector('.top-text') as HTMLElement).offsetWidth,
      delay: 1,
      duration: 0.8
    });

    gsap.from(this.container.nativeElement.querySelector('.bottom-text h1'), {
      x: -(this.container.nativeElement.querySelector('.bottom-text') as HTMLElement).offsetWidth,
      delay: 1,
      duration: 0.8
    });

    // gsap.from(this.container.nativeElement.querySelector('.hero-text'), {
    //   clipPath: 'inset(0 0 100% 0)',
    //   duration: 2
    // });

    Array.from(this.container.nativeElement.getElementsByClassName('animate')).forEach(element => {
      gsap.from(element, {
        duration: 1,
        y: '-4rem',
        transformOrigin: 'center center',
        opacity: 0,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      });
    })

    gsap.from(this.container.nativeElement.querySelector('.hero-text p'), {
      y: (this.container.nativeElement.querySelector('.hero-text') as HTMLElement).offsetHeight,
      delay: 1,
      duration: 1
    });

    gsap.from(this.container.nativeElement.querySelectorAll('.slideshow-container > .image'), {
      y: '-3rem',
      opacity: 0,
      scrollTrigger: {
        trigger: '.slideshow-container > .image',
        start: 'top 80%'
      },
      stagger: {
        amount: 2,
        from: 'start'
      },
    });

    gsap.from(this.container.nativeElement.querySelectorAll('.benefit'), {
      y: '-3rem',
      opacity: 0,
      scrollTrigger: {
        trigger: '.benefit',
        start: 'top 80%'
      },
      stagger: {
        amount: 2,
        from: 'start'
      },
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.killAll(true);
  }

}