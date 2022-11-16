export interface Group {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  members?: (MembersEntity)[] | null;
  simplify_by_default: boolean;
  original_debts?: (OriginalDebtsEntityOrSimplifiedDebtsEntity | null)[] | null;
  simplified_debts?: (OriginalDebtsEntityOrSimplifiedDebtsEntity1 | null)[] | null;
  avatar: Avatar;
  tall_avatar: TallAvatar;
  custom_avatar: boolean;
  cover_photo: CoverPhoto;
  whiteboard?: null;
  group_type?: string | null;
  invite_link?: string | null;
  group_reminders?: null;
}
export interface MembersEntity {
  id: number;
  first_name: string;
  last_name?: string | null;
  picture: Picture;
  custom_picture: boolean;
  email: string;
  registration_status: string;
  balance?: (BalanceEntity | null)[] | null;
}
export interface Picture {
  small: string;
  medium: string;
  large: string;
}
export interface BalanceEntity {
  amount: string;
  currency_code: string;
}
export interface OriginalDebtsEntityOrSimplifiedDebtsEntity {
  to: number;
  from: number;
  amount: string;
  currency_code: string;
}
export interface OriginalDebtsEntityOrSimplifiedDebtsEntity1 {
  to: number;
  from: number;
  amount: string;
  currency_code: string;
}
export interface Avatar {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
  xxlarge: string;
  original?: string | null;
}
export interface TallAvatar {
  xlarge: string;
  large: string;
}
export interface CoverPhoto {
  xxlarge: string;
  xlarge: string;
}

export interface GetUser {
  user: User;
}
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  registration_status: string;
  picture: Picture;
  notifications_read: string;
  notifications_count: number;
  notifications: Notifications;
  default_currency: string;
  locale: string;
}
export interface Picture {
  small: string;
  medium: string;
  large: string;
}
export interface Notifications {
  added_as_friend: boolean;
}

