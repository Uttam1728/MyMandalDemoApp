import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MemberHomeComponent } from './user/member-home/member-home.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/services/user.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
// import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ResponsiveModule } from 'ngx-responsive';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { MandalNgZorroAntdModule } from './ng-zorrow-antd.module';

registerLocaleData(en);


const config = {
  breakPoints: {
    xs: { max: 600 },
    sm: { min: 601, max: 959 },
    md: { min: 0, max: 1000 },
    lg: { min: 1000, max: 4000 },
    xl: { min: 6000 }
  },
  debounceTime: 100
};
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
    MandalNgZorroAntdModule,
    BrowserAnimationsModule,
    ResponsiveModule.forRoot(config),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService,{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
