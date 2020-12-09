import { Timestamp } from '@firebase/firestore-types';

import BookChapter from './ChapterModel';

export default class BookModel {
  ageCategory?: string;
  authorDisplayName?: string;
  authorId?: string;
  chapters?: BookChapter[];
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
  totalPages?: number;
  updatedAt?: Timestamp | Date;

  public constructor(init?: Partial<BookModel>) {
    Object.assign(this, init);
  }
}
