import { defineStore } from 'pinia'
import type { UserCard } from '@/types/user-card.interface.ts'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as UserCard[],
    }),
    actions: {
        commitUsers() {
            localStorage.setItem('users', JSON.stringify(this.users))
        },
        restoreUsers() {
            this.users = JSON.parse(localStorage.getItem('users') as string)
        },
    },
})
