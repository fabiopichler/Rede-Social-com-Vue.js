<template>
    <base-modal wrapper-class="tweet-wrapper" @close="$emit('close')">
        <div slot="body">
            <div class="card-header p-3">
                <TitleWithIcon title="Novo Tweet" icon="fas fa-plus-circle" class="m-0" />
            </div>

            <div class="p-0">
                <div class="form-group m-0">
                    <textarea v-model="tweet.content" class="form-control border-0" rows="5" placeholder="O que está acontecendo?"></textarea>
                </div>

                <hr class="m-0">

                <div class="media d-flex flex-column justify-content-center p-2">
                    <div v-if="!tweet.imageurl && !tweet.url" class="d-flex mx-auto">
                        <ButtonFile
                            @changed="imageChanged"
                            icon="far fa-image"
                        />

                        <div class="mr-2"></div>

                        <ButtonFile
                            @changed="imageChanged"
                            icon="far fa-image"
                        />
                    </div>

                    <div v-else>
                        <img v-if="tweet.imageurl" :src="tweet.imageurl" class="image border rounded">

                        <div v-else-if="tweet.url" class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item background-cover" :src="tweet.url" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div slot="footer">
            <small class="text-muted mr-2">Caracteres restantes: {{ 520 - tweet.content.length }}</small>
            <button class="btn btn-sm btn-info rounded-pill" @click="$emit('close')">Cancelar</button>
            <button v-on:click="submit()" class="ml-1 btn btn-sm btn-info rounded-pill">Enviar</button>
        </div>
    </base-modal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import TitleWithIcon from '@/components/TitleWithIcon.vue';
import ButtonFile from '@/components/buttons/ButtonFile.vue';

export default {
    name: 'TheTweetModal',

    components: {
        BaseModal,
        TitleWithIcon,
        ButtonFile
    },

    data: () => ({
        progress: 0,
        currentProgress: 0,
        progressLen: 100,
        
        tweet: {
            content: '',
            url: '',
            imageurl: ''
        }
    }),

    methods: {
        imageChanged(file) {
            this.tweet.imageurl = file.url;
        },

        updateProgress(progress) {
            this.currentProgress += progress;
            this.progress = Math.round(this.currentProgress / this.progressLen);
        },

        submit() {
            this.progressLen = this.actions.length - 1;
            
        },

        submitInfo() {
            const config = {
                onUploadProgress: progressEvent => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.updateProgress(progress);
                }
            };

            axios.put('/info', {
                
            }, config).then(res => {

            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss">
    .tweet-wrapper {
        @media screen and (min-width: 576px) {
            max-width: 480px;
            max-height: 360px;
        }

        .media {
            min-height: 120px;
        }

        .image {
            width: 100%;
        }

        textarea {
            resize: none;
        }
    }
</style>

