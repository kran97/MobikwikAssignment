import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12'];
const YEARS = ['22','23','24','25','26','27','28','29','30'];

export class CardModel {
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
}

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  constructor(private _form: FormBuilder, public dialogRef: MatDialogRef<AddCardComponent>) { }

  existingCard = false;
  months = MONTHS;
  years = YEARS;
    
  cardInformation = this._form.group({
    cardNumber: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(16)]],
    expiryMonth: ['', [Validators.required]],
    expiryYear: ['', [Validators.required]],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]]
  });

  cardArray: CardModel[] = [];

  ngOnInit(): void {
    this.cardArray = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card') as string) : [];
    console.log("AddCard.ngOnInit ", this.cardArray);
  }

  submitCard(cardData: CardModel) {
    console.log("AddCard.SubmitCard ", cardData);
    this.cardArray.forEach((card) => {
      if (card.cardNumber === cardData.cardNumber) {
        this.existingCard = true;
        return;
      }
    });
    if (!this.existingCard) {
      this.cardArray.push(cardData);
      localStorage.setItem('card', JSON.stringify(this.cardArray));
      this.dialogRef.close(); 
    }
  }

}
