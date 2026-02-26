import { createForm, createInputField } from "./functions.js";
import { Manager } from "./manager.js";
class FormField{
    /**
     * @type {HTMLDivElement}
     */
    #errorDiv;
    /**
     * @type {boolean}
     */
    #required;
    /**
     * @type {HTMLInputElement}
     */
    #input;
    /**
     * @type {string}
     */
    #name;

    /**
     * 
     * @param {import("./functions").FormFieldType} formFieldObj 
     * @param {HTMLFormElement} parent 
     */
    constructor(formFieldObj, parentForm){
        const localObj = {
            id : formFieldObj.id,
            name : formFieldObj.name,
            labelContent : formFieldObj.label,
            parent : parentForm
        }
        const obj = createInputField(localObj);
        this.#errorDiv = obj.errorElement;
        this.#input = obj.input;
        this.#required = formFieldObj.required;
        this.#name = formFieldObj.name;
    }

    validate(){
        let result = true;
        if(this.#required && !this.#input.value){
            result = false;
            this.#errorDiv.innerText = "Kötelező";
        }
        else{
            this.#errorDiv.innerText = "";
        }
        return result;
    }

    get errorDiv(){
        return this.#errorDiv;
    }
    get inputValue(){
        return this.#input.value;
    }
    get name(){
        return this.#name;
    }
}

class FormConroller{
    /**
     * @type {FormField[]}
     */
    #formFieldArray;
    /**
     * @type {Manager}
     */
    #manager;
    /**
     * @type {HTMLFormElement}
     */
    #form;

    /**
     * 
     * @param {import("./functions").FormFieldType[]} formFieldObjs 
     * @param {Manager} manager 
     */
    constructor(formFieldObjs, manager){
        this.#formFieldArray = [];
        this.#manager = manager;
        /**
         * 
         * @param {HTMLFormElement} form 
         */
        const createFields = (form) => {
            for (const formFieldObj of formFieldObjs) {
                const formField = new FormField(formFieldObj, form);
                this.#formFieldArray.push(formField);
            }
        }
        /**
         * 
         * @param {SubmitEvent} e 
         */
        const eventListener = (e) =>{
            e.preventDefault();
            /**
             * @type {HTMLFormElement}
             */
            const form = e.target;
            const rowObj = this.validateFormAndCreateRowObj();
            if(rowObj){
                this.#manager.addRow(rowObj);
                form.reset();
            }
        }
        this.#form = createForm(createFields, eventListener);
        document.body.appendChild(this.#form);
    }

    /**
     * 
     * @returns {import("./functions").RowspanType | import("./functions").ColspanType | null}
     */
    validateFormAndCreateRowObj(){
        let result = {};
        let valid = true;
        for (const formField of this.#formFieldArray) {
            if(formField.validate()){
                result[formField.name] = formField.inputValue;
            }
            else{
                valid = false;
            }
        }
        if(valid){
            return result;
        }
        return null;
    }
}

export {FormConroller}