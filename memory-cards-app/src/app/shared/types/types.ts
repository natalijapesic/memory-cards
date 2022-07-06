import { Card, Category } from "../models";

export type ActionType = 'add' | 'update' | 'delete' | 'none';

export interface Action<T> {
  item: T;
  action: ActionType;
}

export enum Role {
  User = 'User',
  Moderator = 'Moderator',
  CategoryAdmin = 'CategoryAdmin',
}

export type DifficultyLevelRequest = {
  cardId: string;
  newLevel: number;
};

export type CategoryResponse = {
  objectId: string;
  name: string;
  adminId: number;
  numberOfMembers: number;
  createdAt: string;
  updatedAt: string;
};

export type CategoriesResponse = {
  results: Category[];
};


export type CardsResponse = {
  results: Card[];
};