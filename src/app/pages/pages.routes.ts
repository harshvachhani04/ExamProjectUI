import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    {
        path: 'test',
        loadComponent: () =>
            import('./test-page/test-page')
                .then(m => m.TestPage)
    },
    {
        path: 'user',
        loadComponent: () =>
            import('./user-list/user-list')
                .then(m => m.UserListComponent)
    },
    { path: '**', redirectTo: '/notfound' },
] as Routes;
