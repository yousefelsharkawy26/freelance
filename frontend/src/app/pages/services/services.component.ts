import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../core/services/service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services: any;

  constructor(private _service: ServiceService) {}

  ngOnInit(): void {
    this._service.getAllServices().subscribe({
      next: res => {
        this.services = res;
      }
    })

    window.scroll(1000,0);
  }
}
