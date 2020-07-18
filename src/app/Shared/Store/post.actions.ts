import {Action} from '@ngrx/store'
import { Post } from '../Models/Post';

export const SET_POSTS = "[Posts] Set Posts"

export class SetPosts implements Action {
    readonly type = SET_POSTS;

    constructor(public payload: Post[]){}
}

export type PostsActions = SetPosts;