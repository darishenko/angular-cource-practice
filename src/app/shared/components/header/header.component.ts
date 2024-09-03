import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NgIf, RouterLink],
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated = false;
  userName?: string;
  protected readonly faSignOutAlt = faSignOutAlt;
  protected readonly faShoppingCart = faShoppingCart;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$?.subscribe((user) => {
      this.userName = user?.email;
      this.isUserAuthenticated = user != null;
    });
  }

  logout() {
    this.authService.logout();
  }
}
