import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription, catchError, delay, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';


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
  error: any;
  changing_password = false;
  loginSub: Subscription = new Subscription();
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    this.loginSub = this.authService.login(username, password).pipe(catchError(err => {
      this.error = err;
      setTimeout(() => {
        this.error = undefined;
      }, 1000)
      return of();
    })).subscribe(token => {
      this.error = undefined;
      if (token) {
        localStorage.setItem('jwt', token.token);
        this.authService.setUser(token.user);
        this.router.navigateByUrl('/user/profile');
      }
    });
  }

  forgotPassword(username: string) {
    console.log(username);
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

}