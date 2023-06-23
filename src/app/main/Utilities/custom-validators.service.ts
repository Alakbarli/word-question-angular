import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }
  public noWhitespaceValidator(control: FormControl): ValidationErrors | null {
    return (control.value || '').trim().length? null : { 'whitespace': true };       
}
}
