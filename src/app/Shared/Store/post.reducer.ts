import { Post } from '../Models/Post';
import * as PostsActions from './post.actions';

export interface State {
    posts: Post[];
}

const initialState: State = {
    posts: []
}

export function postReducer(state = initialState, action: PostsActions.PostsActions) {
    switch (action.type) {
        case PostsActions.SET_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }
        default:
            return state;
    }
}