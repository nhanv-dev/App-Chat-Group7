import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-message',
  templateUrl: './search-message.component.html',
  styleUrls: ['./search-message.component.css', '../../home/home.component.css']
})
export class SearchMessageComponent implements OnInit {
  isOpenedSearch: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSearch() {
    this.isOpenedSearch = !this.isOpenedSearch;
  }

}
