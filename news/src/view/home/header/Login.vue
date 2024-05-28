<template>
    <div class="login-container" v-if="!store.userAccount.loggedIn">
        <RouterLink to="/signup"><button class="login">Sign up</button></RouterLink>
        <RouterLink to="/login"><button class="login">Login</button></RouterLink>
    </div>
</template>

<script setup>
import {RouterLink} from 'vue-router';
import {useStore} from '@/stores'
const store = useStore()
</script>

<style lang="scss" scoped>

.login-container{
    display: flex;
    .login{
        width: 100px;
        height: 40px;
        border-radius: 20px;
        margin-left: 10px;
        color: $color-text;
        background-color: $color-accent;
        border: $border-2;
        cursor: pointer;
    }
}
</style>