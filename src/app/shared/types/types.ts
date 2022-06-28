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
  cardId: number;
  newLevel: number;
};
