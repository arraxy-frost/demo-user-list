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
        deleteUser(id: number) {
            const userIndex = this.users.findIndex(user => user.id === id)

            if (userIndex !== -1) {
                this.users.splice(userIndex, 1)
            }

            this.commitUsers()
        }
    },
})
