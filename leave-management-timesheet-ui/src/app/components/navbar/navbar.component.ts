import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  closeMenu() {
    const checkbox = document.getElementById('navbar-toggle') as HTMLInputElement;
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  }
}
