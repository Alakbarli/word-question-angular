import { DialogActionTypes } from "../main/const/dialog-action-types";

export class CommonDialogData<T> {
    constructor(action:DialogActionTypes,data:T|null=null){
        this.actionType=action;
        this.model=data as T;
    }
    model:T;
    actionType:DialogActionTypes
}
