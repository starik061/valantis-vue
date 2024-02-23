<template>
    <v-card color="grey-lighten-4" flat height="100px" rounded="0">
        <v-toolbar extended extension-height="100">

            <v-toolbar-title>
                <ValantisIcon @click="goTo()" class="valantis-logo" />
            </v-toolbar-title>
            <v-text-field label="Search product"></v-text-field>
            <v-btn variant="text" icon="mdi-magnify"></v-btn>
            <v-btn variant="text" icon="mdi-filter"></v-btn>
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-card>
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