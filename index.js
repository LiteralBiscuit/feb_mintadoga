import { FormController } from "./Forms.js";
import { Manager } from "./manager.js";
import data from './data.json' with{type:"json"}
const manager1 = new Manager(true);
const manager2 = new Manager(false);
const form1 = new FormController(data.rowspanFormFieldList, manager1);
const form2 = new FormController(data.colspanFormFieldList, manager2);