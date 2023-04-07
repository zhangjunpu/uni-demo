<template>
  <view class="container">
    <AnimCard />
  </view>
</template>

<script>
import AnimCard from '@/components/anim-card';
export default {
  components: {
    AnimCard,
  },
  data() {
    return {};
  },
  onLoad(options) {
    console.log(this);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
page {
  background-color: #f2f2f2;
}
</style>
