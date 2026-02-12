import data from './data.json' with{type:"json"}
import { createInputField, createForm } from './functions.js'

class FormField{
    /**
     * @type {HTMLElement}
     */
    #errorElement;
    /**
     * @type {HTMLLIElement}
     */
    #input;
    /**
     * @param {import('./functions').FormFieldType} formFieldObj 
     */
    constructor(formFieldObj){
        const outObj = createInputField(formFieldObj);
        this.#errorElement = outObj[0];
        this.#input = outObj[1];
    }

    get getErrorElement(){
        return this.#errorElement;
    }

    get getInput(){
        return this.#input;
    }
}

class FormController{
    #fieldList;
    constructor(){
        this.#fieldList = [];

    }
    /**
     * 
     * @param {HTMLFormElement} parentForm parentform
     */
    createFields(parentForm){
        for (const formField of data.colspanFormFieldList){
            const field = new FormField(formField);
            this.#fieldList.push(field);
            //to be continued
        }
    }
}