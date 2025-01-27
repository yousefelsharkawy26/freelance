import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProposalService } from '../../../core/services/proposal.service';
import { UserService } from '../../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proposals',
  imports: [CommonModule],
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.css'
})
export class ProposalsComponent {
  userId: any;
  proposals: any;

  constructor(private _proposal: ProposalService, private _user: UserService) {}

  ngOnInit(): void {
    this.userId = this._user.getUserIdFromToken();
    this._proposal.getProposalsByUserId(this.userId).subscribe({
      next: res => {
        this.proposals = res;
      }
    });
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
                title: "Deleted !",
                showConfirmButton: false,
                timer: 1500
              });
              this.ngOnInit();
            }
      })}
    })
  }

}
