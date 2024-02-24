<template>
    <div class="text-center">
        <v-overlay :model-value="isLoading" class="align-center justify-center" scroll-strategy="block" opacity="0.1">
            <v-progress-circular color="red" indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: Boolean
    }
}

</script>

<style lang="scss" scoped></style>