import { Component, OnInit } from '@angular/core';
import { HeroInterface } from 'src/app/interface-hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
  heroes: HeroInterface[] = [];

  getData() {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as HeroInterface).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
  delete(hero: HeroInterface) {
    this.heroService
      .deleteHero(hero.id)
      .subscribe(
        () =>
          (this.heroes = this.heroes.filter(
            (CurrentHero) => CurrentHero !== hero
          ))
      );
  }

  ngOnInit(): void {
    this.getData();
  }
}
