import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userService = inject(UserService);
}
