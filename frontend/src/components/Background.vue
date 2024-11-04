<template>
    <div class="bg-img">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "BackgroundComponent",
}
</script>
<style scoped>
.bg-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    background-image: url(../assets/img/pexels-photo-694740.jpeg);

}

.bg-img::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.bg-img>* {
    position: relative;
    z-index: 2;
}
</style>