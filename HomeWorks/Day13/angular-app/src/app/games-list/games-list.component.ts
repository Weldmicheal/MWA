import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {


// game1:Game = {
//   'game title': "Mr.jack",
//   price: 20.0,
//   year: 2006

// }
// game2:Game = {
//   'game title': "Mr.jack",
//   price: 20.0,
//   year: 2006

// }

// games: Game[]= [this.game1, this.game2]
games: Game[] = []

  constructor(private gamesDataService:GamesDataService) { }

  ngOnInit(): void {
    this.gamesDataService.getGames().then(response => this.games = response)
  }

}

export class Game {
  _id !: string
  title !: string 
  price !: number
  year !: number 
}

//module.exports= Game;
