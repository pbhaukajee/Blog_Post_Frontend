import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp(): void {
    if (this.signUpForm.invalid) {
      alert('Please provide full information');
      return;
    }

    const user = this.signUpForm.value;
    this.userService.signUp(user).subscribe((result: string) => {
      if (result === 'success') {
        alert('User registered!');
        this.router.navigate(['/login']);
      } else {
        alert('Unable to register user!');
      }
    });
  }
}
