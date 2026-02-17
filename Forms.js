import data from './data.json' with{type:"json"}
import { createInputField, createForm, tbodyRenderRowspan, tbodyRenderColspan } from './functions.js'
import { Manager } from './manager.js';

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
     * @type {boolean}
     */
    #required;
    /**
     * @param {import('./functions').FormFieldType} formFieldObj 
     * @param {HTMLFormElement} parentForm 
     */
    constructor(formFieldObj, parentForm){
        const formFieldObjlocal = {
            "id" : formFieldObj.id,
            "name" : formFieldObj.name,
            "labelContent" : formFieldObj.label,
            "parent" : parentForm
        };
        const outObj = createInputField(formFieldObjlocal);
        this.#errorElement = outObj.errorElement;
        this.#input = outObj.input;
        this.#required = formFieldObj.required;
    }

    get getErrorElement(){
        return this.#errorElement;
    }

    get getInput(){
        return this.#input;
    }

    validate(){
        let result = true;
        if(this.#required && !this.#input.value){
            result = false;
            this.#errorElement.innerText = "Mező kitöltése kötelező!";
        }
        else{
            this.#errorElement.innerText = "";
        }
    }
}

class FormController{
    /**
     * @type {Manager}
     */
    #manager;
    /**
     * @type {FormField[]}
     */
    #fieldList;
    /**
     * @type {import('./functions.js').FormFieldType[]}
     */
    #formArray;
    constructor(formArray, manager){
        this.#fieldList = [];
        this.#formArray = formArray;
        this.#manager = manager;
        document.body.appendChild(createForm(this.createFields.bind(this), this.eventListener.bind(this)));
    }
    /**
     * 
     * @param {HTMLFormElement} parentForm parentform
     */
    createFields(parentForm){
        for (const formFieldObj of this.#formArray){
            this.#fieldList.push(new FormField(formFieldObj, parentForm));
        }
    }

    /**
     * 
     * @param {SubmitEvent} e 
     */
    eventListener(e){
        e.preventDefault();
        if (this.#manager.getRowspanos){
            if(this.validateFields()){
                /**
                 * @type {import('./functions.js').RowspanType}
                 */
                const rowObj = {
                    nemzet : this.#fieldList[0].getInput.value,
                    szerzo : this.#fieldList[1].getInput.value,
                    mu : this.#fieldList[2].getInput.value,
                    mu2 : this.#fieldList[3].getInput.value
                }
                this.#manager.addRow(this.#manager.getTable, rowObj, tbodyRenderRowspan);
                e.target.reset();
            }
        }
        else{
            if(this.validateFields()){
                /**
                 * @type {import('./functions.js').ColspanType}
                 */
                const rowObj = {
                    neve : this.#fieldList[0].getInput.value,
                    kor : this.#fieldList[1].getInput.value,
                    szerelme1 : this.#fieldList[2].getInput.value,
                    szerelme2 : this.#fieldList[3].getInput.value
                }
                console,console.log(rowObj);
                
                this.#manager.addRow(this.#manager.getTable, rowObj, tbodyRenderColspan);
                e.target.reset();
            }
        }
    }

    validateFields(){
        let result = true;
        for (const field of this.#fieldList) {
            if(!field.validate()){
                result = false;
            }
        }
        return result;
    }
}

export {FormController}