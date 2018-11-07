//Import from angular components
import { Component, OnInit } from '@angular/core';

// Imports from my application classes
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  herolist : Hero[];

  constructor(private heroService : HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() : void {
    this.heroService.getHeroes()
    .subscribe((heroes => this.herolist = heroes));
  };

  add(name : string) {
    name = name .trim();
    if(!name) return;

    this.heroService.addHero( {name} as Hero)
    .subscribe(hero => {
      this.herolist.push(hero)
    });
  }

  delete(hero : Hero) : void {
    this.herolist = this.herolist.filter(heroInList => heroInList != hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
