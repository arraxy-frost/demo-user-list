<script setup lang="ts">
import { Delete, Plus } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { UserCardType } from '@/common/user-card.type.enum.ts'
import { useUsersStore } from '@/stores/users.store.ts'
import type { UserCard } from '@/types/user-card.interface.ts'

const usersStore = useUsersStore()

const onClickAdd = () => {
    if (usersStore.userCreatingId) {
        console.warn('New record already in progress. Try to delete last one and click again')
        return
    }
    usersStore.createNew()
}

const invalidInput = ref<{
    id: number
    inputName: string
} | null>(null)

const onClickDelete = (scope: UserCard) => {
    usersStore.deleteUser(scope.id)
}

const saveUser = (userCard: UserCard) => {
    // Валидируем логин
    if (userCard.login.length < 1) {
        console.error('Login must have a value')

        invalidInput.value = {
            id: userCard.id,
            inputName: 'login',
        }

        usersStore.userCreatingId = userCard.id;

        setTimeout(() => (invalidInput.value = null), 3000)

        return
    }

    // Убираем пароль из поля при сохранении LDAP учетки
    if (userCard.type === UserCardType.LDAP) {
        userCard.password = ''
    }

    if (userCard.type === UserCardType.LOCAL && userCard.password.length < 8) {
        console.warn('Password must be at least 8 characters long')

        invalidInput.value = {
            id: userCard.id,
            inputName: 'password',
        }

        usersStore.userCreatingId = userCard.id;

        setTimeout(() => (invalidInput.value = null), 3000)

        return
    }

    usersStore.commitUsers()

    userCard.id === usersStore.userCreatingId
        ? console.log(`User ${userCard.id} has been created`)
        : console.log(`User ${userCard.id} has been updated`)
}

onMounted(() => {
    usersStore.restoreUsers()
})
</script>

<template>
    <el-container>
        <el-header
            style="
                display: flex;
                flex-direction: column;
                gap: 16px;
                height: fit-content;
                padding-bottom: 0;
            "
        >
            <div
                style="
                    display: flex;
                    flex-direction: row;
                    gap: 8px;
                    width: 100%;
                    align-items: center;
                "
            >
                <span class="header-title">Учетные записи</span>
                <el-button
                    type="default"
                    size="large"
                    circle
                    style="border-radius: 0"
                    @click="onClickAdd"
                >
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-button>
            </div>
            <div style="background: aliceblue; padding: 8px; font-size: 13px; width: 100%">
                Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
            </div>
        </el-header>
        <el-main style="padding-top: 8px">
            <el-table :data="usersStore.users">
                <el-table-column label="Метка">
                    <template #default="scope">
                        <el-input
                            v-model="scope.row.tags"
                            size="large"
                            maxlength="50"
                            @blur="saveUser(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Тип" width="140">
                    <template #default="scope">
                        <el-select
                            v-model="scope.row.type"
                            size="large"
                            @change="saveUser(scope.row)"
                        >
                            <el-option
                                v-for="t in UserCardType"
                                :key="t"
                                :label="t"
                                :value="t"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="login" align="center" label="Логин">
                    <template #default="scope">
                        <el-input
                            v-model="scope.row.login"
                            size="large"
                            maxlength="100"
                            @blur="saveUser(scope.row)"
                            :class="{ 'danger' : invalidInput?.inputName === 'login' && invalidInput?.id === scope.row.id }"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="Пароль" align="center">
                    <template #default="scope">
                        <el-input
                            :disabled="scope.row.type === UserCardType.LDAP"
                            v-model="scope.row.password"
                            size="large"
                            type="password"
                            show-password
                            clearable
                            maxlength="100"
                            @blur="saveUser(scope.row)"
                            :class="{ 'danger' : invalidInput?.inputName === 'password' && invalidInput?.id === scope.row.id }"
                        />
                    </template>
                </el-table-column>
                <el-table-column align="center" width="80">
                    <template #default="scope">
                        <el-button
                            size="large"
                            @click="onClickDelete(scope.row)"
                            style="
                                border: none;
                                width: 48px;
                                height: 48px;
                                min-width: 48px;
                                padding: 0;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            "
                        >
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    box-sizing: border-box;
    padding: 16px 32px;
}

.header-title {
    font-weight: bolder;
    font-size: 21px;
}

main {
    padding: 24px;
}

.danger:deep(.el-input__wrapper) {
    border: 1px solid red;
    border-radius: 8px;
}
</style>
