import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription, catchError, delay, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('errorAnimation', [
      state('normal', style({
        'box-shadow': ''
      })),
      state('error', style({
        'box-shadow': 'rgba(242, 12, 54, 1) 0px 0px 8px'
      })),
      transition('normal => error', animate(500)),
      transition('error => normal', animate(500))
    ])
  ]
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  error: any;
  changing_password = false;
  loginSub: Subscription = new Subscription();
  loggingIn = false;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      gsap.from(this.container.nativeElement.querySelectorAll('.animate'), {
        x: '-4rem',
        delay: 0.5,
        opacity: 0,
        stagger: {
          amount: 0.5
        }
      });
      gsap.from(this.container.nativeElement.querySelector('.form_container').childNodes, {
        y: '-2rem',
        delay: 0.8,
        opacity: 0,
        stagger: {
          amount: 0.5
        }
      });
    }, 0);
  }
  
  login() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    this.loggingIn = true;
    this.loginSub = this.authService.login(username, password).pipe(catchError(err => {
      this.error = err;
      setTimeout(() => {
        this.error = undefined;
      }, 1000)
      this.loggingIn = false;
      return of();
    })).subscribe(token => {
      this.error = undefined;
      if (token) {
        localStorage.setItem('jwt', token.token);
        this.authService.setUser(token.user);
        this.router.navigateByUrl('/user/profile');
      }
    });
    this.loggingIn = true;
  }

  forgotPassword(username: string) {
    console.log(username);
  }
  
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
    ScrollTrigger.getAll().forEach(trigger => { trigger.kill(true) });
  }

}