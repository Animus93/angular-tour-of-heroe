import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { HeroInterface } from 'src/app/interface-hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<HeroInterface[]>;
  private serchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  search(term: string) {
    this.serchTerms.next(term);
  }
  ngOnInit(): void {
    console.log('HeroSearchComponent UPD')
    this.heroes$ = this.serchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.serchHeroes(term))
    );
  }
}
