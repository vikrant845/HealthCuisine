import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  age = Array.from(Array(100).keys());
  values: any;
  signUp: FormGroup = new FormGroup({
    firstName: new FormControl('', [ Validators.required ]),
    lastName: new FormControl('', [ Validators.required ]),
    age: new FormControl(18, [ Validators.required, Validators.min(18) ]),
    gender: new FormControl('', [ Validators.required ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    phone: new FormControl('', [ Validators.minLength(10), Validators.maxLength(10) ]),
    password: new FormControl('', [ Validators.required ]),
    passwordConfirm: new FormControl('', [ Validators.required ]),
    username: new FormControl('', [ Validators.required ])
  });
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signUp.valid) {
      this.values = this.signUp.value;
      console.log(this.signUp.value);
      this.authService.signup(this.signUp.value).subscribe((res: any) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          this.authService.setUser(res.user);
          this.router.navigate(['/user/profile']);
        }
      });
    }
  }

  getErrors(control: AbstractControl | null) {
    if (control!.errors) {
      if (control?.errors['required'] && control.touched) return 'The field cannot be blank';
      if (control?.errors['email']) return 'Please enter a valid email';
      if (control?.errors['minlength']) return 'This field should atleast be ' + control?.errors['minlength'].requiredLength + ' long.';
      if (control?.errors['maxlength']) return 'This field should atmost be ' + control?.errors['maxlength'].requiredLength + ' long.';
    }
    return '';
  }
}
