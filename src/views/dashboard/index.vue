<template>
  <div class="dashboard-container">
    <iframe src="http://123.60.38.132:9002/WarehouseArchives"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    //border: 1px solid red;
    box-sizing: border-box;
    margin: 0 8px 8px;
    background-color: #FFFFFF;
    height: calc(100vh - 130px);
    iframe{
      width: 100%;
      height: 100%;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
