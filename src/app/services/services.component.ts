import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

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
    this.container.nativeElement.querySelectorAll('.animate').forEach(element => {
      gsap.from(element, {
        x: '-3rem',
        duration: 2,
        opacity: 0,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      });
    });
    
    gsap.from(this.container.nativeElement.querySelectorAll('.workout_container .workout'), {
      x: '-4rem',
      delay: 1,
      opacity: 0,
      stagger: {
        amount: 1
      }
    });
    
    gsap.from(this.container.nativeElement.querySelectorAll('.item_container .item'), {
      x: '-4rem',
      delay: 0.8,
      opacity: 0,
      stagger: {
        amount: 0.8
      },
      scrollTrigger: {
        trigger: '.item_container .item',
        start: 'top 80%',
        toggleActions: 'play none none reset'
      }
    });
    
    gsap.from(this.container.nativeElement.querySelectorAll('.certifications .certification'), {
      y: '4rem',
      delay: 0.8,
      opacity: 0,
      stagger: {
        amount: 0.8
      },
      scrollTrigger: {
        trigger: '.certifications .certification',
        start: 'top 80%',
        toggleActions: 'play none none reset'
      }
    });

    gsap.from(this.container.nativeElement.querySelectorAll('.pricings .pricing'), {
      x: '4rem',
      delay: 0.8,
      opacity: 0,
      stagger: {
        amount: 0.8
      },
      scrollTrigger: {
        trigger: '.pricings .pricing',
        start: 'top 80%',
        toggleActions: 'play none none reset'
      }
    });
    
    gsap.from(this.container.nativeElement.querySelector('.nutrition_section')?.childNodes as NodeListOf<ChildNode>, {
      x: '4rem',
      delay: 0.8,
      opacity: 0,
      stagger: {
        amount: 0.8
      }
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.killAll(true);
  }
  
}