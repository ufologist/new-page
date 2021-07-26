<template>
<div class="index">
    <% if (router) { %>
    <router-view></router-view>
    <% } else { %>
    <h1 class="index__title"><%= pageTitle %></h1>
    <button type="button">按钮</button>
    <% } %>
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
<% if (!router) { %>
.index {
    &__title {
        font-size: 36px;
    }
}
<% } %>
</style>
