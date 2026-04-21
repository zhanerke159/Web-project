import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
    const router = inject(Router);
    const token = localStorage.getItem('user_token');

    if (token) {
        return true;
    } return router.createUrlTree(['/register'], {
        queryParams: { returnUrl: router.url }
    });


};