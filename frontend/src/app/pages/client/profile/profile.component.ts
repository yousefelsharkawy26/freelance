import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;
  userId: any;
  image: any;

  form: FormGroup;

  constructor(public formBuilder: FormBuilder, private _user:UserService) {

    this.form = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [])
    });

  }

  ngOnInit(): void {
    this.userId = this._user.getUserIdFromToken();

    this._user.getUserById(this.userId).subscribe({
      next: res => {
        this.user = res;
        this.form.reset(res);
      }
    })
  }

  selectImage(e: any) {
    this.image = e.target.files[0];
  }

  save() {
    let fd = new FormData();
    fd.append('firstname', this.form.value.firstname);
    fd.append('lastname', this.form.value.lastname);
    fd.append('email', this.form.value.email);
    if(this.form.value.password)
      fd.append('password', this.form.value.password);
    if(this.image)
      fd.append('image', this.image)

    this._user.editUser(this.userId, fd).subscribe({
      next: res => {
        window.location.reload();
      }
    });
  }
}
