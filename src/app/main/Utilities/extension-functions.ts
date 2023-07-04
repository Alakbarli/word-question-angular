export { } 
declare global {
interface String {
    isEmpty(this:string|null|undefined): boolean;
}
}
String.prototype.isEmpty = function (this:string|undefined|null): boolean  {
    console.log(this)
    return this&&(this || '').trim().length? false : true;
}