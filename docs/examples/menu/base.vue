<template>
    <els-row>
        <els-col>
            <els-menu width="200" >
                <els-menu-item index="1">菜单1</els-menu-item>
                <els-menu-item index="2">菜单2</els-menu-item>
                <els-sub-menu title="菜单3">
                    <els-menu-item index="3">菜单3-1</els-menu-item>
                    <els-menu-item index="4">菜单3-2 </els-menu-item>
                </els-sub-menu>
            </els-menu>
        </els-col>
        <els-col>
            <els-menu mode="horizontal"  active-text-color="#ffd04b" background-color="#545c64"
                class="el-menu-vertical-demo" default-active="2" text-color="#fff">
                <els-menu-item index="1">菜单1</els-menu-item>
                <els-menu-item index="2">菜单2</els-menu-item>
                <els-sub-menu title="菜单3">
                    <els-menu-item index="3">菜单3-1</els-menu-item>
                    <els-menu-item index="4">菜单3-2 </els-menu-item>
                </els-sub-menu>
            </els-menu>
        </els-col>
    </els-row>
</template>