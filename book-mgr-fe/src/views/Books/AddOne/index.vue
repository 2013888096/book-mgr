<template>
  <div>
    <a-modal title="添加书籍"
             :visible="props.show"
             @ok="submit"
             @cancel="close">

      <!-- // 书名
    name:String,
    // 价格
    price:Number,
    // 分类
    classify:String,
    // 作者
    author:String,
    // 出版日期
    publishDate:String, -->
      <a-form :model="form"
              :label-col="{span:'6'}">
        <a-form-item label="书名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number :min="0"
                          :max="9999999999"
                          v-model:value="addForm.price" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="addForm.author" />
        </a-form-item>
        <a-form-item label="出版日期">
          <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script src="./index.js" />
