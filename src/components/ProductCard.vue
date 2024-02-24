<template>
    <v-card class="mx-auto product-card" color="red-darken-3" variant="elevated">
        <v-card-item>
            <div>
                <div class="text-overline mb-1">
                    {{ product.id }}
                </div>
                <div class="text-h6 mb-1">
                    {{ product.product || "-" }}
                </div>
                <div class="text-caption">{{ product.brand || "-" }}</div>
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
}
</script>

<style lang="scss" scoped>
.product-card {
    flex-basis: 344px;
    cursor: pointer;
}
</style>