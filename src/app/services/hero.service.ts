import { Injectable } from '@angular/core';
import { HeroInterface } from '../interface-hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private heroesUrl = 'myApi/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'appliaction/json' }),
  };
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      result ? console.log(result) : console.log('no result');
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message?: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(this.heroesUrl).pipe(
      tap(() => this.log('fetched heroes')),
      catchError(this.handleError<HeroInterface[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<HeroInterface> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<HeroInterface>(url).pipe(
      tap(() => this.log(`HeroService: fetched hero id=${id}`)),
      catchError(this.handleError<HeroInterface>(`getHero id=${id}`))
    );
  }

  updateHero(hero: HeroInterface): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: HeroInterface): Observable<HeroInterface> {
    return this.http
      .post<HeroInterface>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: HeroInterface) =>
          this.log(`added hero w/ id${newHero.id}`)
        ),
        catchError(this.handleError<HeroInterface>('addHero'))
      );
  }

  deleteHero(id: number): Observable<HeroInterface> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<HeroInterface>(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<HeroInterface>('deleteHero'))
    );
  }

  serchHeroes(term: string): Observable<HeroInterface[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<HeroInterface[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length?
        this.log(`found heroes matching "${term}"`):
        this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<HeroInterface[]>('searchHeroes',[]))
    )
  }
}
