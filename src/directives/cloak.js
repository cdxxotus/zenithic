export default {
    bind(el, binding) {
        // Set the element's content to be hidden until it's rendered
        el.style.display = 'none'
    },
    mounted() {
        // Show the element once it's been rendered
        el.style.display = ''
    }
}