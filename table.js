/**
 * @callback addrowCallback
 * @param {HTMLTableSectionElement} tbody
 * @param {import("./functions").ColspanType | import("./functions").RowspanType} rowObj
 * @returns {void}
 */
import { createTable, createTableCell } from "./functions.js";
import { Manager } from "./manager.js";
class Table{
    /**
     * @type {Manager}
     */
    #manager;
    /**
     * @type {HTMLTableSectionElement}
     */
    #tbody;
    
    /**
     * 
     * @param {import("./functions").HeaderArrayType} headerArray 
     * @param {Manager} manager  
     */
    constructor(headerArray, manager){
        this.#manager = manager;
        const createHeader = (tr) =>{
            for (const headerObj of headerArray) {
                createTableCell("th", headerObj.name, tr);
            }
        }
        this.#tbody = createTable(document.body, createHeader);
    }

    /**
     * @param {addrowCallback} addrowCallback
     */
    setAppendRow(addrowCallback){
        this.#manager.addCallback = (rowObj) => addrowCallback(this.#tbody, rowObj);
    }
}

export {Table}