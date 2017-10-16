import { Hero } from './Hero';
import { HeroService } from './hero.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <h3>Top Heroes</h3>
    <div class="grid grid-pad">
      <a *ngFor="let hero of heroes" [routerLink]="['/detail', hero.id]"  class="col-1-4">
        <div class="module hero">
          <h4>{{hero.name}}</h4>
        </div>
      </a>
    </div>
    <app-hero-search></app-hero-search>
  `,
  styles: [`a {text-decoration: none}`]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService
      .getHeroes()
      .then(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}
