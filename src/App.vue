<script setup lang="ts">
import { Delete, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { UserCardType } from '@/common/user-card.type.enum.ts'

const users = ref([
    { tags: 'admin;scoped;', type: 'local', login: 'admin', password: 'password' },
    { tags: 'dev;', type: 'ldap', login: 'ivan', password: 'password' },
    { tags: 'tag;', type: 'local', login: 'test', password: 'password' },
])

const onClickAdd = () => {
    console.log('onClickAdd')
}

const onClickDelete = (id: any) => {
    console.log('onClickDelete:', id)
}
</script>

<template>
    <header>
        <span class="header-title">Учетные записи</span>
        <el-button type="default" size="large" circle style="border-radius: 0" @click="onClickAdd">
            <el-icon>
                <Plus />
            </el-icon>
        </el-button>
    </header>
    <el-table :data="users" style="width: 100%; padding: 16px; border-radius: 16px">
        <el-table-column label="Метка" width="160">
            <template #default="scope">
                <el-input v-model="scope.row.tags" size="large" maxlength="50" />
            </template>
        </el-table-column>
        <el-table-column align="center" label="Тип" width="110">
            <template #default="scope">
                <el-select v-model="scope.row.type" size="large">
                    <el-option v-for="t in UserCardType" :key="t" :label="t" :value="t"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column prop="login" align="center" label="Логин" width="180">
            <template #default="scope">
                <el-input v-model="scope.row.login" size="large" maxlength="100" />
            </template>
        </el-table-column>
        <el-table-column label="Пароль" align="center" width="300">
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
        <el-table-column align="left" width="100">
            <template #default="scope">
                <el-button size="large" @click="onClickDelete(scope.row)" style="border: none">
                    <el-icon>
                        <Delete />
                    </el-icon>
                </el-button>
            </template>
        </el-table-column>
    </el-table>
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
