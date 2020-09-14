import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild, ElementRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SearchPipe } from './pipe/search.pipe';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,SearchPipe
  ],

  imports: [
    BrowserModule,Ng2SearchPipeModule,FormsModule,
    AppRoutingModule,HttpClientModule, ReactiveFormsModule
  ],
  
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
