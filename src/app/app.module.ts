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
import { GoogleApiModule, GoogleApiService, GoogleAuthService, NgGapiClientConfig, NG_GAPI_CONFIG, GoogleApiConfig } from 'ng-gapi';


const gapiClientConfig: NgGapiClientConfig = {
  client_id: '377400578924-8urj708svnpv6a8p88coanu8svkdag8i.apps.googleusercontent.com',
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
  ],
  scope: [
      'https://www.googleapis.com/auth/youtube.force-ssl'
  ].join(' ')
};

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
    FontAwesomeModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
