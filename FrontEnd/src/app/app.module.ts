import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverComponent } from './popover/popover.component'
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';	
import {NgxPaginationModule} from 'ngx-pagination';
import { MustMatchDirective } from './directives/must-match.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HttpClientModule,HttpClient,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ErrorInterceptorInterceptor } from './interceptor/error-interceptor.interceptor';
import { TranslateModule, TranslateLoader,TranslateService  } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { DatePipe } from '@angular/common';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { File } from '@ionic-native/file/ngx';
import { SplashScreen  } from '@ionic-native/splash-screen/ngx' 

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,PopoverComponent,ProfileComponent, MustMatchDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    NgbModule,
    BrowserAnimationsModule, 
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [SplashScreen,File,BluetoothSerial,DatePipe,PDFGenerator,SMS,SocialSharing,AppVersion, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    //{ provide: HTTP_INTERCEPTORS, useClass:  ErrorInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
