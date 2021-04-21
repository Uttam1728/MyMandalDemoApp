export function IfNullOrEmptyOrBlankThan(given_str,replaces_str){
    if(typeof given_str == 'undefined' || !given_str || !given_str.trim() ){
        return replaces_str;
     }
     return given_str;
}