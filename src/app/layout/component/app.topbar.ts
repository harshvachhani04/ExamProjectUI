import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';

import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '@/pages/service/auth-service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MenuModule,
        StyleClassModule,
        AppConfigurator
    ],
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-logo-container">
                <button
                    class="layout-menu-button layout-topbar-action"
                    (click)="layoutService.onMenuToggle()"
                >
                    <i class="pi pi-bars"></i>
                </button>

                <a class="layout-topbar-logo" routerLink="/">
                    <span>SAKAI</span>
                </a>
            </div>

            <div class="layout-topbar-actions">

                <!-- Theme & Config -->
                <div class="layout-config-menu">
                    <button
                        type="button"
                        class="layout-topbar-action"
                        (click)="toggleDarkMode()"
                    >
                        <i
                            [ngClass]="{
                                'pi': true,
                                'pi-moon': layoutService.isDarkTheme(),
                                'pi-sun': !layoutService.isDarkTheme()
                            }"
                        ></i>
                    </button>

                    <div class="relative">
                        <button
                            class="layout-topbar-action layout-topbar-action-highlight"
                            pStyleClass="@next"
                            enterFromClass="hidden"
                            enterActiveClass="animate-scalein"
                            leaveToClass="hidden"
                            leaveActiveClass="animate-fadeout"
                            [hideOnOutsideClick]="true"
                        >
                            <i class="pi pi-palette"></i>
                        </button>

                        <app-configurator />
                    </div>
                </div>

                <!-- Mobile Menu -->
                <button
                    class="layout-topbar-menu-button layout-topbar-action"
                    pStyleClass="@next"
                    enterFromClass="hidden"
                    enterActiveClass="animate-scalein"
                    leaveToClass="hidden"
                    leaveActiveClass="animate-fadeout"
                    [hideOnOutsideClick]="true"
                >
                    <i class="pi pi-ellipsis-v"></i>
                </button>

                <!-- Topbar Menu -->
                <div class="layout-topbar-menu hidden lg:block">
                    <div class="layout-topbar-menu-content">

                        <button type="button" class="layout-topbar-action">
                            <i class="pi pi-calendar"></i>
                            <span>Calendar</span>
                        </button>

                        <button type="button" class="layout-topbar-action">
                            <i class="pi pi-inbox"></i>
                            <span>Messages</span>
                        </button>

                        <!-- Profile Button -->
                        <button
                            type="button"
                            class="layout-topbar-action"
                            (click)="profileMenu.toggle($event)"
                        >
                            <i class="pi pi-user"></i>
                            <span>Profile</span>
                        </button>

                        <!-- Profile Dropdown -->
                        <p-menu
                            #profileMenu
                            [popup]="true"
                            [model]="profileItems"
                        ></p-menu>

                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppTopbar {

    profileItems: MenuItem[];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {
        this.profileItems = [
            {
                label: 'My Profile',
                icon: 'pi pi-user',
                command: () => this.openProfile()
            },
            {
                separator: true
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
            }
        ];
    }

    toggleDarkMode(): void {
        this.layoutService.layoutConfig.update(state => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }

    openProfile(): void {
        // Optional: navigate to profile page
        // this.router.navigate(['/profile']);
    }

    logout(): void {
        this.authService.logout();
    }
}