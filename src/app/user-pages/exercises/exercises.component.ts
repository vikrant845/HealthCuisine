import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../exercises.service';
import { Subject, Subscription, catchError, debounceTime, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserModel } from 'src/models/userModel';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises!: any;
  exerciseSubject: Subject<any> = new Subject();
  error: any = '';
  currentPage: number = 1;
  from: number = 1;
  to: number = 10;
  pages: number = 0;
  searchTerm = '';
  results = 0;
  action = true;
  user!: UserModel;
  exerciseSub: Subscription = new Subscription();
  
  constructor(private authService: AuthService, private exerciseService: ExercisesService, private router: Router) { }

  ngOnInit(): void {
    this.exerciseSubject.pipe(debounceTime(500)).subscribe((page) => {
      this.getExercises(page, this.searchTerm);
    })
    this.getExercises(this.currentPage);
    this.user = this.authService.getUser();
  }
  
  ignoreKeys(query: any) {
    const key = query.code;
    if (key === 'ControlRight' ||
        key === 'ControlLeft' ||
        key === 'ShiftRight' ||
        key === 'ShiftLeft' ||
        key === 'AltRight' ||
        key === 'AltLeft' ||
        key === 'Backspace' ||
        key === 'Enter' ||
        key === 'ArrowUp' ||
        key === 'ArrowDown' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight'
    ) return true;
    return false;
  }
  
  getExercises(page: number, query = '') {
    this.exerciseSub = this.exerciseService.getAllExercises(this.currentPage, 12, query).pipe(catchError(err => { this.error = err; console.log(err); return of([err]) })).subscribe(exercises => {
      this.exercises = exercises.exercises;
      this.results = exercises.results;
    });
  }
  
  search(query: KeyboardEvent, page: number) {
    if (this.ignoreKeys(query)) return;
    this.currentPage = 1;
    this.searchTerm = (query.target as HTMLInputElement).value;
    this.exerciseSubject.next(page);
  }
  
  prevNext(action: string) {
    if (action === 'prev') {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1; 
        if (this.currentPage < this.from) {
          this.to = this.from - 1;
          this.from -= 10;
        }
      }
      this.getExercises(this.currentPage, this.searchTerm);
    }
    if (action === 'next') {
      if (this.results === 12) {
        this.currentPage = this.currentPage + 1;
        if (this.currentPage > this.to) {
          this.from = this.currentPage;
          this.to = this.from + 9;
        }
        this.getExercises(this.currentPage, this.searchTerm);
      }
    }
  }

  exerciseClick(exercise: any) {
    this.router.navigate([ '/user/exercises', exercise._id ]);
  }

  onLikeUnlike(event: any, exercise: string) {
    if (!this.user.likedWorkouts.includes(exercise)) {
      event.target.attributes.name.value = 'heart';
      this.exerciseSub = this.exerciseService.likeUnlikeExercise(exercise, 'like').subscribe((res: any) => {
        this.user = res.data.user;
        this.authService.setUser(this.user);
      });
      this.action = false;
    } else {
      event.target.attributes.name.value = 'heart-outline';
      this.exerciseSub = this.exerciseService.likeUnlikeExercise(exercise, 'unlike').subscribe((res: any) => {
        this.user = res.data.user;
        this.authService.setUser(this.user);
      });
      this.action = true;
    }
  }
  
  getLikedUnliked(exercise: any) {
    if (this.user.likedWorkouts.includes(exercise._id)) {
      this.action = true;
      return 'heart';
    }
    else {
      this.action = false;
      return 'heart-outline';
    }
  }

  ngOnDestroy(): void {
    this.exerciseSubject.unsubscribe();
    this.exerciseSub.unsubscribe();
  }
}