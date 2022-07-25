import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-chat',
  templateUrl: './search-chat.component.html',
  styleUrls: ['./search-chat.component.css', '../../home/home.component.css']
})
export class SearchChatComponent implements OnInit {
  isOpenedSearch: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSearch() {
    this.isOpenedSearch = !this.isOpenedSearch;
  }

}
