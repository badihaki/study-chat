import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './error/error.component';
import { ChatLauncherComponent } from './chat-launcher/chat-launcher.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingComponent
    },
    {
        path: "chat",
        component: ChatLauncherComponent
    },
    {
        path: "**",
        component: ErrorComponent
    }
];
