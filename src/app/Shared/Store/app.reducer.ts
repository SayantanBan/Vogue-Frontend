import { ActionReducerMap } from '@ngrx/store';

import * as fromPosts from '../Store/post.reducer'

export interface AppState {
    posts: fromPosts.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    posts: fromPosts.postReducer
}