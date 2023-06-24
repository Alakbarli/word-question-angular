import { DialogActionTypes } from "../main/const/dialog-action-types";

export class UnitDialogData {
    constructor(id:number|null,name:string|null,actionType:DialogActionTypes) {
        this.unitId=id;
        this.unitName=name;
        this.actionType=actionType
    }
    unitId:number|null;
    unitName:string|null;
    actionType:DialogActionTypes;
}
