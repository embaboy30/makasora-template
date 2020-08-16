export class Post {
    title: string;
    body: string;
    timeStamp: string;
    active: boolean;
    image: string;
}
export class Article {
  key: string;
  value: Post;
}
