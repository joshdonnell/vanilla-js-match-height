/**
 * Vanilla JS Match Height
 * 
 * v0.2.2
 * 
 * Josh Donnell
 * 
 * @class
 */
 export default class MatchHeight {

    /**
     * Init
     * 
     * @param {String} element 
     * @param {String} parent 
     * @param {Boolean} byrow 
     */
    constructor(element, parent = null, byrow = true, timeout = 0 ) {
        // User settings Passed in at setup
        this.element = element;
        this.parent = parent;
        this.byrow = byrow;
        this.timeout = timeout;

        // Setup to cache our elements & parents
        this.elements = {};

        // Check for class element
        if (element) {
            // Set heights on DOM load
            window.addEventListener("DOMContentLoaded", () => {
                setTimeout(() => {
                    this.reset();
                }, this.timeout);
            });

            // Update heights and rows on resize
            window.addEventListener("resize", () => {
                // Set a timeout to allow sliders and other JS to trigger first
                setTimeout(() => {
                    this.update();
                }, 200);
            });
        } else {
            // Log Error if no class found
            console.error('⛔ Missing class name in new MatchHeight()');
        }
    }


    /**
     * Find all elements from parent
     * or from gloal document and
     * cache for updates.
     */
    findElements() {
        // Check if parent and if parent has elements
        if (this.parent && document.querySelectorAll(this.parent)) {
            // Loop over to get the elements
            document.querySelectorAll(this.parent).forEach(parentGroup => {
                // Find all elements in parent group
                let elements = parentGroup.querySelectorAll(this.element);

                // Put to the cache to be used for updates
                this.elements.push(elements);

                // Find rows and pass elemenets over
                this.findRows(elements, parentGroup);
            });
        } else {
            // Find elements in the global document
            let elements = document.querySelectorAll(this.element);

            // Put to the cache to be used for updates
            this.elements.push(elements);

            // Find rows and pass elemenets over
            this.findRows(elements);
        }
    }


    /**
     * Groups rows by offset if set
     * when registering match height
     * 
     * @param {Array} elements 
     * @param {String} parent 
     */
    findRows(elements, parent = null) {
        // Check for elements before continuing
        if (elements.length) {
            // Setup empty array to add sorted heights into
            let groupedHeights = [];

            // Loop over all elements
            elements.forEach(element => {
                // Set a default offset to 0 to be used for grouping
                let offset = 0;

                // Check if ByRow is enabled, this is set to true by default
                if (this.byrow) {
                    // Calculate the elements offset to the page
                    offset = Math.round(element.getBoundingClientRect().top + window.scrollY);
                }

                // Push an object of each element to the groupedHeights array
                groupedHeights.push({
                    "offset": offset,
                    "parent": parent,
                    "elements" : {
                        element
                    }
                })
            });

            // Map the array to merge offsets of the same values
            const map = new Map(groupedHeights.map(({offset, elements}) => [offset, { offset, elements: [] }])); 

            // Loop to push elements into one object
            for (let {offset, elements} of groupedHeights) map.get(offset).elements.push(...[elements].flat());

            // Set the heights for each group
            this.setHeights([...map.values()]);
        }
    }


    /**
     * Set the largest heights in our 
     * groups of elements.
     * 
     * @param {Array} elements 
     */
    setHeights(elements) {
        // Check to make sure we have an array of elements
        if (elements.length) {
            // Loop over each of our groups
            elements.forEach(group => {
                // Set an empety array to push heights into
                let heights = [];

                // Loop over each group to set the height of each element
                group.elements.forEach(element => {
                    // Set the element
                    let item = element.element;

                    // Set the height to default
                    item.style.height = null;

                    // Get the height and push into the heights array
                    heights.push(item.offsetHeight);
                })

                // Find the largest value in the heights array
                let largest = Math.max.apply(Math, heights);

                // Set the largest height value to the other elements
                group.elements.forEach(element => {
                    element.element.style.height = largest + 'px';
                });
            });
        }
    }


    /**
     * Function used to trigger updades,
     * these can be triggered manually or
     *  are already set to run on resize
     */
    update() {
        // Check for elements and trigger heights update
        if (this.elements.length) {
            // Loop over each group set in the cache
            this.elements.forEach(group => {
                // Re find the rows based of offset
                this.findRows(group);
            })
        } else {
            // Log an error if no elements can be found in the cache.
            console.error(`⛔ Can't trigger update as no elements found for the MatchHeight element ${this.element}`);
        }
    }


    /**
     * Reset all heights and refind groups and rows
     * for all the elements in the group.
     * This is best to be used when updating the 
     * content of a page as the prevoius values
     * will be cached in out elements object.
     */
    reset() {
        // Bust the elements cache back to empty
        this.elements = [];

        // Find the elements from the assigned class and parent
        // and refind rows and set the heights again.
        this.findElements();
    }


    /**
     * Basic function to log the current cache
     * for the class. Can be useful if you are facing an issue.
     */
    debug() {
        // Set a Timeout to allow cache to be set
        setTimeout(() => {
            // Check to make sure we have the cached elements
            if (this.elements) {
                // Loop over elements
                this.elements.forEach((group, index) => {
                    // Tell the console there is a new group
                    console.log(this.element + ' Group ' + (index + 1));

                    group.forEach(element => {
                        // Log a list of the cached elements
                        console.log(element);
                    });
                    console.log('\n\n');
                });
            } else {
                // Log an error if no cached elements can be found.
                console.log(`⛔ No cached MatchHeight elements found for "${this.element}" \n\n Make sure this element exists on the current page.`);
            }
        }, 500);
    }
}