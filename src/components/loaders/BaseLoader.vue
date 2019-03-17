<template>
    <div>
        <template v-if="!contents || contents.length < 1">
            <div class="loader-card card mb-2">
                <div class="card-body d-flex flex-column justify-content-center position-absolute text-center w-100 h-100">
                    <div v-if="!loaded">
                        <div class="spinner-border text-secondary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>

                    <div v-else>
                        Nada para ver aqui!
                    </div>
                </div>
            </div>
        </template>

        <div v-else :class="classContainer">
            <div v-for="content in contents" :key="content.id" :class="classVFor">
                <slot :content="content" :delete-row="deleteRow" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseLoader',
    
    props: {
        section: {
            type: String,
            required: true
        },

        id: {
            type: String,
            required: true
        },

        classVFor: String,
        classContainer: String,
    },
    
    data: () => ({
        contents: [],
        loaded: false
    }),

    created() {
        this._section = this.section;
        this.page = 1;
        this.requesting = false;
        this.endOfPages = false;
        this.handleScroll = this.handleScroll.bind(this);
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.request();
    },

    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        load(section) {
            this.page = 1;
            this.endOfPages = false;
            this.request(section);
        },

        deleteRow(url, id) {
            axios.delete(url, { params: { id } }).then(res => {
                if (res.data.is_deleted) {
                    const index = this.contents.map(x => {
                        return x.id;
                    }).indexOf(res.data.id);

                    this.contents.splice(index, 1);
                }
            }).catch(err => {
                console.log(err, err.response);
            });
        },

        request(section = null) {
            if (this.endOfPages || this.requesting)
                return;
            
            this.requesting = true;

            if (section)
                this._section = section;

            axios.get(`/list/${this.id}/${this._section}/?page=${this.page}`).then(res => {
                this.loaded = true;
                let data = res.data.data;

                if (data != undefined) {
                    if (this.page == 1)
                        this.contents = data;
                    else
                        this.contents = this.contents.concat(data);
                    
                    ++this.page;
                } else {
                    if (this.page == 1)
                        this.contents = [];
                    
                    this.endOfPages = true;
                }

                this.requesting = false;
            }).catch(err => {
                console.log(err);
            });
        },
        
        handleScroll(e) {
            if ((window.innerHeight + window.scrollY) >= (this.$el.offsetHeight - 100) && !this.requesting)
                this.request();
        }
    }
}
</script>

<style lang="scss">
    .loader-card {
        min-height: 200px;
    }
</style>
