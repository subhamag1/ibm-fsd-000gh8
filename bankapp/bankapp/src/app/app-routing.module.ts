import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'banking',component:BankingComponent},
  {path:'login',component:LoginComponent},
  {path:'deposit',component:DepositComponent},
  {path:'withdrawal',component:WithdrawalComponent},
  {path:'transfer',component:TransferComponent},
  {path:'Home',component:HomeComponent},
  {path:'passbook',component:PassbookComponent},
  {path:'testing',component:TestingComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',component:ErrorcomponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent =[RegisterComponent,ErrorcomponentComponent,TestingComponent,BankingComponent,LoginComponent,DepositComponent, WithdrawalComponent, TransferComponent,PassbookComponent]
