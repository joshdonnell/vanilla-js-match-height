/**
 * Vanilla JS Match Height
 * 
 * v1.0.3
 * 
 * Josh Donnell
 * 
 * @class
 */

import { OptionsDefault, Options, IMatchHeight, MatchHeightItem, TemporaryRow } from './types';

const defaultOptions:Options = { 
  parent: null,
  byRow: true,
  timeOut: 50
}

class MatchHeight implements IMatchHeight  {
  element: string;
  elements: MatchHeightItem[];
  options: Options;  

  constructor(element: string, options: OptionsDefault = {}) {
    // Merge the default and the user options and set to the Options type
    this.options = {...defaultOptions, ...options} as Options;

    // Set the element
    this.element = element;

    // Check for class element
    if (this.element) {
      // Set heights on DOM load
      window.addEventListener("DOMContentLoaded", () => {
          setTimeout(() => {
              this.reset();
          }, this.options.timeOut);
      });

      // Update heights and rows on resize
      window.addEventListener("resize", () => {
          // Set a timeout to allow sliders and other JS to trigger first
          setTimeout(() => {
              this.update();
          }, 200);
      });
    } else {
      // Sent the no class error to the console
      this.error('class')
    }
  }


  /**
   * Find all elements from parent
   * or from gloal document and
   * cache for updates.
   */
  findElements() {
    // Set type
    let elementsInDom:NodeListOf<HTMLElement>;

    // Check if parent and if parent has elements
    if (this.options.parent && document.querySelectorAll(this.options.parent).length) {
      // Loop over to get the elements
      document.querySelectorAll(this.options.parent).forEach((parentGroup:HTMLElement) => {
        // Find all elements in parent group
        elementsInDom = parentGroup.querySelectorAll(this.element);

        // Create a group for each of the parents
        this.createGroup(elementsInDom, parentGroup);
      });
    } else {
      // Find elements in the global document
      elementsInDom = document.querySelectorAll(this.element);
      
      // Create a group by 
      this.createGroup(elementsInDom);
    }

    // find the rows based on the offset of the page
    this.findRows();    
  }


  /**
   * Groups rows by offset if set
   * when registering match height
   */
  findRows() {
    // Check for elements before continuing
    if (this.elements) {
      // Loop over each of the elements      
      this.elements.map((group) => {

        // Setup empty array to add sorted heights into
        let groupedHeights:TemporaryRow[] = [];
        
        //Loop over all single elements
        group.elements.forEach(element => {
          // Set a default offset to 0 to be used for grouping
          let offset = 0;

          // Check if ByRow is enabled, this is set to true by default
          if (this.options.byRow) {
            // Calculate the elements offset to the page
            offset = Math.round(element.getBoundingClientRect().top + window.scrollY);
          }
          
          // Gorup the elements by offset
          groupedHeights[offset] = groupedHeights[offset] ?? {
            offset: offset,
            elements: []
          };

          // Push the elements to the correct offset
          groupedHeights[offset].elements.push(element)
        });
        
        groupedHeights.map((row) => {
          group.rows.push({
            height: 0,
            offset: row.offset,
            elements: row.elements,
          })
        });
      });
      
      // Set the heights for the groups
      this.setHeights()
    }
  }


  /**
   * Create group from elements and a parent
   * also set the data back to the elements array
   * 
   * @param {Array} elements
   * @param {Element} parent
   */

  createGroup(elements:NodeListOf<HTMLElement>, parent?:HTMLElement) {
    // Put to the cache to be used for updates
    let group:MatchHeightItem = {
      elements: elements,
      rows: [],
      parent: parent
    }

    this.elements.push(group);
  }


  /**
   * Set the largest heights in our 
   * groups of elements.
   * 
   */
  setHeights() {
    //Check to make sure we have an elements
    if (this.elements) {
      // Loop over each of the elements instances
      for (let group of this.elements) {

        // Add the height for elements in the row
        group.rows.map((row) => {
          // Set a temp array for the heights
          let heights = [];

          row.elements.forEach((element) => {
            // Remove any set heights to calcualte the raw height
            element.style.height = null

            // Get the height and push into the heights array
            heights.push(element.offsetHeight);
          });

          // Set the heights to the max height
          row.height = Math.max.apply(Math, heights);

          // Apply the max height
          row.elements.forEach(element => {
            element.style.height = `${row.height}px`
          })
        });
      }
    } else {
      this.error()
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
      // Reset the rows
      this.findRows();
    } else {
      // Log an error if no elements can be found in the cache.
      this.error()
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
          if (group.parent) {
            console.log(`Element: ${this.element} Parent: ${group.parent.tagName}.${group.parent.className}`);
          } else {
            console.log(`Element: ${this.element}`);
          }

          group.rows.forEach((row, index) => {
            // Log a list of the cached elements
            console.log(`Offset Group: ${row.offset}`);
            console.log(row);
          });
          console.log('\n\n');
      });
      } else {
        // Log an error if no cached elements can be found.
        console.log(`⛔ No cached MatchHeight elements found for "${this.element}" \n\n Make sure this element exists on the current page.`);
      }
    }, this.options.timeOut + 250);
  }


  /**
   * Basic function to log the current cache
   * for the class. Can be useful if you are facing an issue.
   * 
   * @param {string} type
   */
  error(type:string = '') {
    // Log Error if no class found

    if (type == 'class') {
      console.error('⛔ Missing class name in new MatchHeight()');
    } else {
      console.error(`⛔ Can't trigger update as no elements found for the MatchHeight element ${this.element}`);
    }
  }
}


// Export to use our MatchHeight class
export default MatchHeight;