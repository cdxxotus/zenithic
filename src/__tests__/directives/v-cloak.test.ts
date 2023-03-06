import { createZenithic } from "../../../src";

let app;
let doc;
let mountPoint;

const Custom = {
  template: `<div v-cloak>Hello</div>`,
  data() {
    return {
      displayBeforeBeforeMount: null,
      displayBeforeMounted: null,
    };
  },
  beforeMount() {
    this.displayBeforeBeforeMount = this.$el.style.display;
  },
  mounted() {
    this.displayBeforeMounted = this.$el.style.display;
  },

//   TODO: we may need new lifecyle events
//   -----------
//   @ beforeMountAfterDirectivesAndMixins
//   @ mountedAfterDirectivesAndMixins
//   @ beforeDestroyAfterDirectivesAndMixins
//   @ destroyedAfterDirectivesAndMixins
//   ---- OR
//   an object of "lastCall" events to be executed at the end
//   Component = {
//     lastCall: {
//         beforeMount() {},
//         mounted() {},
//         beforeDestroy() {},
//         destroyed() {},
//     }
//   }
//   ---- OR
//   a property for setting execution order
//   Component = {
//     lifycleExecutionOrder: {
//         beforeMount: ["directive", "mixin", "component"],
//         mounted: ["component", "directive", "mixin"],
//         beforeDestroy: ["mixin", "directive", "component"],
//         destroyed: ["directive", "mixin", "component"],
//      }
//   }
//   ---- OR
//   a property for setting execution order of custom methods
//   Component = {
//     lifycleExecutionOrder: {
//         beforeMount: [method3, "directive", method4, "mixin", method1, method2],
//      }
//   }
};

beforeEach(() => {
  app = null;
  window.document.querySelector("body").innerHTML = "";
  app = createZenithic();
  doc = document.createElement("div");
  mountPoint = document.createElement("div");
  mountPoint.setAttribute("id", "app");
  doc.appendChild(mountPoint);
  window.document.getElementsByTagName("body")[0].appendChild(doc);
});

describe("v-cloak directive", () => {
  test("should not work if not set up in config", (callback) => {
    app = createZenithic({ directives: [] });

    app.mount("#app", Custom).then((mountedApp) => {
      expect(mountedApp.main.displayBeforeBeforeMount).toBe("");
      expect(mountedApp.main.displayBeforeMounted).toBe("");
      callback();
    });
  });

  test("should set display:none to the element until it's mouted", (callback) => {
    app = createZenithic();

    app.mount("#app", Custom).then((mountedApp) => {
      expect(mountedApp.main.displayBeforeBeforeMount).toBe("");
      expect(mountedApp.main.displayBeforeMounted).toBe("none");
      expect(mountedApp.main.$el.style.display).toBe("");
      callback();
    });
  });
});

export {};
