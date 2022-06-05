import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../_models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input()
  card: Card | null = null;
  
  constructor() {}

  ngOnInit(): void {}
}
