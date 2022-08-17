import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat/chat.service";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    repeatPassword: new FormControl(),
  })


  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private router: Router) {
    if (authenticationService.getToken()) router.navigateByUrl('/home')
    chatService.messages.subscribe(message => {
      console.log("Response from websocket: ", message);
      const aaa = document.querySelector('#notification_username') as HTMLDivElement;

      if (message.event === 'REGISTER' && message.status === 'success') {
        router.navigateByUrl('/login');

      } else if (message.mes === 'Creating account error, Duplicate Username') {
        aaa.innerHTML = "Account already exists";
      }
    });
  }

  ngOnInit(): void {
  }

  validate() {

  }

  register() {
    const password = document.querySelector('#password') as HTMLInputElement;
    const re_password = document.querySelector("#repeat-password") as HTMLInputElement;
    const notification = document.querySelector('#notification_repassword') as HTMLDivElement;
    if (!(password.value === re_password.value)) {
      notification.style.display = 'block';
      notification.innerHTML = "Passwords entered are not duplicates";
    } else {
      notification.style.display = 'none';
    }
    this.chatService.register({
      user: this.registerForm.controls.username.value,
      pass: this.registerForm.controls.password.value,
    })
  }
}
