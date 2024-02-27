<template>
    <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition">
        <v-card class="mx-auto product-card" color="red-darken-3" variant="elevated">
            <v-img cover height="150" :src="product.image" crossorigin loading="lazy"></v-img>
            <v-card-item>
                <div>
                    <div class="text-caption mb-1 no-overflow">
                        ID: {{ product.id }}
                    </div>
                    <div class="text-h6 mb-1 no-overflow">
                        {{ product.product || "-" }}
                    </div>
                    <div class="text-caption no-overflow">Brand: {{ product.brand || "-" }}</div>
                </div>
                <div class="text-overline mb-1 no-overflow">
                    {{ `Price: ${product.price} $` || "-" }}
                </div>
            </v-card-item>
        </v-card>
    </v-lazy>
</template>

<script>
export default {
    props: ["product"],
}
</script>

<style lang="scss" scoped>
.product-card {
    width: 320px;
    flex-basis: 320px;
    cursor: pointer;
}

.no-overflow {
    white-space: nowrap;
    /* Запрещаем перенос текста на новую строку */
    overflow: hidden;
    /* Скрываем содержимое, выходящее за пределы элемента */
    text-overflow: ellipsis;
    /* Добавляем многоточие в конце строки, если текст обрезается */
}
</style>