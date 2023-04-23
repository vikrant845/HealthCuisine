import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../exercises.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { UserModel } from 'src/models/userModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  animations: [
    trigger('bounce', [
      transition('* => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateY(-2rem)',
            offset: 0
          }),
          style({
            transform: 'translateY(0)',
            offset: 0.2
          }),
          style({
            transform: 'translateY(-1.4rem)',
            offset: 0.4
          }),
          style({
            transform: 'translateY(0)',
            offset: 0.6
          }),
          style({
            transform: 'translateY(-0.6rem)',
            offset: 0.8
          }),
          style({
            transform: 'translateY(0)',
            offset: 1
          }),
        ]))
      ])
    ])
  ]
})
export class ExerciseComponent implements OnInit {

  exercise: any;
  action = true;
  liked = true;
  user!: UserModel;
  routeSub: Subscription = new Subscription();
  exerciseSub: Subscription = new Subscription();
  
  constructor(private exercisesService: ExercisesService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.exerciseSub = this.exercisesService.getExercise(params['id']).subscribe(exercise => {
        this.exercise = exercise.exercise;
      });
    });
    this.user = this.authService.getUser();
  }

  getLikedUnliked() {
    if (this.user.likedWorkouts.includes(this.exercise._id)) {
      this.liked = true;
      return 'heart';
    }
    else {
      this.liked = false;
      return 'heart-outline';
    }
  }

  onLikeUnlike(event: any) {
    if (this.action) {
      event.target.attributes.name.value = 'heart';
      this.action = false;
      this.exerciseSub = this.exercisesService.likeUnlikeExercise(this.exercise._id, 'like').subscribe((res: any) => {
        this.user = res.data.user;
        this.authService.setUser(res.data.user);
      });
      this.liked = true;
    } else {
      event.target.attributes.name.value = 'heart-outline';
      this.action = true;
      this.exerciseSub = this.exercisesService.likeUnlikeExercise(this.exercise._id, 'unlike').subscribe((res: any) => {
        this.user = res.data.user;
        this.authService.setUser(res.data.user);
      });
      this.liked = false;
    }
  }

  addToOngoing(exercise: string) {
    if (!this.user.ongoingWorkouts.includes(exercise)) {
      this.exerciseSub = this.exercisesService.likeUnlikeExercise(exercise, 'addOngoing').subscribe((res: any) => {
        this.user = res.user;
        this.authService.setUser(res.user);
      });
    } else {
      this.exerciseSub = this.exercisesService.likeUnlikeExercise(exercise, 'removeOngoing').subscribe((res: any) => {
        this.user = res.user;
        this.authService.setUser(res.user);
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.exerciseSub.unsubscribe();
  }
}
