import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingComponent
    },
    {
        path: "**",
        component: ErrorComponent
    }
];
