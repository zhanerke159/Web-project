import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AccountComponent } from './account/account';
import { CategoryComponent } from './category/category';
import { OwnRecipeComponent } from './own-recipe/own-recipe';
import { PopularRecipesComponent } from './popular-recipes/popular-recipes';
import { RecipeComponent } from './recipe/recipe';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { StepsComponent } from './steps/steps';
import { PersonalComponent } from './personal/personal';
import { PasswordComponent } from './password/password';
import { LogoutComponent } from './logout/logout';
import { AuthGuard } from './authGuard/authGuard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'category', component: CategoryComponent },
    { path: 'category/:id', component: CategoryComponent },

    { path: 'recipe/:id', component: RecipeComponent, canActivate: [AuthGuard] },

    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'own-recipe', component: OwnRecipeComponent, canActivate: [AuthGuard] },
    { path: 'popular-recipe', component: PopularRecipesComponent, canActivate: [AuthGuard] },
    { path: 'personal-info', component: PersonalComponent, canActivate: [AuthGuard] },
    { path: 'change-password', component: PasswordComponent, canActivate: [AuthGuard] },

    { path: 'steps', component: StepsComponent },
    { path: 'logout', component: LogoutComponent },
];