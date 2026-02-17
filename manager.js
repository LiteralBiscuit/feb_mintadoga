import { Table } from './table.js'
class Manager{
    /**
     * @type {HTMLTableElement}
     */
    #table;
    /**
     * @type {boolean}
     */
    #rowspanos;
    /**
     * 
     * @param {boolean} rowspanos rowspanos a table vagy nem
     */
    constructor(rowspanos){
        this.#table = new Table(rowspanos);
        this.#rowspanos = rowspanos;
    }
    get getRowspanos(){
        return this.#rowspanos;
    }
    get getTable(){
        return this.#table;
    }

    /**
     * @param {Table} table a táblázat amihez írunk
     * @param {import('./functions.js').RowspanType | import('./functions.js').ColspanType} data az sor object amit hozzáadunk a táblázathoz
     * @param {Function} callback a sort létrehozó function
     */
    addRow(table, data, callback){
        callback(table.getTbody, data);
    }
}

export {Manager}