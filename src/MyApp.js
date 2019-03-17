
export default Object.freeze({
    name: 'Tweeter',
    version: '0.0.1',

    updateTitle(title) {
        document.title = title ? `${title} | ${this.name}` : this.name;
    },

    helpers: {
        
    }
});