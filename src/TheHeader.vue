<template>
  <header class="chain-hf">
    <div class="chain-layout">
      <a class="chain-logo" href="/">
        <span class="chain-logo-txt">区块链浏览器</span>
      </a>
      <div class="chain-search">
        <modal-search @ok="search">
          <template slot-scope="{ open }">
            <el-input
              v-model="inputValue"
              placeholder="请输入键值查询"
              style="width: 500px;"
              @change="e => search(open, e)"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="e => search(open, e)"
              ></el-button>
            </el-input>
          </template>
        </modal-search>
      </div>
      <ul class="chain-menu">
        <li
          :class="[
            'chain-menu-item',
            pathname === '/' ? 'chain-menu-item-active' : '',
          ]"
        >
          <router-link to="/">监控台</router-link>
        </li>
        <!-- <li class="chain-menu-item"><a>监控台II</a></li> -->
        <!-- <li class="chain-menu-item"><a>监控台III</a></li> -->
      </ul>
    </div>
  </header>
</template>

<script>
import ModalSearch from './components/ModalSearch';

export default {
  name: 'the-header',
  components: {
    ModalSearch,
  },
  data() {
    return {
      inputValue: '',
      pathname: location.pathname,
    };
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.pathname = to.path;
      }
    },
  },
  methods: {
    search(open) {
      if (this.inputValue) {
        // 打开搜索弹窗
        open && open(null, this.inputValue);
      }
    },
  },
  mounted() {
    // console.log(this.$router)
  },
};
</script>

<style lang="scss" scoped>
.chain {
  &-layout {
    height: 100%;
    padding: 0 40px;
    margin: 0 auto;
    line-height: 64px;
    display: flex;
    justify-content: space-between;
  }

  &-logo {
    height: 100%;
    display: inline-block;

    &-txt {
      color: #fff;
      font-size: 20px;
    }
  }

  &-menu {
    &-item {
      display: inline-block;
      font-size: 18px;
      color: #fff;
      opacity: 0.8;
      margin-left: 20px;

      &-active {
        opacity: 1;
        border-bottom: 2px solid orange;
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
