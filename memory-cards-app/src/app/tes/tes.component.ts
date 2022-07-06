import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService, CategoryService } from '../shared';

@Component({
  selector: 'app-tes',
  templateUrl: './tes.component.html',
  styleUrls: ['./tes.component.scss'],
})
export class TesComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  constructor(private cardService: CardService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    //   this.sub = this.cardService
    //     .getCards()
    //     .subscribe({ next: (data) => console.log(data) });
  }
}
