<template>
    <v-overlay :model-value="isLoading" class="align-center justify-center" scroll-strategy="block" opacity="0.1"
        :persistent="true">
        <v-progress-circular color="red" indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
    props: {
        isLoading: Boolean
    }
}
</script>
embellishment