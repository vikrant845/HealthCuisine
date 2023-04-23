import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  constructor(private http: HttpClient) { }

  getAllExercises(page: number = 1, limit: number = 0, query: string) {
    if (query !== '') return this.http.get<any>(`${ environment.ROOT_URL }/exercises?target=${ query }&exerciseName=${ query }&bodyPart=${ query }&page=${ page }&limit=${ limit }`,
    {
      headers: { 'Authorization': `Bearer ${ localStorage.getItem('jwt') }` }
    }
    );
    return this.http.get<any>(`${ environment.ROOT_URL }/exercises?page=${ page }&limit=12`, {
      headers: { 'Authorization': `Bearer ${ localStorage.getItem('jwt') }` }
    });
  }

  ngOnInit () {
  }

  getExercise(id: string) {
    return this.http.get<any>(`${ environment.ROOT_URL }/exercises/${ id }`);
  }

  likeUnlikeExercise(id: string, action: string) {
    return this.http.patch(`${ environment.ROOT_URL }/exercises/${ id }/action/${ action }`, {}, {
      headers: {
        'Authorization': `Bearer ${ localStorage.getItem('jwt') }`
      }
    });
  }
}