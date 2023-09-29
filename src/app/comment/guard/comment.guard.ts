import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Comments } from '../comment';
import { CommentService } from '../comment.service';
import { inject } from '@angular/core';

export const commentGuard: ResolveFn<Comments> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(CommentService).getComments();
    };
