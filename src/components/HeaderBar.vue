<template>
    <v-toolbar class="px-10 py-3">
        <v-toolbar-title>
            <ValantisIcon @click="goTo()" class="valantis-logo" />
        </v-toolbar-title>
        <v-text-field class="d-block text-field" label="Search product" variant="outlined" :type="getSearchInputType()"
            hide-details :model-value="filterQuery" @update:modelValue="changeFilterQuery" @click="playAudio()"
            @keyup.enter="emitFiltration"></v-text-field>
        <v-btn class="ml-1 mr-3 bg-red-darken-4" variant="text" icon="mdi-magnify" :disabled="isFilterButtonDisabled"
            @click.prevent="emitFiltration"></v-btn>
        <label for="filter-select">
            <v-icon class="pr-3" variant="text" icon="mdi-filter"></v-icon>
        </label>

        <div class="d-block text-field-small">
            <v-select id="filter-select" label="Тип фильтра" variant="outlined" hide-details :items="filterTypes"
                :model-value="choosenFilterType" @update:modelValue="changeFilterType">
            </v-select>
        </div>
        <v-spacer></v-spacer>
    </v-toolbar>
    <audio class="visually-hidden" type="audio/mpeg" ref="audio" />
</template>

<script>

import ValantisIcon from "@/components/icons/IconValantis.vue";

import helloToValantisGuys from "@/assets/simply-the-best.mp3";

export default {
    components: { ValantisIcon },
    emits: ["filtration"],
    data() {
        return {
            filterTypes: ['по названию', 'по цене', 'по бренду'],
            choosenFilterType: null,
            filterQuery: ""
        };
    },

    computed: {
        isFilterButtonDisabled() {
            return this.filterQuery ? false : true;
        }
    },
    methods: {
        getSearchInputType() {
            if (this.choosenFilterType === "по цене") {
                return "number";
            }
            return "text"
        },
        goTo() {
            window.open("https://juvelirnyj-lombard.ru", '_blank');
        },
        playAudio() {
            const audio = this.$refs.audio;
            // audio.pause();
            audio.src = helloToValantisGuys;
            audio.play();
        },
        changeFilterQuery(e) {
            this.filterQuery = e.trim();

            if (this.choosenFilterType === "по цене") {
                this.filterQuery = Number(this.filterQuery);
            }
        },
        changeFilterType(e) {
            this.choosenFilterType = e
            if (this.choosenFilterType === "по цене") {
                this.filterQuery = 0;
            }
        },
        emitFiltration() {
            let filtrationField = "product";
            switch (this.choosenFilterType) {
                case "по цене": {
                    filtrationField = "price";
                    break;
                }
                case "по бренду": {
                    filtrationField = "brand";
                    break;
                }
                default: {
                    filtrationField = "product";
                }
            }
            this.$emit("filtration", { filtrationField, filterQuery: this.filterQuery })
        }
    },

    created() {
        this.choosenFilterType = this.filterTypes[0]; // Присваиваем значение после инициализации filterTypes
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

.text-field {
    flex-basis: 500px;
    flex-grow: 0;

    &-small {
        flex-basis: 150px;
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