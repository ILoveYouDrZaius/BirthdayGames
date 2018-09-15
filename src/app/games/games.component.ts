import { Component, OnInit } from '@angular/core';
import { Game } from './game.interface';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: Game[];

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.gamesService.getAllTodayGames().subscribe(
      (games) => {
        this.games = games;
      }
    );
  }

}
