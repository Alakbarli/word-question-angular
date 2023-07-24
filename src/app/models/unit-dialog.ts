import { DialogActionTypes } from "../main/const/dialog-action-types";

export class UnitDialogData {
    constructor(name:string|null,actionType:DialogActionTypes) {
        this.unitName=name;
        this.actionType=actionType
    }
    unitName:string|null;
    actionType:DialogActionTypes;
}
