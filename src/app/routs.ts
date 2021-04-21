import { MemberHomeComponent } from './member-home/member-home.component';
import { LoginComponent } from './user/login/login.component';
import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    {
        path: 'userprofile', component: MemberHomeComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];