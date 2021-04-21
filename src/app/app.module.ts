import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/services/user.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MemberHomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
 
    BrowserAnimationsModule,
   // NgZorroAntdModule,
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
