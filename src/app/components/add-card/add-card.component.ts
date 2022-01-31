import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12'];
const YEARS = ['22','23','24','25','26','27','28','29','30'];

export class CardModel {
  cardNumber!: string;
  expiryMonth!: string;
  expiryYear!: string;
  cvv!: string;
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
    cardNumber: ['', [Validators.required, Validators.minLength(15), this.validateCardNumber]],
    expiryMonth: ['', [Validators.required]],
    expiryYear: ['', [Validators.required]],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4), this.validateCvv.bind(this)]]
  });

  cardArray: CardModel[] = [];

  get cardInformationControls() {
    return this.cardInformation.controls;
  }

  ngOnInit(): void {
    this.cardArray = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card') as string) : [];
  }

  validateCardNumber(control: FormControl) {
    if (control.value.startsWith('37') && (control.value.length < 15 || control.value.length > 15)) {
      return {'invalidLength': true};
    } else if (!control.value.startsWith('37') && (control.value.length < 16 || control.value.length > 16)) {
      return {'invalidLength': true};
    }
    return null;
  }

  validateCvv(control: FormControl) {
    if (this.cardInformation && this.cardInformation.controls && this.cardInformation.controls['cardNumber']) {
      if (this.cardInformation.controls['cardNumber'].value.startsWith('37') && (control.value.length<4 || control.value.length>4)) {
        return {'invalidLength': true};
      } else if (!this.cardInformation.controls['cardNumber'].value.startsWith('37') && (control.value.length<3 || control.value.length>3)) {
        return {'invalidLength': true};
      }
    }
    return null;
  }

  cardNumberErrorMessage() {
    return (this.cardInformation.controls &&
      this.cardInformation.controls['cardNumber'] &&
      this.cardInformation.controls['cardNumber'].hasError('required')) ? 'Card number is required' :
      (this.cardInformation.controls['cardNumber'].hasError('minlength') && this.cardInformation.controls['cardNumber'].value.startsWith('37')) ? 'Card number should be 15 digits long' :
      (this.cardInformation.controls['cardNumber'].hasError('minlength') && !this.cardInformation.controls['cardNumber'].value.startsWith('37')) ? 'Card number should be 16 digits long' :
      this.cardInformation.controls['cardNumber'].hasError('invalidLength') ? 'Please enter valid card number' : '';
  }

  expiryMonthErrorMessage() {
    return (this.cardInformation.controls &&
      this.cardInformation.controls['expiryMonth'] &&
      this.cardInformation.controls['expiryMonth'].hasError('required')) ? 'Expiry month is required' : '';
  }

  expiryYearErrorMessage() {
    return (this.cardInformation.controls &&
      this.cardInformation.controls['expiryYear'] &&
      this.cardInformation.controls['expiryYear'].hasError('required')) ? 'Expiry year is required' : '';
  }

  cvvErrorMessage() {
    return (this.cardInformation.controls &&
      this.cardInformation.controls['cvv'] &&
      this.cardInformation.controls['cvv'].hasError('required')) ? 'CVV is required' :
      this.cardInformation.controls['cvv'].hasError('minlength') && !this.cardInformation.controls['cardNumber'].value.startsWith('37') ? 'CVV should be 3 digits long' :
      this.cardInformation.controls['cvv'].hasError('minlength') && this.cardInformation.controls['cardNumber'].value.startsWith('37') ? 'CVV should be 4 digits long' :
      this.cardInformation.controls['cvv'].hasError('invalidLength') ? 'Please enter valid CVV' : '';
  }

  submitCard(cardData: CardModel): void {
    this.cardArray.forEach((card) => {
      if (card.cardNumber === cardData.cardNumber) {
        debugger;
        this.existingCard = true;
        return;
      }
    });
    if (!this.existingCard) {
      debugger;
      this.cardArray.push(cardData);
      localStorage.setItem('card', JSON.stringify(this.cardArray));
      this.dialogRef.close(); 
    }
    if (this.existingCard) {
      this.existingCard = false;
    }
  }
}
