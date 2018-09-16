import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './game.interface';

const API_IGDB = 'https://api-endpoint.igdb.com/games/';

// https://api-endpoint.igdb.com/games/?fields=name,first_release_date&filter[release_dates.date][eq]=2013-09-17
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  allDates: string;

  constructor(
    private http: HttpClient
  ) {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`;
    const day = `${today.getDate()}`;
    this.allDates = '';
    for (let i = 1951; i < year; i++) {
      this.allDates += `${i}-${month.padStart(2, '0')}-${day.padStart(2, '0')},`;
    }
    this.allDates = this.allDates.substring(0, this.allDates.length - 1);
  }

  getAllTodayGames(): Observable<Game[]> {
    let params = new HttpParams();
    params = params.append('fields', 'name,rating,popularity,cover');
    params = params.append('filter[first_release_date][any]', this.allDates);
    params = params.append('limit', '50');
    params = params.append('order', 'first_release_date:asc');
    params = params.append('order', 'popularity:desc');

    return this.http.get<Game[]>(API_IGDB, {params: params});
  }
}
