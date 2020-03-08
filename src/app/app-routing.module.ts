import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { ChannelDetailsComponent } from './channel-details';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: ChannelDetailsComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
