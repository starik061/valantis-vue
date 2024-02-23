<template>
    <v-pagination :length="3"></v-pagination>
</template>

<script>
import { shallowRef } from "vue";

import telegramIcon from "@/components/icons/IconTelegram.vue"
import githubIcon from "@/components/icons/IconGithub.vue"
import linkedinIcon from "@/components/icons/IconLinkedin.vue"

export default {
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
