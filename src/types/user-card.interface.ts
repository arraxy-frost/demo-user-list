import type { UserCardType } from '@/common/user-card.type.enum.ts'

export interface UserCardInterface {
    tags: string;
    type: UserCardType;
    login: string;
    password: string;
}