<template>
  <div class="space-between">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.space-between {
  display: flex;
  justify-content: space-between;
  height: 50px;
}
</style>
