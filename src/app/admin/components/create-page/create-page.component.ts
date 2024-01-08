import { Component, OnInit } from '@angular/core';
import { VALIDATION_MESSAGES } from '../../../shared/constants/form.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePageKey } from './enums/create-page.enum';
import { Post, PostPayLoad } from './interfaces/create-page.interface';
import { ValidatorKey } from '../../../shared/enums/validators.enum';
import {
  AUTHOR_MIN_LENGTH,
  MODULES,
  TEXT_MIN_LENGTH,
  TITLE_MIN_LENGTH,
} from './constans/create-page.constant';
import { FormExtension } from '../../../shared/utils/form-extension.util';
import { PostsService } from '../../../shared/services/posts.service';
import { AlertServices } from '../alert/services/alert.services';

@Component({
  selector: 'app-create-page',
  templateUrl: 'create-page.component.html',
  styleUrls: ['create-page.component.scss'],
})
export class CreatePageComponent extends FormExtension<CreatePageKey> implements OnInit {
  readonly createPageKey = CreatePageKey;
  readonly modules = MODULES;

  isLoading = false;

  constructor(
    private postsService: PostsService,
    private alert: AlertServices,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.setErrorState();
  }

  onSubmit(): void {
    if (!this.isSubmittable) {
      return;
    }

    this.isLoading = true;

    const post: PostPayLoad = {
      ...this.form!.getRawValue(),
      date: new Date(),
    };

    this.postsService.create$(post).subscribe(() => {
      this.form?.reset();
      this.alert.success('post has been created');
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      [CreatePageKey.Title]: new FormControl(null, [
        Validators.required,
        Validators.minLength(TITLE_MIN_LENGTH),
      ]),
      [CreatePageKey.Text]: new FormControl(null, [
        Validators.required,
        Validators.minLength(TEXT_MIN_LENGTH),
      ]),
      [CreatePageKey.Author]: new FormControl(null, [
        Validators.required,
        Validators.minLength(AUTHOR_MIN_LENGTH),
      ]),
    });
  }

  private setErrorState(): void {
    this.errorState = {
      [CreatePageKey.Title]: {
        [ValidatorKey.Required]: VALIDATION_MESSAGES[ValidatorKey.Required],
        [ValidatorKey.MinLength]: VALIDATION_MESSAGES[ValidatorKey.MinLength].replace(
          /{minlength}/,
          String(TITLE_MIN_LENGTH),
        ),
      },
      [CreatePageKey.Text]: {
        [ValidatorKey.Required]: VALIDATION_MESSAGES[ValidatorKey.Required],
        [ValidatorKey.MinLength]: VALIDATION_MESSAGES[ValidatorKey.MinLength].replace(
          /{minlength}/,
          String(TEXT_MIN_LENGTH),
        ),
      },
      [CreatePageKey.Author]: {
        [ValidatorKey.Required]: VALIDATION_MESSAGES[ValidatorKey.Required],
        [ValidatorKey.MinLength]: VALIDATION_MESSAGES[ValidatorKey.MinLength].replace(
          /{minlength}/,
          String(AUTHOR_MIN_LENGTH),
        ),
      },
    };
  }
}
