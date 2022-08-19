import {
  AfterViewChecked, Component, Input, OnChanges, OnInit, SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Room, User} from "../../services/chat/chat.service";
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-box-chat',
  templateUrl: './box-chat.component.html',
  styleUrls: ['./box-chat.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BoxChatComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input() user: User | undefined;
  @Input() activeRoom: Room | undefined;
  @ViewChild('boxChat') boxChat: any;
  public dataRetrieved: boolean = true;
  public firstChange: boolean = true;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeRoom']) this.dataRetrieved = true;
  }

  ngOnInit(): void {
    this.dataRetrieved = true;
  }

  onScroll($event: any) {
    console.log($event)
  }

  ngAfterViewChecked() {
    console.log(this.dataRetrieved)
    if (this.dataRetrieved || this.firstChange) {
      this.scrollToBottom();
      this.dataRetrieved = false;
    }
  }

  scrollToBottom() {
    this.boxChat.nativeElement.scrollTop = this.boxChat.nativeElement.scrollHeight;
  }

  compareDate(index: any): boolean {
    if (index === 0) return true;
    const prev: any = this.activeRoom?.messages[index - 1].createAt;
    const current: any = this.activeRoom?.messages[index].createAt;
    const prevDate = new Date(prev);
    const currentDate = new Date(current);
    return prevDate.getDate() !== currentDate.getDate() ||
      prevDate.getMonth() !== currentDate.getMonth() ||
      prevDate.getFullYear() !== currentDate.getFullYear();
  }
}
