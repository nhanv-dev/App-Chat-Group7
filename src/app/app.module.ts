import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WebsocketService} from "./services/websocket/websocket.service";
import {ChatService} from "./services/chat/chat.service";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {BoxChatComponent} from './components/box-chat/box-chat.component';
import {SearchChatComponent} from './components/search-chat/search-chat.component';
import {SearchMessageComponent} from './components/search-message/search-message.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {GroupChatComponent} from './components/group-chat/group-chat.component';
import {ChatBarComponent} from './components/chat-bar/chat-bar.component';
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { ForwardComponent } from './components/forward/forward.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BoxChatComponent,
    SearchChatComponent,
    SearchMessageComponent,
    SidebarComponent,
    GroupChatComponent,
    ChatBarComponent,
    NewContactComponent,
    ForwardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule
  ],
  providers: [WebsocketService, ChatService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
