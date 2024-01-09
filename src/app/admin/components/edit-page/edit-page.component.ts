import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../../shared/services/posts.service';
import { switchMap } from 'rxjs';
import { Post } from '../create-page/interfaces/create-page.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePageKey } from '../create-page/enums/create-page.enum';
import { FormExtension } from '../../../shared/utils/form-extension.util';
import { MODULES } from '../create-page/constans/create-page.constant';
import { ValidatorKey } from '../../../shared/enums/validators.enum';
import { VALIDATION_MESSAGES } from '../../../shared/constants/form.constant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertServices } from '../alert/services/alert.services';

@Component({
  selector: 'app-edit-page',
  templateUrl: 'edit-page.component.html',
  styleUrls: ['edit-page.component.scss'],
})
export class EditPageComponent extends FormExtension<CreatePageKey> implements OnInit {
  updatedPost!: Post;
  isSubmitted = false;

  readonly editPageKey = CreatePageKey;
  readonly modules = MODULES;

  constructor(
    @Inject(DestroyRef) private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertServices,
  ) {
    super();
  }

  ngOnInit() {
    this.setErrorState();
    this.initForm();
  }

  private initForm() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById$(params['id']);
        }),
      )
      .subscribe((post: Post) => {
        this.updatedPost = post;

        this.form = new FormGroup<any>({
          [CreatePageKey.Title]: new FormControl(post.title, Validators.required),
          [CreatePageKey.Text]: new FormControl(post.text, Validators.required),
          [CreatePageKey.Author]: new FormControl(post.author, Validators.required),
        });
      });
  }

  private setErrorState(): void {
    this.errorState = {
      [CreatePageKey.Title]: {
        [ValidatorKey.Required]: VALIDATION_MESSAGES[ValidatorKey.Required],
      },
      [CreatePageKey.Text]: {
        [ValidatorKey.Required]: VALIDATION_MESSAGES[ValidatorKey.Required],
      },
      [CreatePageKey.Author]: {
        [ValidatorKey.Required]: VALIDATION_MESSAGES[ValidatorKey.Required],
      },
    };
  }

  onSubmit() {
    if (this.form?.invalid) {
      return;
    }

    this.isSubmitted = true;

    this.postsService
      .updatePost$({
        ...this.updatedPost,
        ...this.form?.getRawValue(),
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isSubmitted = false;
        this.alert.show('Post has been updated', 'success');
      });
  }
}
