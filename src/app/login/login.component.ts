import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChatService} from "../services/chat.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
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
  }

  ngOnInit(): void {
    this.chatService.messages?.unsubscribe();
    this.initialize().then((r) => {
      console.log(r)
    });
  }

  async initialize() {
    if (this.authenticationService.getToken()) await this.router.navigateByUrl('/home')
    this.chatService.messages.subscribe(async (message) => {
      console.log("Response: " + message)
      if (message.event === environment.event.LOGIN) {
        if (message.status === 'success') {
          const data: any = {
            user: this.loginForm.controls.username.value,
            code: message.data.RE_LOGIN_CODE
          }
          this.authenticationService.setToken(JSON.stringify(data))
          await this.router.navigate(['/home']);
        }
      }
    });
  }

  async handleSuccess(message: any) {
    const data: any = {
      user: this.loginForm.controls.username.value,
      code: message.data.RE_LOGIN_CODE
    }
    await this.authenticationService.setToken(JSON.stringify(data))
    await this.router.navigate(['/home']);
  }

  async handleError(message: any) {
    await alert('Error')
  }

  async login() {
    await this.chatService.login({
      user: this.loginForm.controls.username.value,
      pass: this.loginForm.controls.password.value
    })
  }
}
