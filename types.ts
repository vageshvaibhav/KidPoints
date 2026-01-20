
export type Role = 'PARENT' | 'CHILD';

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  points: number;
  pointsByCategory: Record<string, number>;
}

export interface RewardCategory {
  id: string;
  name: string;
  value: number;
  icon: string;
  color: string;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  image?: string;
}

export interface Transaction {
  id: string;
  childId: string;
  type: 'EARNED' | 'REDEEMED' | 'MANUAL';
  points: number;
  category?: string;
  description: string;
  timestamp: number;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'POINT_EARNED' | 'REWARD_REQUEST' | 'COPARENT_ACTION';
}

export interface AppState {
  children: ChildProfile[];
  categories: RewardCategory[];
  rewards: RewardItem[];
  transactions: Transaction[];
  notifications: Notification[];
  activeChildId: string | null;
  role: Role;
  familyId: string;
  activeParentName: string;
  coParents: string[];
}
