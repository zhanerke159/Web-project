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

export const routes: Routes = [{
    path: '', component: HomeComponent},
    {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
    {path: 'category', component: CategoryComponent},
    { path: 'category/:id', component: CategoryComponent },
    {path: 'own-recipe', component: OwnRecipeComponent},
    {path: 'popular-recipe', component: PopularRecipesComponent, canActivate: [AuthGuard]},
    {path: 'recipe/:id', component: RecipeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'steps', component: StepsComponent},
    { path: 'personal-info', component: PersonalComponent},
    { path: 'change-password', component: PasswordComponent},
    { path: 'home', component: HomeComponent},
    { path: 'logout', component: LogoutComponent},
];
