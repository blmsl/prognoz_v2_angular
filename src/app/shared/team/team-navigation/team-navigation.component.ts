import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-navigation',
  templateUrl: './team-navigation.component.html',
  styleUrls: ['./team-navigation.component.css']
})
export class TeamNavigationComponent implements OnInit {

  constructor() { }

  navigationItems: Array<any>;

  ngOnInit() {
      this.navigationItems = [
          {link: '/team/rules', title: 'Правила'},
          {link: '/team/participants', title: 'Заявки'},
          {link: '/team/predictions', title: 'Прогнози'},
          {link: '/team/rating', title: 'Рейтинг'},
          {link: '/team/results', title: 'Результати'}
      ];
  }

}
