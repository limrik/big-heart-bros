import { create } from 'zustand';

export enum UserType {
  VOLUNTEER = "volunteer",
  ORGANISATION = "organisation",
  ADMIN = "admin"
}

type UserTypeStore = {
  userType: UserType;
  setUserType: (userType: UserType) => void
}

export const useUserTypeStore = create<UserTypeStore>((set) => ({
  userType: UserType.VOLUNTEER,
  setUserType: (userType) => set({userType: userType})
}));
