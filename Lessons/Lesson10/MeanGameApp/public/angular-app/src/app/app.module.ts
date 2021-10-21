import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { JwtHelperService , JWT_OPTIONS} from '@auth0/angular-jwt';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameOneComponent } from './game-one/game-one.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterReactiveComponent } from './register-reactive/register-reactive.component';
import { RegisterTemplateComponent } from './register-template/register-template.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GamesListComponent,
    GameOneComponent,
    FooterComponent,
    NavigationComponent,
    RegisterReactiveComponent,
    RegisterTemplateComponent,
    ParentComponent,
    ChildComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: WelcomeComponent
      },
      {
        path: "games",
        component: GamesListComponent
      },
      {
        path: "register",
        //component: RegisterTemplateComponent
        component: RegisterReactiveComponent
      },
      {
        path: "parent",
        //component: RegisterTemplateComponent
        component: ParentComponent
      },
      {
        path: "games/:gameId",
        component: GameOneComponent
      }
      , {
        path: "**",
        component: ErrorPageComponent

      }
    ])
  ],
  providers: [{provide:JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
  //bootstrap: [WelcomeComponent] // new one
  bootstrap: [AppComponent] // old one
})
export class AppModule { }
