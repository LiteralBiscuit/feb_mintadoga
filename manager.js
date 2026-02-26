/**
 * @callback addCallback
 * @param {import("./functions").ColspanType | import("./functions").RowspanType}
 * @returns {void}
 * @callback determineTableTypeCallback
 * @param {import("./functions.js").ColspanType | import("./functions").RowspanType} firstRowObj
 * @returns {boolean} true ha colspan
 */
class Manager{
    /**
     * @type {addCallback}
     */
    #addCallback;
    /**
     * @type {import("./functions").RowspanType[] | import("./functions").ColspanType[]}
     */
    #dataArray;
    /**
     * @type {determineTableTypeCallback}
     */
    #determineTableTypeCallbackSetter;

    /**
     * 
     * @param {determineTableTypeCallback} determineTableTypeCallback 
     */
    constructor(){
        this.#dataArray = [];
    }

    /**
     * @param {addCallback} callback 
     */
    set addCallback(callback){
        this.#addCallback = callback;
    }

    /**
     * @param {determineTableTypeCallback} callback 
     */
    set determineTableTypeCallbackSetter(callback){
        this.#determineTableTypeCallbackSetter = callback;
    }
    /**
     * 
     * @returns {boolean}
     */
    determineTableType(){
        return this.#determineTableTypeCallbackSetter(this.#dataArray[0]);
    }

    /**
     * 
     * @param {import("./functions").ColspanType | import("./functions").RowspanType} rowObj 
     */
    addRow(rowObj){
        this.#dataArray.push(rowObj);
        if(this.#addCallback){
            this.#addCallback(rowObj);
        }
    }
}
export {Manager}