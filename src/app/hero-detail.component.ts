import { Hero } from './Hero';
import { selector } from 'rxjs/operator/multicast';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-detail',
  template: `
    <div *ngIf="hero">
        <h2>{{hero.name}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
        </div>
        <button (click)="goBack()">Back</button>
        <button (click)="save()">Save</button>
    </div>
    `,
    styles: [`
      label {
        display: inline-block;
        width: 3em;
        margin: .5em 0;
        color: #607D8B;
        font-weight: bold;
      }
      input {
        height: 2em;
        font-size: 1em;
        padding-left: .4em;
      }
      button {
        margin-top: 20px;
        font-family: Arial;
        background-color: #eee;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer; cursor: hand;
      }
      button:hover {
        background-color: #cfd8dc;
      }
      button:disabled {
        background-color: #eee;
        color: #ccc;
        cursor: auto;
      }
    `]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    this.heroService.update(this.hero)
    .then(() => this.goBack());
  }
}
