import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  form: FormGroup;
  image: any;
  userId: any;

  constructor(private fb: FormBuilder, private _service: ServiceService, private _user: UserService, private router: Router) {
    this.form = fb.group({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      salary: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  }

  selectImage(e: any) {
    this.image = e.target.files[0];
  }

  create() {
    let fd = new FormData();

    console.log(this.form);

    fd.append('name', this.form.value.name);
    fd.append('category', this.form.value.category);
    fd.append('location', this.form.value.location);
    fd.append('salary', this.form.value.salary);
    fd.append('description', this.form.value.description);
    fd.append('image', this.image);
    fd.append('idUser', this._user.getUserIdFromToken())

    this._service.createService(fd).subscribe({
      next: res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your post has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/client/my-services'])
      }
    });
  }
}
