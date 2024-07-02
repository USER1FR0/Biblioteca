import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
<<<<<<< HEAD
import { Title } from '@angular/platform-browser';
=======
import { SearchBooksComponent } from './search-books/search-books.component';

>>>>>>> ddf844a844c11ebf0f661edb072eb084263dabd2

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'menu',component:MenuComponent},
<<<<<<< HEAD
=======
  {path: 'search', component: SearchBooksComponent }
>>>>>>> ddf844a844c11ebf0f661edb072eb084263dabd2
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }