import { UserService } from './../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;

  constructor(public formBuilder: FormBuilder, private _user:UserService, private router: Router) {

    this.form = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });

  }
  
  ngOnInit(): void {
    window.scroll(1000,0)
  }

  createAcount() {
    this._user.register(this.form.value).subscribe({
      next: res => {
        this.router.navigate(['/login']);
      },
      error: err => console.log(err)
    })

  }
}
