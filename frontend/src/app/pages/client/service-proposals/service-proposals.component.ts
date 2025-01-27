import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProposalService } from '../../../core/services/proposal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-proposals',
  imports: [CommonModule],
  templateUrl: './service-proposals.component.html',
  styleUrl: './service-proposals.component.css'
})
export class ServiceProposalsComponent {
  serviceId: any;
  proposals: any;

  constructor(private _proposal: ProposalService, private _router: ActivatedRoute) {}

  ngOnInit(): void {
    this.serviceId = this._router.snapshot.params['id'];

    this._proposal.getProposalsByServiceId(this.serviceId).subscribe({
      next: res => {
        this.proposals = res
      }
    })
  }

  deleteProposal(id: any) {
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
        this._proposal.deleteProposal(id).subscribe({
          next: res => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            this.ngOnInit();
          }
        })
      }
    });
  }

  accept(id: any) {

    this._proposal.acceptProposal(id).subscribe({
      next: res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOnInit();
      }
    });
  }
}
