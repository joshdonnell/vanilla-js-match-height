export default class MatchHeight {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      parent: options.parent ?? null,
      byRow: options.byRow ?? true,
      timeOut: options.timeOut ?? 50
    };
    this.elements = {};
    if (element) {
      window.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
          this.reset();
        }, this.options.timeout);
      });
      window.addEventListener("resize", () => {
        setTimeout(() => {
          this.update();
        }, 200);
      });
    } else {
      console.error("\u26D4 Missing class name in new MatchHeight()");
    }
  }
  findElements() {
    if (this.options.parent && document.querySelectorAll(this.options.parent).length) {
      document.querySelectorAll(this.options.parent).forEach((parentGroup) => {
        let elements = parentGroup.querySelectorAll(this.element);
        this.elements.push(elements);
        this.findRows(elements, parentGroup);
      });
    } else {
      let elements = document.querySelectorAll(this.element);
      this.elements.push(elements);
      this.findRows(elements);
    }
  }
  findRows(elements, parent = null) {
    if (elements.length) {
      let groupedHeights = [];
      elements.forEach((element) => {
        let offset = 0;
        if (this.options.byRow) {
          offset = Math.round(element.getBoundingClientRect().top + window.scrollY);
        }
        groupedHeights.push({
          "offset": offset,
          "parent": parent,
          "elements": {
            element
          }
        });
      });
      const map = new Map(groupedHeights.map(({ offset, elements: elements2 }) => [offset, { offset, elements: [] }]));
      for (let { offset, elements: elements2 } of groupedHeights)
        map.get(offset).elements.push(...[elements2].flat());
      this.setHeights([...map.values()]);
    }
  }
  setHeights(elements) {
    if (elements.length) {
      elements.forEach((group) => {
        let heights = [];
        group.elements.forEach((element) => {
          let item = element.element;
          item.style.height = null;
          heights.push(item.offsetHeight);
        });
        let largest = Math.max.apply(Math, heights);
        group.elements.forEach((element) => {
          element.element.style.height = largest + "px";
        });
      });
    }
  }
  update() {
    if (this.elements.length) {
      this.elements.forEach((group) => {
        this.findRows(group);
      });
    } else {
      console.error(`\u26D4 Can't trigger update as no elements found for the MatchHeight element ${this.element}`);
    }
  }
  reset() {
    this.elements = [];
    this.findElements();
  }
  debug() {
    setTimeout(() => {
      if (this.elements) {
        this.elements.forEach((group, index) => {
          console.log(this.element + " Group " + (index + 1));
          group.forEach((element) => {
            console.log(element);
          });
          console.log("\n\n");
        });
      } else {
        console.log(`\u26D4 No cached MatchHeight elements found for "${this.element}" 

 Make sure this element exists on the current page.`);
      }
    }, 500);
  }
}
