import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserModel } from 'src/models/userModel';
import { Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @ViewChild('navBar') navigation!: ElementRef;
  homeComponent: boolean = true;
  animate: boolean = true;
  user!: UserModel;
  logoutSub: Subscription = new Subscription();

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const homeComponent = this.navigation.nativeElement.parentElement.parentElement;
    if (homeComponent.parentElement.nodeName === 'APP-HOME') {
      let position = homeComponent.querySelector('.bottom-text').getBoundingClientRect().top;
      let opacity = window.scrollY / position;
      if (window.scrollY > position) opacity = 1;
      this.navigation.nativeElement.style.background = `rgba(255, 189, 135, ${ opacity })`;
      // if (position < window.scrollY) {
      // }
    }
  }
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  ngAfterViewInit(): void {
    if (this.navigation.nativeElement.parentElement.parentElement.parentElement.nodeName !== 'APP-HOME') {
      this.navigation.nativeElement.style.background = '#ffbd87';
    }
  }

  openMenu(event: any) {
    if (event.target.parentElement.nextSibling.classList.contains('noDisplay')) event.target.parentElement.nextSibling.classList.remove('noDisplay');
    else event.target.parentElement.nextSibling.classList.add('noDisplay')
  }

  logout () {
    this.logoutSub = this.authService.logout().pipe(catchError(err => {
      return of(null);
    })).subscribe(() => {
      if (null) return;
      this.authService.deleteUser();
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.logoutSub.unsubscribe();
  }
}