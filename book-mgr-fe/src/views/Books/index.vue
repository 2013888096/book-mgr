<template>
  <div>
    <a-card>
      <h2>图书列表</h2>
      <!-- 分割线 -->
      <a-divider />
      <space-between>
        <div class="search">
          <a-input-search v-model:value="keyword"
                          placeholder="根据书名搜索"
                          enter-button
                          @search="onSearch" />
          <a href="javascript:;"
             v-if="isSearch"
             @click="backAll">返回</a>
        </div>

        <a-button @click="show = true">添加一条</a-button>
      </space-between>
      <!-- :pagination="false" 关闭默认分页布局 -->
      <a-table :columns="columns"
               :pagination="false"
               :data-source="list">
        <template #publishDate="data">
          {{formatTimestamp(data.record.publishDate)}}
        </template>

        <template #count="data">
          <a href="javascript:;"
             @click="updateCount(1,data.record)">入库</a>
          {{data.record.count}}
          <a href="javascript:;"
             @click="updateCount(2,data.record)">出库</a>
        </template>

        <template #actions="record">
          <a href="javascript:;"
             @click="update(record)">编辑</a>
          <a href="javascript:;"
             @click="remove(record)">删除</a>
        </template>
      </a-table>

      <space-between style="margin-top:24px">
        <div></div>
        <a-pagination v-model:current="curPage"
                      :page-size="10"
                      :total="total"
                      @change="setPage" />
      </space-between>

    </a-card>
    <add-one v-model:show="show" />

    <update v-model:show="showUpdateModal"
            :book="curEditBook" />
  </div>
</template>
<script src="./index.jsx"/>
<style lang="scss" scoped>
@import "./index.scss";
</style>
