import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { HomeComponent } from './end-user/component/home/home.component';
import { ProfileComponent } from './end-user/component/profile/profile.component';
import { ReportComponent } from './end-user/component/report/report.component';
import { UsersComponent } from './admin/component/users/users.component';
import { MessagesComponent } from './admin/component/messages/messages.component';
import { LoginComponent } from './auth/component/login/login.component';
import { SignUpComponent } from './auth/component/sign-up/sign-up.component';
import { CheckFileComponent } from './end-user/component/check-file/check-file.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/core/inerceeptor/http-config.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoaderService } from './core/services/loader.service';
import {MatDialogModule} from '@angular/material/dialog';
import { AddCreditComponent } from './shared/component/add-credit/add-credit.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HistoryReportComponent } from './shared/component/history-report/history-report.component';
import { PaymentReportComponent } from './shared/component/payment-report/payment-report.component';
import { ModalComponent } from './shared/component/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ReplyMessageComponent } from './shared/component/reply-message/reply-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    ReportComponent,
    UsersComponent,
    MessagesComponent,
    LoginComponent,
    SignUpComponent,
    CheckFileComponent,
    AddCreditComponent,
    HistoryReportComponent,
    PaymentReportComponent,
    ModalComponent,
    ReplyMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(LoaderService.ngxUiLoaderConfig),
    MatDialogModule,
    MatTabsModule,
    FormsModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
