<template>
    <nav class="nav" ref="navRef">
        <RouterLink
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            class="nav-link"
            :class="{ 'router-link-active': currentIndex === index }"
            @click="selectTab(index)"
        >
            <span>{{ item.label }}</span>
        </RouterLink>
        <div class="nav-underline" ref="underlineRef"></div>
    </nav>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

const navRef = ref(null);
const underlineRef = ref(null);

const items = [
    { label: "新聞", to: "/news" },
    { label: "個股分析", to: "/stock" },
    { label: "產業分類", to: "/industry" },
];

const route = useRoute();
const router = useRouter();
const currentIndex = ref(0);

// 更新底線位置
const updateUnderline = () => {
    const links = navRef.value.querySelectorAll(".nav-link");
    const underline = underlineRef.value;
    if (!links[currentIndex.value] || !underline) return;

    const span = links[currentIndex.value].querySelector("span");

    // 抓 span 的最終位置
    const spanRect = span.getBoundingClientRect();
    const navRect = navRef.value.getBoundingClientRect();
    // 取得 nav 左右 padding
    const navStyle = getComputedStyle(navRef.value);
    const paddingLeft = parseFloat(navStyle.paddingLeft);
    underline.style.width = spanRect.width + "px";
    underline.style.transform = `translateX(${spanRect.left - navRect.left - paddingLeft}px)`;
};

// 點擊 Tab
const selectTab = (index) => {
    const links = navRef.value.querySelectorAll(".nav-link");
    links.forEach(link => link.style.transition = "none");

    currentIndex.value = index;
    router.push(items[index].to);

    nextTick(() => {
        links.forEach((link, i) => {
            if (i === currentIndex.value) link.classList.add("router-link-active");
            else link.classList.remove("router-link-active");
        });

        requestAnimationFrame(() => {
            updateUnderline();
            links.forEach(link => link.style.transition = "");
        });
    });
};

// route 改變時更新 currentIndex
watch(() => route.path, (newPath) => {
    const idx = items.findIndex(item => item.to === newPath);
    if (idx !== -1) {
        currentIndex.value = idx;
        updateUnderline();
    }
});

onMounted(() => {
    // 先找 route 對應 index
    const idx = items.findIndex(item => item.to === route.path);
    currentIndex.value = idx !== -1 ? idx : 0;

    const links = navRef.value.querySelectorAll(".nav-link");
    links.forEach(link => link.style.transition = "none");

    // 先套用選中格子狀態
    nextTick(() => {
        links[currentIndex.value].classList.add("router-link-active");

        requestAnimationFrame(() => {
            updateUnderline();
            links.forEach(link => link.style.transition = "");
        });
    });
});

</script>

<style scoped>
.nav {
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px;
    background-color: #1f3a93;
    gap: 12px;
    box-sizing: border-box;
    overflow-x: hidden;
}

.nav-link {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #335fa8;
    color: #ffffff;
    text-decoration: none;
    font-size: 18px;
    position: relative;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
}

.nav-link:hover {
    background-color: #4a6fc2;
}

.nav-link.router-link-active {
    flex-grow: 1.2;
    background-color: #4a90e2;
    color: #d0e8ff;
    font-weight: 600;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
}

.nav-link span {
    position: relative;
    display: inline-block;
    transition: all 0.3s ease-in-out;
}

.nav-underline {
    position: absolute;
    bottom: 4px;
    height: 3px;
    background-color: #d0e8ff;
    border-radius: 2px;
    transition: transform 0.3s ease, width 0.3s ease;
}
</style>
