<template>
    <BackgroundComponent>
        <HeaderComponent />

        <div class="container text-white">
            <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider-color: #fff;">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active text-white" aria-current="page">Library</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-md-6">
                    <img src="https://via.placeholder.com/300x400" class="img-fluid" alt="Book Cover">
                </div>
                <div class="col-md-6">
                    <h3>Title</h3>
                    <p>Author</p>
                    <p>Description</p>
                    <button class="btn btn-primary">Mượn sách</button>
                </div>
            </div>
        </div>
    </BackgroundComponent>
</template>
<script>
import BackgroundComponent from '../components/Background.vue'
import HeaderComponent from '../components/Header.vue'
export default {
    name: 'BookDetail',
    components: {
        BackgroundComponent,
        HeaderComponent
    },

}
</script>