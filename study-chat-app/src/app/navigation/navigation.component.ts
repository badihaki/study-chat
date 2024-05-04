import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  userServicec:UserService = inject(UserService);
}
