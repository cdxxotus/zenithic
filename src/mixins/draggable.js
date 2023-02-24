export default {
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

// This mixin can be used in any component that requires draggable functionality. The component should implement a template that includes the DOM element that will be draggable, and the component should include the draggable object as a mixin.

// For example:

// import draggable from './draggable.js';

// export default {
//  mixins: [draggable],
//  template: `
//      <div class="draggable" @mousedown="handleMouseDown" :style="{ transform: \translate(${dragX}px, ${dragY}px) }">
//          Draggable Element
//      </div>
// `,
// }
