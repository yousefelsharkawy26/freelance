import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-services',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent {
  userId: any;
  services: any;

  constructor(private _service: ServiceService, private _user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this._user.getUserIdFromToken();

    this._service.getMyServices(this.userId).subscribe({
      next: res => {
        this.services = res;
      }
    });
  }

  delete(id: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.deleteService(id).subscribe({
          next: res => {
            this.ngOnInit();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          },
          error: err => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!"
            });
          }
        })
      }
    });



  }
}
