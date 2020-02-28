<template>
<div class="home">
    <h1 class="home__title"><%= pageTitle %></h1>
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
.home {
    &__title {
        font-size: 36px;
    }
}
</style>