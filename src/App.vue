<script setup lang="ts">
import { Delete, Plus } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { UserCardType } from '@/common/user-card.type.enum.ts'
import { useUsersStore } from '@/stores/users.store.ts'

const usersStore = useUsersStore()

const showModal = ref(false)

const onClickAdd = () => {
    console.log('onClickAdd')
}

const onClickDelete = () => {
    showModal.value = true
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
                        <el-input v-model="scope.row.tags" size="large" maxlength="50" />
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Тип" width="140">
                    <template #default="scope">
                        <el-select v-model="scope.row.type" size="large">
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
                        <el-input v-model="scope.row.login" size="large" maxlength="100" />
                    </template>
                </el-table-column>
                <el-table-column label="Пароль" align="center">
                    <template #default="scope">
                        <el-input
                            v-model="scope.row.password"
                            size="large"
                            type="password"
                            show-password
                            clearable
                            maxlength="100"
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
            <el-dialog v-model="showModal" width="500px">
                Вы действительно хотите удалить запись?
                <el-button type="primary"> Да </el-button>
                <el-button type="danger"> Yes </el-button>
            </el-dialog>
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
</style>
