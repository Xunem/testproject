import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { CurrentTopicsComponent } from './current-topics/current-topics.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import {TopicServiceService} from "./topic-service.service";

@NgModule({
  declarations: [
    AppComponent,
    CurrentTopicsComponent,
    TopicDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [TopicServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
