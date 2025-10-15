"use client";

import { GetUserDetails } from "@/api/users";
import { User } from "@/types/user";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoaded: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  isLoaded: false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  async function getUserDetails() {
    try {
      const response = await GetUserDetails();
      setUser(response);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
};
