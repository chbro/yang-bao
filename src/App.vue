<template>
    <div id="app">
        <app-head v-show="isNotLogin"></app-head>
        <router-view/>
        <app-foot></app-foot>
    </div>
</template>

<script>
import AppHead from '@/components/common/head'
import AppFoot from '@/components/common/foot'

export default {
    name: 'app',

    components: {
        AppHead, AppFoot
    },

    watch: {
        '$route' (to) {
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
            this.isNotLogin = !['login', 'register', 'findpass', 'chat', 'prochat'].includes(to.name)
        }
    },

    data () {
        return {
            isNotLogin: false
        }
    },

    mounted () {
        this.isNotLogin = !['login', 'register', 'findpass', 'chat', 'prochat'].includes(this.$route.name)
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

// simply reset some styles
body, html
    margin 0
    padding 0
ul
    list-style none
    padding 0
    margin 0
a
    text-decoration none
    color color-main
    &:hover
        color color-main
img
    max-width 100%
#app
    font-family 'Poppins', sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
</style>
