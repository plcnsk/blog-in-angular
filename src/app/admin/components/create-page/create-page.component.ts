import { Component, OnInit } from '@angular/core';
import { VALIDATION_MESSAGES } from '../../../shared/constants/form.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePageKey } from './enums/create-page.enum';
import { Post } from './interfaces/create-page.interface';
import { ValidatorKey } from '../../../shared/enums/validators.enum';
import { MODULES } from './constans/create-page.constant';

@Component({
  selector: 'app-create-page',
  templateUrl: 'create-page.component.html',
  styleUrls: ['create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  readonly errorMessages = VALIDATION_MESSAGES;
  readonly validatorKey = ValidatorKey;
  readonly createPageKey = CreatePageKey;
  readonly modules = MODULES;

  form!: FormGroup;
  isLoading = false;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.disabled) {
      return;
    }

    this.isLoading = true;

    const post: Post = {
      ...this.form.getRawValue(),
      date: new Date(),
    };
  }

  isControlValid(controlKey: CreatePageKey): boolean {
    const control = this.form.controls[controlKey];
    return control.touched && control.invalid;
  }

  isErrorExist(controlKey: CreatePageKey, validatorKey: ValidatorKey) {
    return this.form.controls[controlKey].errors?.[validatorKey];
  }

  private initForm(): void {
    this.form = new FormGroup({
      [CreatePageKey.Title]: new FormControl(null, [Validators.required]),
      [CreatePageKey.Text]: new FormControl(null, [Validators.required]),
      [CreatePageKey.Author]: new FormControl(null, [Validators.required]),
    });
  }
}
