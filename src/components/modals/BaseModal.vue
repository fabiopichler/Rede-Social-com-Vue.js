<template>
    <transition name="modal">
        <div class="modal-mask">
            <div :class="wrapperClass" class="modal-wrapper">
                <div class="modal-container">
                    <slot name="body" />
                </div>

                <div class="modal-footer p-2">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'BaseModal',

    props: {
        wrapperClass: String
    },

    created() {
        this.bodyStyle = document.getElementsByTagName('body')[0].style;
        this.bodyStyle.overflow = 'hidden';
    },

    destroyed() {
        this.bodyStyle.overflow = 'visible';
    }
}
</script>

<style lang="scss">
    .modal-enter,
    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-wrapper,
    .modal-leave-active .modal-wrapper  {
        transform: scale(1.1);
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .3s ease;
    }

    .modal-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding-bottom: 35px;
        transition: all .3s ease;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    }

    .modal-container {
        overflow-y: auto;
        width: 100%;
        height: 100%;
    }

    .modal-footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        background-color: #f4f6f8;
    }
</style>

