var Upper = function (a, b) {
    return a.toUpperCase()+" "+b.toUpperCase();
}


var Inner = function (func) {
    // get data from user or other external source
    var x = "Saketh";
    var y = "Macharla";
    return func(x, y);
}

console.log(Inner(Upper));  