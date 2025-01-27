import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;
constructor(public formBuilder: FormBuilder, private _user:UserService, private router: Router) {

    this.form = this.formBuilder.group({
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

  login() {
    this._user.login(this.form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        console.log(res.token);

        this.router.navigate(['/client']);
      },
      error: err => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Email or password invaild",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }
}
