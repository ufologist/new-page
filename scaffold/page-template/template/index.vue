<template>
<div class="index">
    <h1 class="index__title"><%= pageTitle %></h1>
    <button type="button">按钮</button>
</div>
</template>

<script>
export default {
    data: function() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="less" scoped>
.index {
    &__title {
        font-size: 36px;
    }
}
</style>
