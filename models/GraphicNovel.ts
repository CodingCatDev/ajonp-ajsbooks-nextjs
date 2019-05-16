import { Timestamp } from '@firebase/firestore-types';

export default class GraphicNovel {
  ageCategory?: string;
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

  public constructor(init?: Partial<GraphicNovel>) {
    Object.assign(this, init);
  }
}
