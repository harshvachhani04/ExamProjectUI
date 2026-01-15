import { authGuard } from '@/core/guards/auth.guard';
import { AppLayout } from '@/layout/component/app.layout';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Documentation } from '@/pages/documentation/documentation';
import { Landing } from '@/pages/landing/landing';
import { Notfound } from '@/pages/notfound/notfound';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    // 1. Root redirect (Only happens if the URL is exactly http://localhost:4200/)
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    // 2. Auth routes (No Sidebar/Layout)
    { 
        path: 'auth/login', 
        loadComponent: () => import('./app/pages/auth/login/login').then(m => m.Login) 
    },
    { 
        path: 'auth/forgot-password', 
        loadComponent: () => import('./app/pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword) 
    },

    // 3. Authenticated routes (Wrapped in AppLayout)
    {
        path: '', 
        component: AppLayout,
        canActivate: [authGuard], // <--- ADD YOUR GUARD HERE
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'documentation', component: Documentation },
            { 
                path: 'pages', 
                loadChildren: () => import('./app/pages/pages.routes') 
            },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
        ]
    },

    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];