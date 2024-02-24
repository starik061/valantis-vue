<template>
    <v-toolbar class="px-10 py-3">
        <v-toolbar-title>
            <ValantisIcon @click="goTo()" class="valantis-logo" />
        </v-toolbar-title>
        <v-text-field label="Search product" variant="outlined" hide-details></v-text-field>
        <v-btn class="ml-1" variant="text" icon="mdi-magnify" @click="fetchAPI"></v-btn>
        <v-btn variant="text" icon="mdi-filter"></v-btn>
        <v-spacer></v-spacer>
    </v-toolbar>
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
        fetchAPI() {

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
</style>