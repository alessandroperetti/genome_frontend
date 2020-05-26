import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UploadModule } from './upload/upload.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadService } from './upload/upload.service';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload/upload.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomRouteReuseStrategy } from './router-strategy';
import { RouteReuseStrategy } from '@angular/router';


const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    UploadModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } 
    )
  ],
  providers: [UploadService,
    {provide: RouteReuseStrategy,
    useClass: CustomRouteReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
