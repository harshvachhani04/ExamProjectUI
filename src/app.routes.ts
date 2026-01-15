import { AppLayout } from '@/layout/component/app.layout';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Documentation } from '@/pages/documentation/documentation';
import { Landing } from '@/pages/landing/landing';
import { Notfound } from '@/pages/notfound/notfound';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
        ]
    },
    { 
        path: 'auth/login', 
        loadComponent: () => import('./app/pages/auth/login/login').then(m => m.Login) 
    },
    { 
        path: 'auth/forgot-password', 
        loadComponent: () => import('./app/pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword) 
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' } // Only one wildcard at the bottom
];