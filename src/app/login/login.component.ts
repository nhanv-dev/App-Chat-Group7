import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChatService} from "../services/chat/chat.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ChatService, AuthenticationService],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })


  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.getToken()) this.router.navigateByUrl('/home')
  }

  ngOnInit(): void {
    this.subscribe();
  }

  subscribe() {
    this.chatService.connect();
    this.chatService.messages.subscribe(async (message) => {
      console.log("Response: ", message)
      if (message.event === environment.event.LOGIN) {
        if (message.status === 'success') {
          await this.handleSuccess(message);
        }
      }
    });
  }

  async handleSuccess(message: any) {
    const token: any = {
      user: this.loginForm.controls.username.value,
      code: message.data.RE_LOGIN_CODE
    }
    await this.authenticationService.setToken(JSON.stringify(token))
    await this.router.navigate(['/home']);
  }


  login() {
    this.chatService.login({
      user: this.loginForm.controls.username.value,
      pass: this.loginForm.controls.password.value
    })
  }
}
