import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Room, User} from "../../services/chat/chat.service";

@Component({
  selector: 'app-box-chat',
  templateUrl: './box-chat.component.html',
  styleUrls: ['./box-chat.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BoxChatComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() activeRoom: Room | undefined;
  public nativeElement: HTMLElement;

  constructor(element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit(): void {
  }

}
