<template>
    <audio class="visually-hidden" type="audio/mpeg" ref="audio" />
    <main>
        <div class="product-cards-wrapper" @click="playAudio()">
            <ProductCard v-for="product in fullProductsData" :key="product.id" :product="product" />

        </div>
        <v-pagination :length="19" :total-visible="3" :start="calcStartPaginationNumber()" rounded="circle"
            active-color="grey-darken-4" :model-value="page" @update:modelValue="changePage"></v-pagination>
    </main>
</template>

<script>
import { shallowRef } from "vue";

import telegramIcon from "@/components/icons/IconTelegram.vue"
import githubIcon from "@/components/icons/IconGithub.vue"
import linkedinIcon from "@/components/icons/IconLinkedin.vue"

import productClickSound from "@/assets/product_click.mp3"

import ProductCard from "@/components/ProductCard.vue";

export default {
    components: { ProductCard },
    props: ["fullProductsData", "page"],
    emits: ['pageChanged'],

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
        },
        changePage(page) {
            this.$emit('pageChanged', page)
        },
        calcStartPaginationNumber() {

            if (this.page === 1) {
                this.page
            } else {

                return this.page - 1;
            }
        },
        playAudio() {
            const audio = this.$refs.audio;
            audio.src = productClickSound;
            audio.play();


        }
    }
}
</script>

<style lang="scss" scoped>
.product-cards-wrapper {
    width: 320px;
    padding: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 auto;

    @media screen and (min-width: 710px) {
        width: 680px;
    }

    @media screen and (min-width: 1010px) {
        width: 980px;
    }

    @media screen and (min-width: 1340px) {
        width: 1310px;
    }

    @media screen and (min-width: 1670px) {
        width: 1640px;
    }
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
}
</style>