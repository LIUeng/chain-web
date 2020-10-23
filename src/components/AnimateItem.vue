<template>
<!-- <transition name="block-list" appear-class="block-list-move"> -->
  <div class="chain-block-list-item">
    <div class="chain-block-list-item-top">
      <div class="chain-hover">{{ row.height || 0 }}&nbsp;h</div>
    </div>
    <div class="chain-block-list-item-bot">
      <div class="chain-block-list-item-bot-l">{{ row.tx_num || 0 }}&nbsp;Txns</div>
      <div class="chain-block-list-item-bot-r">{{ genTxt(row.time) }}&nbsp;ago</div>
    </div>
    <div class="chain-block-list-item-before">
      <div class="chain-block-list-item-before-line"></div>
      <div class="chain-block-list-item-before-ball"></div>
    </div>
  </div>
<!-- </transition> -->
</template>

<script>
export default {
  name: 'animate-item',
  props: {
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    genTxt(time) {
      let diff = time && Math.abs(time - new Date().valueOf()) || 0;
      // console.log(diff);
      if(diff < 60) {
        return diff + ' s';
      }
      let ceil = Math.ceil(diff / 60);
      return ceil + ' min';
    },
  },
};
</script>

<style lang="sass" scoped>
.chain
  &-block-list
    &-item:first-child
      .chain-block-list-item-before
        display: none

    &-item
      position: relative
      display: inline-block
      width: 204px
      height: 63px
      padding: 5px 14px
      margin-right: 30px
      text-align: left
      background-color: #e5ebea
      border: 1px solid #5b9082

      &-top
        font-size: 14px
        margin-bottom: 10px
        color: #5b9082
        display: flex

      &-bot
        display: flex
        justify-content: space-between
        font-size: 14px
        color: #696969

      &-before
        position: absolute
        width: 46px
        height: 9px
        top: 50%
        left: -32px
        transform: translateY(-50%)
        display: flex
        justify-content: flex-end
        align-items: center

        &-line
          position: absolute
          top: 50%
          left: 0
          width: 42px
          height: 1px
          transform: translateY(-50%)
          background-color: #b7b7b7

        &-ball
          width: 8px
          height: 8px
          border-radius: 50%
          flex-shrink: 0
          background-color: #fff
          border: 1px solid #5b9082

.chain-hover
  cursor: pointer
  flex: 1
</style>
