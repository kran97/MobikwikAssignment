import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCardComponent } from '../add-card/add-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cardsLength = localStorage.length;
  cardInfo = new Array();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.receiveCardData();
  }

  addCardDialog(): void {
    const dialogRef = this.dialog.open(AddCardComponent, {
      width: '500px',
      data: {
        
      }
    })
  }

  receiveCardData() {
    for (let i = 0; i<this.cardsLength; i++) {
      this.cardInfo.push(localStorage.getItem('card'+i));
    }
  }

}
