import type { UserCardType } from '@/common/user-card.type.enum.ts'

export interface UserCard {
    id: number;
    login: string;
    password: string;
    type: UserCardType;
    tags: string;
}