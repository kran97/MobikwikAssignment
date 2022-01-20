import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CardModel } from '../add-card/add-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: CardModel = {cardNumber: '', expiryMonth: '', expiryYear: '', cvv: ''};
  @Output() cardNumberToRemove = new EventEmitter<string>();
  maskedCard: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.card && this.card.cardNumber) {
      this.maskedCard = this.card.cardNumber.substring(0, 4) + ' XXXXXXXX ' + this.card.cardNumber.slice(-4);
    }
  }

  removeCard(cardNumber: string) {
    this.cardNumberToRemove.emit(cardNumber);
  }

}
