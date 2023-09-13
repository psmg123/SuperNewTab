<script setup>
import Search from './components/search.vue'
import Content from './components/content.vue'
import Test from './components/test.vue'
</script>


<template>
    <div class="center">
        <Search></Search>
        <Content></Content>

    </div>

<!-- <Test></Test> -->
     
</template>


<style scoped>
.center {

    width: 700px;
}

@media screen and (max-width: 720px) {
    .center {

        width: 600px;
    }
}

@media screen and (max-width: 620px) {
    .center {

        width: 500px;
    }
}

@media screen and (max-width: 520px) {
    .center {

        width: 400px;
    }
}

@media screen and (max-width: 420px) {
    .center {

        width: 300px;
    }
}

@media screen and (max-width: 320px) {
    .center {

        width: 200px;
    }
}</style>