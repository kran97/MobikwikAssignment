import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCardComponent } from '../add-card/add-card.component';
import { CardModel } from '../add-card/add-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cardsLength = 0;
  cardInfo: string = '';
  cardInformation: CardModel[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.receiveCardData();
  }

  addCardDialog(): void {
    const dialogRef = this.dialog.open(AddCardComponent, {
      width: '500px',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.receiveCardData();
    });
  }

  receiveCardData() {
    this.cardInfo = localStorage.getItem('card') as string;
    if(this.cardInfo) {
      this.cardInformation = JSON.parse(this.cardInfo);
      this.cardsLength = this.cardInformation.length;
    }
  }

  removeCard(cardNumber: string) {
    this.cardInformation = this.cardInformation.filter((card) => {
      return Number(card.cardNumber) !== Number(cardNumber);
    });
    localStorage.setItem('card', JSON.stringify(this.cardInformation));
  }

}
