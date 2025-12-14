<template>
    <div id="app">
        <NavBar />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<style>
* {
    box-sizing: border-box;
}

body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f4f8;
}

.container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* 漲跌 */
.price-up {
    color: #e74c3c;
    font-weight: bold;
}

.price-down {
    color: #27ae60;
    font-weight: bold;
}
</style>
