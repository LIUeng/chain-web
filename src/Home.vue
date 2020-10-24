<template>
  <main class="chain-main">
    <div class="chain-wrap chain-margin chain-box-shadow">
      <div class="chain-title chain-title-before">概览</div>
      <div class="chain-overview-content">
        <div class="chain-overview-item" v-for="item in overviewEnum" :key="item.title">
          <div class="chain-overview-item-title">{{ item.title }}</div>
          <div class="chain-overview-item-meta">
            {{ overview[item.field] || 0 }}
          </div>
        </div>
      </div>
    </div>
    <div class="chain-wrap chain-margin chain-box-shadow">
      <div class="chain-title chain-title-before">
        区块<span class="chain-title-txt">(最新生成)</span>
      </div>
      <div class="chain-block-box">
        <div class="chain-block-content">
          <div class="chain-block-list">
            <transition-group
              tag="div"
              name="chain-block-list"
            >
              <animate-item
                v-for="item in blocks"
                :key="item.height"
                :row="item"
              ></animate-item>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-wrap chain-latest chain-margin chain-box-shadow">
      <div class="chain-title chain-title-before">
        数据<span class="chain-title-txt">(最新)</span>
      </div>
      <el-table :data="datas" stripe style="width: 100%">
        <el-table-column prop="time" label="时间" width="180">
        </el-table-column>
        <el-table-column prop="block_num" label="所在区块" width="180">
        </el-table-column>
        <el-table-column prop="key" label="键值"> </el-table-column>
        <el-table-column prop="user_id" label="用户ID"></el-table-column>
        <el-table-column prop="user_ip" label="用户IP"></el-table-column>
        <el-table-column prop="operate" label="数据" width="80">
          <template slot-scope="{ row }">
            <modal-search>
              <template slot-scope="{ open }">
                <a @click="e => open(e, row.key)" class="view-link">查看</a>
              </template>
            </modal-search>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </main>
</template>

<script>
import ModalSearch from './components/ModalSearch.vue';
import AnimateItem from './components/AnimateItem.vue';

export default {
  name: 'Home',
  components: {
    AnimateItem,
    ModalSearch,
  },
  data() {
    return {
      overview: {},
      blocks: [],
      datas: [],
      overviewEnum: [
        {
          title: '区块高度',
          field: 'height',
        },
        {
          title: '总数据量',
          field: 'total_tx_num',
        },
        {
          title: '实时节点数',
          field: 'online_node_num',
        },
        {
          title: '共识节点数',
          field: 'consensus_node_num',
        },
        {
          title: '同步节点数',
          field: 'syn_node_num',
        },
      ],
      // timerId: null,
    };
  },
  methods: {
    // 获取数据最新
    getDatas(params = {}) {
      this.$http('/api/datas', {
        data: params,
      }).then(res => {
        res = JSON.parse(res.data || '{"data": []}');
        this.datas = res.data || [];
      });
    },

    // 获取预览
    getOverview() {
      this.$http('/api/overview').then(res => {
        this.overview = res.data || [];
      });
    },

    // 获取区块
    getBlocks() {
      this.$http('/api/block').then(res => {
        res = JSON.parse(res.data || '{"data": []}');
        this.blocks = res.data || [];
      });
    },
  },
  created() {
    this.getDatas();
    this.getBlocks();
    this.getOverview();
    window.timerId = setInterval(() => {
      this.getDatas();
      this.getBlocks();
      this.getOverview();
    }, 1000);
  },
  mounted() {
  },
  beforeDestroy() {
    clearInterval(window.timerId);
  },
};
</script>

<style lang="sass" scoped>
.chain
  &-margin
    margin: 20px 40px

  &-wrap
    padding: 20px
    border-radius: 6px
    background-color: #fff

  &-overview
    &-content
      display: flex

    &-item
      flex: 1
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column

      &-title
        font-size: 16px
        color: #999

      &-meta
        font-size: 24px
        margin-top: 8px
        color: #000

  &-box-shadow
    box-shadow: 0 4px 8px 0 hsla(0, 0%, 6%, .02)

  &-title
    font-size: 20px
    padding: 0 0 20px 15px
    font-family: microsoft yahei
    position: relative
    &-txt
      color: #555

  &-title-before
    &::before
      content: ''
      position: absolute
      top: 2px
      left: 0
      height: 22px
      width: 4px
      background-color: orange

  &-block
    &-box
      padding-bottom: 14px

    &-content
      position: relative
      width: 100%
      overflow: hidden
      height: 63px

    &-list
      width: 150%

.chain-block-list
  &-enter-active, &-leave-active
    transition: all .5s

  &-enter, &-leave-to
    opacity: 0
    transform: scale(.01)

  &-move
    transition: all .5s

.view-link
  cursor: pointer
  color: #5b9082

  ::hover
    color: #5b9082
</style>
