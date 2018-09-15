import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './game.interface';

const API_IGDB = 'https://api-endpoint.igdb.com/games';

// https://api-endpoint.igdb.com/games/?fields=name,first_release_date&filter[release_dates.date][eq]=2013-09-17
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  allDates: String;

  constructor(
    private http: HttpClient
  ) {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`;
    const day = `${today.getDate()}`;
    this.allDates = '';
    for (let i = 1970; i < year; i++) {
      this.allDates += `${i}-${month.padStart(2, '0')}-${day.padStart(2, '0')},`;
    }
    this.allDates = this.allDates.substring(0, this.allDates.length - 1);
  }

  getAllTodayGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${API_IGDB}/?fields=name,rating,popularity,cover&filter[first_release_date][any]=${this.allDates}&limit=50`);
  }
}
