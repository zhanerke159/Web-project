import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';  
import { CategoryComponent } from './category/category';
import { AccountComponent } from './account/account';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { OwnRecipeComponent } from './own-recipe/own-recipe';
import { StepsComponent } from './steps/steps';
import { PopularRecipesComponent } from './popular-recipes/popular-recipes';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'own-recipe', component: OwnRecipeComponent},
  { path: 'steps', component: StepsComponent},
  { path: 'popular-recipes', component: PopularRecipesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }