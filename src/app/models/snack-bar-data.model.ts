import { SnackBarTypes } from "../main/const/snack-bar-types";

export class SnackBarData {
    constructor(message:string,actionType:SnackBarTypes,actionMessage?:string|null) {
        this.message=message;
        this.actionType=actionType;
        this.actionMessage=actionMessage;
    }
    message:string;
    actionType:SnackBarTypes;
    actionMessage:string|null|undefined;
}
