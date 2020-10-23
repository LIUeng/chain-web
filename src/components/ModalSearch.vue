<template>
  <span>
    <slot :open="open"></slot>
    <el-dialog
      :visible="visible"
      width="45%"
      title="查询结果"
      @close="close"
      append-to-body
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ detail.key || '' }}</span>
        </div>
        <div>{{ detail.data || '暂无数据' }}</div>
      </el-card>
      <span slot="footer">
        <el-button type="default" @click="close">取消</el-button>
        <el-button type="primary" @click="close">确定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { Message } from 'element-ui';

export default {
  name: 'modal-search',
  data() {
    return {
      visible: false,
      detail: {},
    };
  },
  methods: {
    async open(_, key) {
      const res = await this.$http('/api/datas', {
        data: {
          key,
        },
      });
      if (!(res && res.data)) {
        Message.warning('没有查询到数据！');
        return;
      }
      this.detail = (res && res.data) || {};
      this.visible = !this.visible;
    },
    close() {
      this.visible = false;
    },
  },
};
</script>
