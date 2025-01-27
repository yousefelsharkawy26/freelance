import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ServiceService } from '../../../core/services/service.service';
import { ProposalService } from '../../../core/services/proposal.service';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  userId: any;
  services: any;
  totalServices: any;
  proposals: any;

  constructor(private _user: UserService, private _service: ServiceService, private _proposal: ProposalService) {}

  ngOnInit(): void {
    this.userId = this._user.getUserIdFromToken();
    this._service.getMyServices(this.userId).subscribe({
      next: res => {
        this.services = res;
      }
    });

    this._service.getAllServices().subscribe({
      next: res => {
        this.totalServices = res;
      }
    })

    this._proposal.getProposalsByUserId(this.userId).subscribe({
      next: res => {
        this.proposals = res;
      }
    })
  }

  countAcceptedProposals(): number {
    let count = 0;
    for (let i = 0; i < this.proposals.length; i++) {
      if (this.proposals[i].status)
        count++;
    }
    return count;
  }
}
