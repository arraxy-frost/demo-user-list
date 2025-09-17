import { defineStore } from 'pinia'
import type { UserCard } from '@/types/user-card.interface.ts'
import { UserCardType } from '@/common/user-card.type.enum.ts'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as UserCard[],
        userCreatingId: null as number | null,
    }),
    actions: {
        commitUsers() {
            localStorage.setItem('users', JSON.stringify(this.users))
            this.userCreatingId = null // Освобождаем место для новой записи, так как предыдущие гарантировано сохранены
        },
        restoreUsers() {
            this.users = JSON.parse(localStorage.getItem('users') as string) ?? ([] as UserCard[])
        },
        deleteUser(id: number) {
            const userIndex = this.users.findIndex((user) => user.id === id)

            if (userIndex !== -1) {
                this.users.splice(userIndex, 1)
            }

            if (id === this.userCreatingId) this.userCreatingId = null

            this.commitUsers()
        },
        createNew() {
            const newUser = {
                id: 1,
                login: '',
                password: '',
                type: UserCardType.LOCAL,
                tags: '',
            }

            if (this.users.length > 0) {
                const maxId = this.users.reduce(
                    (max: number, user: UserCard) => (user.id > max ? user.id : max),
                    this.users[0].id,
                )

                newUser.id = maxId + 1
            }

            this.users.push(newUser)
            this.userCreatingId = newUser.id

            console.log(newUser)
        },
    },
})
