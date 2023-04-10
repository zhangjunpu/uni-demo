<template>
  <div class="rating">
    <!-- progress -->
    <div class="grade-progress">
      <div class="progress-bg">
        <span class="progress" style="width: 80%"></span>
      </div>
    </div>

    <!-- rate -->

    <div class="rating-bar">
      <div class="rating-bg">
        <span class="progress" style="width: 80%"></span>
        <div class="rating-star"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
  onLoad() {},
};
</script>

<style scoped lang="scss">
/* grade-progress-box:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  overflow: hidden;
} */
.grade-progress {
  display: table-cell;
  vertical-align: middle;
  width: 300rpx;
  height: 20rpx;
  overflow: hidden;

  .progress-bg {
    height: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background: #e5e5e5;

    .progress {
      width: 0;
      height: 100%;
      display: block;
      border-radius: 10rpx;
      transition: width 1s ease-out;
      background: linear-gradient(to right, #f23f5c, #fea94e 100%);
    }
  }
}

.rating-bar {
  position: relative;
  display: table-cell;
  width: 151rpx;
  height: 25rpx;
  overflow: hidden;
  vertical-align: middle;

  .rating-bg {
    height: 100%;
    border-radius: 10rpx;
    overflow: hidden;
    background: #e5e5e5;

    .progress {
      width: 0;
      height: 100%;
      display: block;
      border-radius: 10rpx;
      transition: width 1s ease-out;
      background: linear-gradient(to right, #f23f5c, #fea94e 100%);
    }

    .rating-star {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url(data:image/png;base64,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) no-repeat;
      background-size: 100% 100% !important;
    }
  }
}
</style>
