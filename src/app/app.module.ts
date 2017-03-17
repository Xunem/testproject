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
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyBaHfPKs9LAT3AlDCrmDaf4xrnZuuaD8aQ',
  authDomain: 'knowledgerepo-f22a0.firebaseapp.com',
  databaseURL: 'https://knowledgerepo-f22a0.firebaseio.com',
  storageBucket: 'knowledgerepo-f22a0.appspot.com',
  messagingSenderId: '246535302773'
};

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
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [TopicServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
