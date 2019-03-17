<template>
    <label class="file-select m-0 d-flex flex-column justify-content-center text-center rounded-pill mx-auto">
        <span :class="icon" class="p-2"></span>

        <input type="file" @change="fileChanged" />
    </label>
</template>

<script>
export default {
    name: 'ButtonFile',

    props: {
        post: {
            type: String,
            default: null
        },

        name: {
            type: String,
            default: null
        },

        icon: {
            type: String,
            default: 'fas fa-plus'
        },

        submit: Boolean
    },

    data: () => ({
        file: null,
        changedOnce: false
    }),

    methods: {
        fileChanged(e) {
            this.file = e.target.files[0];
            this.file.url = URL.createObjectURL(this.file);

            if (!this.changedOnce) {
                this.changedOnce = true;
                this.$emit('changed-once', this.file);
            }

            this.$emit('changed', this.file);
        },

        submitFile() {
            if (!this.post || !this.name)
                return;
                
            let formData = new FormData();
            formData.append(this.name, this.file);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

                onUploadProgress: progressEvent => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.$emit('progress', progress);
                }
            };

            axios.post(this.post, formData, config).then(res => {
                this.$emit('completed', { success: true, response: res.data });

            }).catch(error => {
                this.$emit('completed', { success: false, response: error.response.data });
            });
        }
    },

    watch: {
        submit(value) {
            if (value === true)
                this.submitFile();
        }
    }
}
</script>

<style lang="scss" scoped>
    .file-select {
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        font-size: 1.5rem;
        transition: all 500ms;
        color: rgba(255,255,255,.8);
        background-color: rgba(0,0,0,.4);

        &:hover {
            color: rgba(255,255,255,1);
            background-color: rgba(0,0,0,.5);
        }

        > input[type="file"] {
            display: none;
        }
    }
</style>

