export { } 
declare global {
interface String {
    isEmpty(this:string|null|undefined): boolean;
    toLowerAz(this:string): string;
    toUpperAz(this:string): string;
}
}
String.prototype.isEmpty = function (this:string|undefined|null): boolean  {
    return this&&(this || '').trim().length? false : true;
}
String.prototype.toLowerAz = function (this:string): string  {
    let lowered=this;
    if(this){
        lowered =lowered.replace(/i/g,"İ");
        lowered =lowered.replace(/ı/g,"I");
        lowered=lowered.toLowerCase();
      }
      return lowered;
}
String.prototype.toUpperAz = function (this:string): string  {
    let uppered=this;
    if(uppered){
        uppered =uppered.replace(/i/g,"İ");
        uppered =uppered.replace(/ı/g,"I");
        uppered=uppered.toUpperCase();
      }
      return uppered;
}