import { Manager } from "./manager.js";
import { Table } from "./table.js";
import data from './data.json' with{type:"json"};
import { FormConroller } from "./Forms.js";
import { tbodyRenderColspan, tbodyRenderRowspan } from "./functions.js";

const colspanManager = new Manager();
const rowspanManager = new Manager();
const colspanTable = new Table(data.colspanHeaderArray, colspanManager);
const rowspanTable = new Table(data.rowspanHeaderArray, rowspanManager);

colspanTable.setAppendRow(tbodyRenderColspan);
rowspanTable.setAppendRow(tbodyRenderRowspan);

for (const colspanRowObj of data.colspanDataArr) {
    colspanManager.addRow(colspanRowObj);
}
for (const rowspanRowObj of data.rowspanTableArray) {
    rowspanManager.addRow(rowspanRowObj);
}

colspanManager.determineTableTypeCallbackSetter = determineTableType;
rowspanManager.determineTableTypeCallbackSetter = determineTableType;

const colspanForm = new FormConroller(data.colspanFormFieldList, colspanManager);
const rowSpanForm = new FormConroller(data.rowspanFormFieldList, rowspanManager);


function determineTableType (firstRowObj){
    if (firstRowObj.neve){
        return true;
    }
    else return false;
}