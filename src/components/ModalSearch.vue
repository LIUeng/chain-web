<template>
  <span>
    <slot :open="open"></slot>
    <el-dialog
      :visible="visible"
      width="55%"
      title="查询结果"
      @close="close"
      append-to-body
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ detail.key || '' }}</span>
        </div>
        <!-- <div>{{ detail.data || '暂无数据' }}</div> -->
        <!-- <div v-html="detail.data || '暂无数据'"></div> -->
        <el-table :data="detail.data || []" style="width: 100%;">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="版本号" prop="version"></el-table-column>
          <el-table-column label="时间" prop="time"></el-table-column>
          <el-table-column label="数据" prop="data"></el-table-column>
        </el-table>
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
    // open() {
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
      // this.detail = JSON.parse((res && res.data) || "{}");
      this.visible = !this.visible;
    },
    close() {
      this.visible = false;
    },
  },
};
</script>
