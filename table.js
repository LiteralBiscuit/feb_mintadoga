import {createTableCell, tbodyRenderColspan, createTable, tbodyRenderRowspan} from './functions.js'
import data from './data.json' with{type:"json"}
class Table{
    #tbody;
    /**
     * @type {boolean}
     */
    constructor(isTableWithRowspan){
      if(isTableWithRowspan){
        this.#tbody = createTable(document.body, this.createRowspanHeader);
        this.createRowspanTbody(tbodyRenderRowspan);
      }
      else{
        this.#tbody = createTable(document.body, this.createColspanHeader);
        this.createColspanTbody(tbodyRenderColspan);
      }
    }
    get getTbody(){
        return this.#tbody;
    }

    /**
     * @type {import('./functions.js').HeaderCallback} 
     */
    createRowspanHeader(tr){
        for (const headerObj of  data.rowspanHeaderArray) {
            createTableCell("th", headerObj.name, tr);
        }
    }
    /**
     * @type {import('./functions.js').HeaderCallback} 
     */
    createColspanHeader(tr){
        for (const headerObj of  data.colspanHeaderArray) {
            const th = createTableCell("th", headerObj.name, tr);
            if (headerObj.colspan){
                th.colSpan = headerObj.colspan;
            }
        }
    }

    /**
     * @param {Function} render a function ami létrehozza a sort
     */
    createRowspanTbody(render){
        for (const rowObj of data.rowspanTableArray) {
            render(this.#tbody, rowObj);
        }
    }
    createColspanTbody(render){
        for (const rowObj of data.colspanDataArr) {
            render(this.#tbody, rowObj);
        }
    }
}

export {Table}