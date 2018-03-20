<template>
    <div id="app">
        <app-head v-show="isNotLogin"></app-head>
        <router-view/>
        <app-foot></app-foot>
    </div>
</template>

<script>
import AppHead from '@/components/head'
import AppFoot from '@/components/foot'

export default {
    name: 'App',

    components: {
        AppHead, AppFoot
    },

    watch: {
        '$route' (to) {
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
            this.isNotLogin = !['login', 'register', 'findpass'].includes(to.name)
        }
    },

    data () {
        return {
            isNotLogin: false
        }
    },

    mounted () {
        this.isNotLogin = !['login', 'register', 'findpass'].includes(this.$route.name)
    }
}
</script>

<style>
#app {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
