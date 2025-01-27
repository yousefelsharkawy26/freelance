import { Component } from '@angular/core';

@Component({
  selector: 'app-frq',
  imports: [],
  templateUrl: './frq.component.html',
  styleUrl: './frq.component.css'
})
export class FrqComponent {
  ngOnInit(): void {
    window.scroll(1000,0)
  }
}
