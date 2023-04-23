import { Component, OnInit, Output } from '@angular/core';
import { Subject, Subscription, catchError, debounceTime, map, of } from 'rxjs';
import { ExercisesService } from '../exercises.service';
import { UserModel } from 'src/models/userModel';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnInit {

  searchSubject: Subject<string> = new Subject<string>();
  exercises: any;
  user!: UserModel;
  exerciseSub: Subscription = new Subscription();
  logoutSub: Subscription = new Subscription();
  
  constructor(private exerciseService: ExercisesService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.exerciseSub = this.exerciseService.getAllExercises(1, 0, value).subscribe(exercises => {
        this.exercises = exercises.exercises;
      });
    });
    this.user = this.authService.getUser();
  }

  onSearch(event: any) {
    if (event.target.value === '') {
      this.exercises.splice(0, this.exercises.length);
      return;
    }
    this.searchSubject.next(event.target.value);
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
    this.exerciseSub.unsubscribe();
    this.logoutSub.unsubscribe();
    this.searchSubject.unsubscribe();
  }
}