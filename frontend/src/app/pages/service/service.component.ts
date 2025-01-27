import { Component } from '@angular/core';
import { ServiceService } from '../../core/services/service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProposalService } from '../../core/services/proposal.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

  id: any;
  service: any;
  proposals: any;
  form: FormGroup;
  constructor(private _service: ServiceService, private _proposal: ProposalService, private _user: UserService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = fb.group({
      price: new FormControl(0, [Validators.required]),
      days: new FormControl(0, [Validators.required]),
      cover: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.getServiceProposals();

    this._service.getServiceById(this.id).subscribe({
      next: res => this.service = res
    });

    window.scroll(1000, 0)
  }

  scroll() {
    window.scroll(0, 900);
  }

  getServiceProposals() {
    this._proposal.getProposalsByServiceId(this.id).subscribe({
      next: res => {
        this.proposals = res;
      }
    });
  }

  send() {
    let fd = {
      ...this.form.value,
      idUser: this._user.getUserIdFromToken(),
      idService: this.id
    };

    this._proposal.create(fd).subscribe({
      next: res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your proposal has been send",
          showConfirmButton: false,
          timer: 1500
        });
        this.getServiceProposals();
        this.form.reset();
      },
      error: err => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something is wrong",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
