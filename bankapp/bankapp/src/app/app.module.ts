import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BankingComponent } from './banking/banking.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { TransferComponent } from './transfer/transfer.component';
import { HomeComponent } from './home/home.component';
import { PassbookComponent } from './passbook/passbook.component';
import { TestingComponent } from './testing/testing.component';
import { RegisterComponent } from './register/register.component';
import { ErrorcomponentComponent } from './errorcomponent/errorcomponent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BankingComponent,
    DepositComponent,
    WithdrawalComponent,
    TransferComponent,
    HomeComponent,
    PassbookComponent,
    TestingComponent,
    RegisterComponent,
    ErrorcomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
