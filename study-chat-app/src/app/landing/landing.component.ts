import { Component, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HomeComponent,
    AuthComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent{
  userService = inject(UserService);
}
