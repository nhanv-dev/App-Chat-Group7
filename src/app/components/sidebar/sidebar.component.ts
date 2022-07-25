import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {User} from "../../home/home.component";
import {ChatService} from "../../services/chat.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', '../../home/home.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() logout = new EventEmitter();
  @Input() callback: Function | undefined;

  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private router:Router) {
  }

  ngOnInit(): void {
  }

  handleLogout(): void {
    this.authenticationService.removeToken();
    this.chatService.logout();
    this.router.navigateByUrl('/login');
  }
  // suggestionWasClicked(): void {
  //   this.callback();
  // }
}
