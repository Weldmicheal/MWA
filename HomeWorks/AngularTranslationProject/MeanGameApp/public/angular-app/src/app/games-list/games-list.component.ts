import { Component, OnInit, ViewChild } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  @ViewChild('gameForm')
  gameForm!: NgForm;
  game!: Game

  offset: number = 0
  games: Game[] = []

  constructor(private gamesDataService: GamesDataService) { }

  ngOnInit(): void {
    this.gamesDataService.getGames(this.offset).then((response) => {
      this.games = response
      const gameObj = JSON.parse(JSON.stringify(this.games))
      if (gameObj.length < 5) {
        this.offset = 0
      } else {
        this.offset = 5
      }
    })
  }

  onAddGame() {
    console.log(this.gameForm.value);

    this.gamesDataService.addGame(this.gameForm.value).then(response => this.game = response)

  }
  onPrevious() {
    this.offset -= 5
    if (this.offset <= 0) {
      this.offset = 0
    }
    this.gamesDataService.getGames(this.offset).then((response) => {
      this.games = response

    })

  }
  onNext() {
 
    this.gamesDataService.getGames(this.offset).then(response => {
      this.games = response
      const gameObj = JSON.parse(JSON.stringify(this.games))
      if (gameObj.length < 5) {
        this.offset = 0
      } else {
        this.offset += 5
      }
    })

  }

  delete(gameId: string) {
    this.gamesDataService.deleteGame(gameId).then(response => {
      
      
        //this.status = true
        // $window.location.href = "/games"
        if (this.offset - 5 >= 0) {
          this.offset -= 5
        }
        this.gamesDataService.getGames(this.offset).then(response => {
          this.games = response
          const gameObj = JSON.parse(JSON.stringify(this.games))
          if (gameObj.length < 5) {
            this.offset = 0
          } else {
            this.offset += 5
          }
        })
      
    })

  }

  onClear() {
    this.gameForm.resetForm()
  }

}

export class Game {
  _id !: string
  title !: string
  price !: number
  minPlayers !: number
  maxPlayers !: number
  minAge !: number
  

}

//module.exports= Game;
