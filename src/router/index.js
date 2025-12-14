import { createRouter, createWebHistory } from "vue-router";
import NewsView from "../views/NewsView.vue";
import StockAnalysisView from "../views/StockAnalysisView.vue";
import IndustryView from "../views/IndustryView.vue";

const routes = [
    {
        path: "/",
        redirect: "/news",
    },
    {
        path: "/news",
        name: "news",
        component: NewsView,
    },
    {
        path: "/stock",
        name: "stock",
        component: StockAnalysisView,
    },
    {
        path: "/industry",
        name: "industry",
        component: IndustryView,
    },
];

const router = createRouter({
    history: createWebHistory("/stock/"),
    routes,
});

export default router;
