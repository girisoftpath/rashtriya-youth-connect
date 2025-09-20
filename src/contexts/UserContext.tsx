import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: { day: string; month: string; year: string };
  gender: string;
  bloodGroup?: string;
  state: string;
  district: string;
  areaType: 'urban' | 'rural';
  ulb?: string;
  block?: string;
  panchayat?: string;
  village?: string;
  pincode: string;
  youthType: string;
  sportsTalent?: string;
  kheloIndiaParticipant: boolean;
  profileImage?: string;
  username?: string;
  areOfInterest?: string;
  educationQualification?: string;
  languages?: string[];
  professionalSummary?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = user !== null;

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};