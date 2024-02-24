<template>
    <main>
        <div class="product-cards-wrapper">
            <ProductCard v-for="product in fullProductsData" :key="product.id" :product="product" />

        </div>
        <v-pagination length="3"></v-pagination>

    </main>
</template>

<script>
import { shallowRef } from "vue";

import telegramIcon from "@/components/icons/IconTelegram.vue"
import githubIcon from "@/components/icons/IconGithub.vue"
import linkedinIcon from "@/components/icons/IconLinkedin.vue"

import ProductCard from "@/components/ProductCard.vue";

export default {
    components: { ProductCard },
    props: ["fullProductsData"],

    data() {
        return {
            icons: [
                { value: shallowRef(telegramIcon), link: "https://t.me/kiberYashka" },
                { value: shallowRef(githubIcon), link: "https://github.com/starik061" },
                { value: shallowRef(linkedinIcon), link: "https://www.linkedin.com/in/starik061" }
            ],
        };
    },

    methods: {
        goTo(link) {
            window.open(link, '_blank');
        }
    }
}
</script>

<style lang="scss" scoped>
.product-cards-wrapper {
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
}
</style>