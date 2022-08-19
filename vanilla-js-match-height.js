/**
 * Match the heights of elements
 * 
 *  new MatchHeight(CHILD_CLASS, PARENT_CLASS ( Optional ), BY_ROW ( Optional, Default to true ));
 */

 export default class MatchHeight {
    constructor(element, parent = null, byrow = true) {
        // The User Settings
        this.element = element;
        this.parent = parent ? document.querySelectorAll(parent) : document;
        this.byrow = byrow

        // Set up for later use
        this.elements = [];

        // Run on load
        window.addEventListener("load", () => {
            this.getParents();
        });
        
        // Run on Resize
        window.addEventListener("resize", () => {
            setTimeout(() =>  {
                if (this.elements) {
                    this.elements.forEach(elements => {
                        this.setLargestHeight(elements);
                    });
                }
            });
        });
    }


    // If a parent is provided use this to get the elements
    getParents() {
        if (this.parent.length) {
            this.parent.forEach(wrapper => {
                let childElements = wrapper.querySelectorAll(this.element);

                if (childElements.length) {
                    this.setRows(childElements);
                }
            });

        } else {
            let elements = document.querySelectorAll(this.element);
            
            if (elements.length) {
                this.setRows(elements);
            }
        }
    }

    // If rows are enabled then Match Height by Row
    setRows(elements) {
        if (this.byrow) {
            let groups = [];
            
            elements.forEach( element => {
                let offset = element.getBoundingClientRect().top + window.scrollY;
                groups[offset] = [];
            });

            elements.forEach(element => {
                let offset = element.getBoundingClientRect().top + window.scrollY;
                groups[offset].push(element);
            });

            groups.forEach(elements => {
                this.setLargestHeight(elements);
            });
        } else {
            this.setLargestHeight(elements);
        }
    }

    // Set the heights of the elements
    setLargestHeight(elements) {
        let heights = [];

        // Set to call on resize
        this.elements.push(elements);

        elements.forEach(element => {
            element.style.height = null;
            heights.push(element.offsetHeight);
        });
        
        let largest = Math.max.apply(Math, heights);

        elements.forEach(element => {
            element.style.height = largest + 'px';
        });
    }
}