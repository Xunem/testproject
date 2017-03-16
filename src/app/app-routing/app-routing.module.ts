import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrentTopicsComponent} from "../current-topics/current-topics.component";
import {TopicDetailComponent} from "../topic-detail/topic-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start',  component: CurrentTopicsComponent },
  { path: 'topic/:id', component: TopicDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
