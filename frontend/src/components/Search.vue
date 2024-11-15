<template>
    <div class="mb-3">
        <input type="text" class="form-control" :placeholder="placeholder" v-model="searchTerm"
            @input="$emit('search', searchTerm)">
    </div>
</template>

<script>
export default {
    name: 'SearchComponent',
    props: {
        placeholder: {
            type: String,
            default: 'Tìm kiếm...'
        }
    },
    data() {
        return {
            searchTerm: ''
        }
    }
}
</script>