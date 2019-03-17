<template>
    <base-modal wrapper-class="edit-profile-wrapper" @close="$emit('close')">
        <div slot="body">
            <div class="edit-profile-header">
                <div :style="{ backgroundImage: `url('${userData.cover_alt}')` }" class="ep-cover background-cover position-relative">
                    <div class="d-flex flex-column justify-content-center position-absolute text-center w-100 h-100">
                        <ButtonFile
                            @changed-once="coverChangedOnce"
                            @changed="processFileCover"
                            @progress="updateProgress"
                            @completed="coverCompleted"
                            :submit="submitCover"
                            post="/ajax/cover"
                            name="image"
                        />
                    </div>

                    <div :style="{ backgroundImage: `url('${userData.avatar_alt}')` }" class="ep-avatar background-cover position-absolute rounded-circle">
                        <div class="d-flex flex-column justify-content-center text-center w-100 h-100">
                            <ButtonFile
                                @changed-once="avatarChangedOnce"
                                @changed="processFileAvatar"
                                @progress="updateProgress"
                                @completed="avatarCompleted"
                                :submit="submitAvatar"
                                post="/ajax/avatar"
                                name="image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <form class="p-3">
                <div v-show="showProgressBar" class="progress mb-3">
                    <div :style="{ width: `${progress}%` }" class="progress-bar progress-bar-striped bg-info progress-bar-animated">{{ progress }}%</div>
                </div>

                <div class="form-group m-0">
                    <label class="w-100 mb-1">Nome:
                        <input v-model="userData.name" type="text" class="form-control" placeholder="Adiocione seu nome">
                    </label>

                    <div class="text-right">
                        <small class="form-text text-muted">{{ userData.name.length }}/30</small>
                    </div>
                </div>

                <div class="form-group m-0">
                    <label class="w-100 mb-1">Bio:
                        <textarea v-model="userData.bio" class="form-control" rows="2" placeholder="Adicione sua biografia"></textarea>
                    </label>

                    <div class="text-right">
                        <small class="form-text text-muted">{{ userData.bio.length }}/260</small>
                    </div>
                </div>

                <div class="form-group m-0">
                    <label class="w-100 mb-1">Localização:
                        <input v-model="userData.locality" type="text" class="form-control" placeholder="Adicione sua localização">
                    </label>

                    <div class="text-right">
                        <small class="form-text text-muted">{{ userData.locality.length }}/30</small>
                    </div>
                </div>

                <div class="form-group m-0">
                    <label class="w-100 mb-1">Site:
                        <input v-model="userData.website" type="text" class="form-control" placeholder="Adicione seu site">
                    </label>

                    <div class="text-right">
                        <small class="form-text text-muted">{{ userData.website.length }}/80</small>
                    </div>
                </div>
            </form>
        </div>

        <div slot="footer">
            <button class="btn btn-sm btn-info rounded-pill" @click="$emit('close')">Cancelar</button>
            
            <button v-on:click="submit()" class="ml-1 btn btn-sm btn-info rounded-pill">Enviar</button>
        </div>
    </base-modal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import ButtonFile from '@/components/buttons/ButtonFile.vue';

export default {
    name: 'TheEditProfileModal',

    components: {
        BaseModal,
        ButtonFile
    },
    
    props: {
        user: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            progress: 0,
            showProgressBar: false,
            currentProgress: 0,
            progressLen: 100,
            submitCover: false,
            submitAvatar: false,
            userData: _.clone(this.user),
            actions: []
        }
    },

    created() {
        this.actions.push({
            exec: () => { setTimeout(() => window.location.reload(), 500); }
        })

        this.actions.push({
            exec: this.submitInfo
        })
    },

    methods: {
        coverChangedOnce() {
            this.actions.push({
                exec: () => { this.submitCover = true; }
            })
        },

        avatarChangedOnce() {
            this.actions.push({
                exec: () => { this.submitAvatar = true; }
            })
        },

        processFileCover(file) {
            this.userData.cover = file.url;
        },

        processFileAvatar(file) {
            this.userData.avatar = file.url;
        },

        updateProgress(progress) {
            this.currentProgress += progress;
            this.progress = Math.round(this.currentProgress / this.progressLen);
        },

        submit() {
            this.showProgressBar = true;
            this.progressLen = this.actions.length - 1;
            this.nextAction();
        },

        nextAction() {
            if (this.actions.length == 0)
                return;
            
            const index = this.actions.length - 1;
            this.actions[index].exec();
            this.actions.splice(index, 1);
        },

        submitInfo() {
            const config = {
                onUploadProgress: progressEvent => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.updateProgress(progress);
                }
            };

            axios.put('/info', {
                name: this.userData.name,
                bio: this.userData.bio,
                locality: this.userData.locality,
                website: this.userData.website

            }, config).then(res => {
                this.nextAction();

            }).catch(err => {
                console.log(err.response.data);
            });
        },

        coverCompleted(e) {
            this.nextAction();
        },

        avatarCompleted(e) {
            this.nextAction();
        }
    }
}
</script>

<style lang="scss">
    @media screen and (min-width: 576px) {
        .edit-profile-wrapper {
            max-width: 500px;
            max-height: 600px;
        }
    }

    .edit-profile-header {
        .ep-cover {
            height: 240px;
        }

        .ep-avatar {
            width: 100px;
            height: 100px;
            border: 3px solid white;
            bottom: 20px;
            left: 20px;
        }
    }
</style>

