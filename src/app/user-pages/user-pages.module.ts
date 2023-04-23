import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { UserPagesRoutingModule } from './user-pages-routing.module';
import { ExercisesComponent } from './exercises/exercises.component';
import { HttpClientModule } from '@angular/common/http';
import { FromToDirective } from './from-to.directive';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExerciseComponent } from './exercise/exercise.component';

@NgModule({
  declarations: [
    ExercisesComponent,
    FromToDirective,
    UserProfileComponent,
    UserNavigationComponent,
    SidebarComponent,
    ExerciseComponent
  ],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserPagesModule { }
