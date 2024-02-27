<template>
    <v-card class="mx-auto product-card" color="red-darken-3" variant="elevated">
        <v-img cover height="150" :src="product.image" crossorigin></v-img>
        <v-card-item>
            <div>
                <div class="text-caption mb-1">
                    ID: {{ product.id }}
                </div>
                <div class="text-h6 mb-1">
                    {{ product.product || "-" }}
                </div>
                <div class="text-caption">Brand: {{ product.brand || "-" }}</div>
            </div>
            <div class="text-overline mb-1">
                {{ `Price: ${product.price} $` || "-" }}
            </div>
        </v-card-item>

    </v-card>
</template>

<script>
export default {
    props: ["product"],

    computed: {
        getImageURL() {
            return `data:text/html,<style>body{background:url(${this.product.image}) center/cover
                    no-repeat;padding:0;margin:0;overflow:hidden}`
        }
    },
}
</script>

<style lang="scss" scoped>
.product-card {
    flex-basis: 344px;
    cursor: pointer;
}
</style>