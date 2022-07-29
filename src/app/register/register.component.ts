import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {AuthenticationService} from "../services/authentication.service";
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
      if (message.event === 'REGISTER' && message.status === 'success')
        router.navigateByUrl('/login');
    });
  }

  ngOnInit(): void {
  }

  validate() {

  }

  register() {
    this.chatService.register({
      user: this.registerForm.controls.username.value,
      pass: this.registerForm.controls.password.value
    })
  }
}
