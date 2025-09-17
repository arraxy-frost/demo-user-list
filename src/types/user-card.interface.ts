import type { UserCardType } from '@/common/user-card.type.enum.ts'

export interface UserCard {
    tags: string;
    type: UserCardType;
    login: string;
    password: string;
}