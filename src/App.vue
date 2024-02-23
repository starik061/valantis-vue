<template>
  <div class="main-container">
    <HeaderBar />
    <MainContent />
    <FooterBar class="footer" />
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import MainContent from "./components/MainContent.vue";
import FooterBar from "./components/FooterBar.vue";

export default {
  components: { HeaderBar, MainContent, FooterBar },

  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
