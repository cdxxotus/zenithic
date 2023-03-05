import { Mixin } from "../types/mixins";
import { querySelector } from "../utils/dom";

/**
 * This mixin prepare an element to be dragged around the screen.
 * @type {Mixin}
 */
const draggable: Mixin = {
  data() {
    return {
      isDragging: false,
      dragX: 0,
      dragY: 0,
      initialX: 0,
      initialY: 0,
      draggableHandle: null,
    };
  },
  methods: {
    /**
     * This function is called when the user clicks on the component.
     * It sets the initial coordinates of the component.
     * @param event The event object.
     */
    handleMouseDown(event) {
      this.isDragging = true;
      this.initialX = event.clientX - this.dragX;
      this.initialY = event.clientY - this.dragY;
    },
    /**
     * This function is called when the user moves the mouse.
     * It updates the coordinates of the component.
     * @param event The event object.
     */
    handleMouseMove(event) {
      if (this.isDragging) {
        event.preventDefault();
        this.dragX = event.clientX - this.initialX;
        this.dragY = event.clientY - this.initialY;
      }
    },
    /**
     * This function is called when the user releases the mouse.
     * It stops the dragging.
     */
    handleMouseUp() {
      this.isDragging = false;
    },
  },
  /**
   * This function is called when the component is mounted.
   * It adds event listeners to the document.
   */
  mounted() {
   const handle = this.draggableHandleSelector
      ? querySelector(this.draggableHandleSelector)
      : this.$el;

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
    handle.addEventListener("mousedown", this.handleMouseDown);
  },
  /**
   * This function is called when the component is destroyed.
   * It removes event listeners from the document.
   */
  beforeDestroy() {
    const handle = this.draggableHandleSelector
      ? querySelector(this.draggableHandleSelector)
      : this.$el;
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    handle?.removeEventListener(
      "mousedown",
      this.handleMouseDown
    );
  },
};

export default draggable;
