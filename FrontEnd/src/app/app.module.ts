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
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';	
import {NgxPaginationModule} from 'ngx-pagination';
import { MustMatchDirective } from './directives/must-match.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

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
    HttpClientModule],
  providers: [ PDFGenerator,SocialSharing,AndroidPermissions,FirebaseX,BluetoothSerial,SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
