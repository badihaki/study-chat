import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './error/error.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingComponent
    },
    {
        path: "chat",
        component: ChatRoomComponent
    },
    {
        path: "**",
        component: ErrorComponent
    }
];
