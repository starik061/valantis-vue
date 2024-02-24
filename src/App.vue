<template>
  <div class="main-container">
    <HeaderBar />
    <MainContent :fullProductsData="fullProductsData" />
    <FooterBar class="footer" />
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import MainContent from "@/components/MainContent.vue";
import FooterBar from "@/components/FooterBar.vue";

import { getProductData } from "@/api/index.js"
export default {
  components: { HeaderBar, MainContent, FooterBar },

  data() {
    return {
      productIDs: [],
      fullProductsData: [],
    }
  },

  async mounted() {
    try {
      let response = await getProductData("get_ids", { "limit": 50 });
      this.productIDs = response;

      response = await getProductData("get_items", { "ids": this.productIDs });

      // Фильтруем response, оставляя только первый объект с уникальным id
      const uniqIds = new Set();

      this.fullProductsData = response.filter(product => {
        if (!uniqIds.has(product.id)) {
          uniqIds.add(product.id);
          this.fullProductsData.push(product);
          return true;
        }
        return false;
      });

      console.log("this.productIDs", this.productIDs);
      console.log("this.fullProductsData", this.fullProductsData);

    } catch (error) {
      console.error('Error:', error);
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