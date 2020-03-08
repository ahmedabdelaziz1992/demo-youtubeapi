import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
// Directive
import { NgbdSortableHeaderDirective } from './_helpers/sortableHeader.directive';
// Interceptors
import { LoaderInterceptor, TimePipe } from './_helpers';
import { ChannelDetailsComponent } from './channel-details/channel-details.component';
// Pipes
import { SafePipe } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NgbdSortableHeaderDirective,
    ChannelDetailsComponent,
    SafePipe,
    TimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
