import { Table } from './table.js'
class Manager{
    #rowspanTable;
    #colpanTable
    constructor(){
        this.#rowspanTable = new Table(true);
        this.#colpanTable = new Table(false);
    }

    /**
     * @param {object} table a táblázat amihez írunk
     * @param {import('./functions.js').RowspanType | import('./functions.js').ColspanType} data az sor object amit hozzáadunk a táblázathoz
     * @param {Function} callback a sort létrehozó function
     */
    addRow(table, data, callback){
        callback(table.getTbody(), data);
    }
}

export {Manager}