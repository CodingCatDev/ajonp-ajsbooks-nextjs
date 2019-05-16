export default class AjonpUser {
  aboutYou?: string;
  created?: number;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  favoriteColor?: string;
  lastActive?: number;
  phoneNumber?: string;
  photoURL?: string;
  roles?: AjonpRoles;
  token?: string;
  uid?: string;
  untappd?: {
    access_token?: string;
  };
  website?: string;
  public constructor(init?: Partial<AjonpUser>) {
    Object.assign(this, init);
  }
}
export class AjonpRoles {
  admin?: boolean;
  editor?: boolean;
  subscriber?: boolean;
}
