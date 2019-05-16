import { Timestamp } from '@firebase/firestore-types';

export default class Book {
  ageCategory?: string;
  authorDisplayName?: string;
  authorId?: string;
  description?: string;
  fiction?: boolean;
  genre?: string;
  hasAudio?: boolean;
  hasPhotos?: boolean;
  hasVideos?: boolean;
  id?: string;
  image?: string;
  publishDate?: Timestamp | Date;
  rating?: number;
  status?: string;
  title?: string;
  updatedAt?: Timestamp | Date;

  public constructor(init?: Partial<Book>) {
    Object.assign(this, init);
  }
}
