import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [SharedModule],
})
export class UserModule {}
