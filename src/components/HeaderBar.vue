<template>
    <v-toolbar class="px-10 py-3">
        <v-toolbar-title>
            <ValantisIcon @click="goTo()" class="valantis-logo" />
        </v-toolbar-title>
        <v-text-field label="Search product" variant="outlined" hide-details @click="playAudio()"></v-text-field>
        <v-btn class="ml-1" variant="text" icon="mdi-magnify"></v-btn>
        <v-btn variant="text" icon="mdi-filter"></v-btn>
        <v-spacer></v-spacer>
    </v-toolbar>
    <audio class="visually-hidden" src="../../public/simply-the-best.mp3" type="audio/mpeg" controls loop ref="audio" />
</template>

<script>

import ValantisIcon from "@/components/icons/IconValantis.vue";

export default {
    data() {
        return {

        };
    },
    components: { ValantisIcon },
    methods: {
        goTo() {
            window.open("https://juvelirnyj-lombard.ru", '_blank');

        },
        playAudio() {
            const audio = this.$refs.audio;
            audio.play();


        }
    }
}
</script>

<style scoped lang="scss">
.valantis-logo {
    cursor: pointer;

    &:hover,
    :active,
    :focus {
        opacity: 0.7;
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