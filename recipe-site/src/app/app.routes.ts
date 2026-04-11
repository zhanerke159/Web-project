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

export const routes: Routes = [{
    path: '', component: HomeComponent},
    {path: 'account', component: AccountComponent},
    {path: 'category', component: CategoryComponent},
    { path: 'category/:name', component: CategoryComponent },
    {path: 'own-recipe', component: OwnRecipeComponent},
    {path: 'popular-recipe', component: PopularRecipesComponent},
    {path: 'recipe/:name', component: RecipeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
<<<<<<< HEAD
    {path: 'steps', component: StepsComponent}
    
=======
    {path: 'steps', component: StepsComponent},
    { path: 'personal-info', component: PersonalComponent}
>>>>>>> personal-page
];
