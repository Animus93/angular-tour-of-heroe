import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroInterface } from 'src/app/interface-hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heroe-detail',
  templateUrl: './heroe-detail.component.html',
  styleUrls: ['./heroe-detail.component.css'],
})
export class HeroeDetailComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  @Input() hero?: HeroInterface;
  onNameChange(): void {
    this.messageService.add(
      `change name of hero with ID ${this.hero?.id} to ${this.hero?.name}`
    );
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(()=> this.goBack())
    }
  }
}
