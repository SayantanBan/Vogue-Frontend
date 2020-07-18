import { Category } from './Category';

interface IPost {
    id?: number,
    postName?: string,
    postDate?: Date,
    lastEdit?: Date,
    postContent?: string,
    status?: boolean,
    category?: Category,
    allowComment?: boolean
}

export class Post implements IPost {
    id?: number;
    postName?: string;
    postDate?: Date;
    lastEdit?: Date;
    postContent?: string;
    status?: boolean;
    category?: Category;
    allowComment?: boolean
}