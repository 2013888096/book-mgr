<template>
  <div>
    <a-card>
      <h2>图书列表</h2>
      <!-- 分割线 -->
      <a-divider />
      <space-between>
        <div class="search">
          <a-input-search v-model:value="value"
                          placeholder="根据书名搜索"
                          enter-button />
        </div>

        <a-button @click="show = true">添加一条</a-button>
      </space-between>
      <a-table :columns="columns"
               :data-source="list">
        <template #publishDate="data">
          {{formatTimestamp(data.record.publishDate)}}

        </template>

      </a-table>

    </a-card>
    <add-one v-model:show="show"></add-one>
  </div>
</template>
<script src="./index.js"/>
<style lang="scss" scoped>
@import "./index.scss";
</style>
