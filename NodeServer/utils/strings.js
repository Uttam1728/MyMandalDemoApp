module.exports.IfNullOrEmptyOrBlankThan = (given_str,replaces_str) => {
    // console.log(given_str,replaces_str);
    // console.log("?",typeof given_str == 'undefined' || !given_str || !given_str.trim() ||given_str == 'undefined');
    if(typeof given_str == 'undefined' || !given_str || !given_str.trim() || given_str == 'undefined'){
        return replaces_str;
     }
     return given_str;
};
