import { Timestamp } from '@firebase/firestore-types';

export default class Book {
  ageCategory?: string;
  authorDisplayName?: string;
  authorId?: string;
  createdAt?: Timestamp | Date;
  description?: string;
  cover?: string;
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
  slug?: string;
  title?: string;
  updatedAt?: Timestamp | Date;

  public constructor(init?: Partial<Book>) {
    Object.assign(this, init);
  }
}
