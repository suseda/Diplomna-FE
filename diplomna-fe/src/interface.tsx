import { Dispatch, ReactNode, SetStateAction } from "react";

export interface RecipeProps {
    id: number;
    name: string;
    likes: number;
    time_for_cooking: number;
    type: string;
    description: string;
  }

export  interface RecipePropsWithImg {
    id: number;
    name: string;
    photoUrl: string;
    likes: number;
    time_for_cooking: number;
    type: string;
    description: string;
  }


export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

export interface NavBarProps {
    onSearch: (word: string) => void;
  }

export interface CheckBoxGroupProps {
    options: string[];
    handleType: (option: string) => void;
  }

export interface CheckBoxProps {
    text: string;
    name: string;
    checked: boolean;
    onChange: () => void;
  }

  
export interface User {
    id: number;
    name: string;
    email: string;
  }
  
export interface AuthContextValue {
    auth: {
      email: string;
      accessToken: string;
      user: User;
    };
    setAuth: Dispatch<SetStateAction<{
      email: string;
      accessToken: string;
      user: User;
    }>>;
  }

export interface AuthProviderProps {
    children: ReactNode;
  }

export interface Product
{
  productName: string,
  grams: string,
  onRemove?: (arg: string) => void;
} 

export interface CreateRecipeProps {
  name: string;
  time_for_cooking: number;
  type: string;
  description: string;
  products: Product[];
}

export interface ProductNameProps {
  name: string;
}