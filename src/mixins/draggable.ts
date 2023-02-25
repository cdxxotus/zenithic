import { Mixin } from '../types/mixins';

const draggable: Mixin = {
  data() {
    return {
      isDragging: false,
      dragX: 0,
      dragY: 0,
      initialX: 0,
      initialY: 0,
    };
  },
  methods: {
    handleMouseDown(event) {
      this.isDragging = true;
      this.initialX = event.clientX - this.dragX;
      this.initialY = event.clientY - this.dragY;
    },
    handleMouseMove(event) {
      if (this.isDragging) {
        event.preventDefault();
        this.dragX = event.clientX - this.initialX;
        this.dragY = event.clientY - this.initialY;
      }
    },
    handleMouseUp() {
      this.isDragging = false;
    },
  },
  mounted() {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  },
};

export default draggable;