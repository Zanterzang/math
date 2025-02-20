const btns = document.getElementsByClassName("button");
const numbox = document.getElementById("numbox");
const cursor = document.getElementById("cursor");
const left = document.getElementById("left");
const right = document.getElementById("right");
const del = document.getElementById("del");
const ac = document.getElementById("ac");
let brackets = [];
let coords = [];
let curstr = "";
function clear() {
    numbox.textContent = "";
    numbox.appendChild(cursor)
}
ac.addEventListener("click", clear)
del.addEventListener("click", function() {
    if (numbox.textContent.indexOf("|") != -1) {
        let str = [numbox.textContent.slice(0, numbox.textContent.indexOf("|")), numbox.textContent.slice(numbox.textContent.indexOf("|")+1, numbox.textContent.length)];
        str[0] = str[0].slice(0, str[0].length-1);
        numbox.textContent = "";
        numbox.appendChild(document.createTextNode(str[0]));
        numbox.appendChild(cursor);
        numbox.appendChild(document.createTextNode(str[1]));
    }
})
left.addEventListener("click", function() {
    if (numbox.textContent.indexOf("|") != -1) {
        if (!(numbox.textContent[0]==="|")) {
            let n = numbox.textContent[numbox.textContent.indexOf("|")-1]+numbox.textContent.slice(numbox.textContent.indexOf("|")+1);
            numbox.textContent = numbox.textContent.slice(0, numbox.textContent.indexOf('|')-1);
            numbox.appendChild(cursor);
            numbox.appendChild(document.createTextNode(n));
        } else {
            numbox.textContent = numbox.textContent.slice(1);
            numbox.appendChild(cursor);
        }
    } else {
        if (Number(numbox.textContent)) {
            numbox.appendChild(cursor);
        } else {
            clear();
        }
    }
})
right.addEventListener("click", function() {
    if (numbox.textContent.indexOf("|")!=-1) {
        let n;
        let m;
        if (numbox.textContent.indexOf("|")==numbox.textContent.length-1) {
            n = numbox.textContent;
            numbox.textContent = "";
            numbox.appendChild(cursor);
            numbox.appendChild(document.createTextNode(n.slice(0, n.length-1)));
        } else {
            n = numbox.textContent.slice(0, numbox.textContent.indexOf("|")) + numbox.textContent.slice(numbox.textContent.indexOf("|")+1, numbox.textContent.indexOf("|")+2);
            m = numbox.textContent.slice(numbox.textContent.indexOf("|")+2);
            numbox.textContent = n;
            numbox.appendChild(cursor);
            numbox.appendChild(document.createTextNode(m));
        }
    } else {
        if(Number(numbox.textContent)) {
            n = numbox.textContent;
            clear();
            numbox.appendChild(document.createTextNode(n));
        } else {
            clear();
        }
    }
})
let calcs = [];
let colcs = "";
console.log(numbox.innerHtml)
for (var i in btns) {
    console.log(i);
    if (!((i === "length")||(i === "namedItem")||(i === "item")||(i==16)||(i==17))) {
        console.log(btns[i].textContent);
        btns[i].addEventListener("click", function() {
            if (numbox.textContent === "Syntax Error"||numbox.textContent === "Math Error"||numbox.textContent.replace("|", "") === "0"||numbox.textContent.replace("|", "") === "+") {
                clear();
            } else if (numbox.textContent.indexOf("|")==-1) {
                numbox.appendChild(cursor);
            }
            numbox.insertBefore(document.createTextNode(this.textContent), cursor)
        })
    }
}
document.getElementById("ac").addEventListener("click", function() {
    numbox.textContent = "";
    numbox.appendChild(cursor)
})
btns[17].addEventListener("click", calculate);
function calculate() {
    calcs = [["("]];
    colcs = numbox.textContent.replace("|", "")
    for (var c in colcs) {
        if (c==0) {
            if (1*colcs[c]==colcs[c]) {
                calcs.push(colcs[c]);
            } else if (colcs[c]==="*"||colcs[c]==="/"||colcs[c]===")") {
                numbox.textContent = "Syntax Error";
                console.log("here");
                return;
            } else if (colcs[c]==="-"||colcs[c]===["("]) {
                calcs.push(colcs[c])
            }
        } else {
            if (calcs[calcs.length-1] == 1*calcs[calcs.length-1]) {
                if (1*colcs[c]==colcs[c]) {
                    calcs[calcs.length-1] = calcs[calcs.length-1] + colcs[c];
                } else if (!(colcs[c]===["("])) {
                    calcs.push(colcs[c]);
                } else {
                    calcs.push("*")
                    calcs.push(colcs[c])
                }
            } else if (!(calcs[calcs.length-1]===[")"])) {
                if (1*colcs[c] == colcs[c]) {
                    if (calcs[calcs.length-1]==="-" && (!(Number(calcs[calcs.length-2])))) {
                        calcs[calcs.length-1] = calcs[calcs.length-1] + colcs[c];
                    } else {
                        calcs.push(colcs[c]);
                    }
                } else if (colcs[c]==="*"||colcs[c]==="/"||colcs[c]===[")"]) {
                    numbox.textContent = "Syntax Error";
                    console.log("here");
                    return;
                } else if (colcs[c]==="-") {
                    if (calcs[calcs.length-1]==="+") {
                        calcs[calcs.length-1] = "-";
                    } else if (calcs[calcs.length-1]==="-") {
                        calcs[calcs.length-1] = "+";
                    } else {
                        calcs.push("-");
                    }
                }
            } else {
                if (1*colcs[c] == colcs[c]||colcs[c]===["("]) {
                    calcs.push("*")
                }
                calcs.push(colcs[c]);
            }
        }
    }
    calcs.push([")"]);
    brackets = [];
    console.log(calcs)
    for (var i in calcs) {
        if (Array.isArray(calcs[i])||Array.isArray(calcs[i])) {
            brackets.push([calcs[i][0], i]);
        }
    }
    console.log(brackets)
    var order = 0;
    for (var b in brackets) {
        if (brackets[b][0]===")") {
            if (b==0) {
                numbox.textContent = "Syntax Error";
                console.log("here");
                return;
            }
            order++;
            var o = 1;
            for (o=1; o<=b; o++) {
                if (brackets[1*b-o][0]==="(" & brackets[1*b-o].length == 2) {
                    calcs[brackets[b][1]].push(order);
                    calcs[brackets[1*b-o][1]].push(order);
                    break;
                }
            }
            if (o>b) {
                numbox.textContent = "Syntax Error";
                console.log("here");
                return;
            }
            console.log(brackets);
        }
    }
    for (var i in calcs) {
        console.log(calcs[i])
        if ((Array.isArray(calcs[i]))&&!(calcs[i].length===2)) {
            numbox.textContent = "Syntax Error";
            console.log("here");
            return;
        }
    }
    coords = [];
    curstr = [];
    for (var i=1; i<=brackets.length/2; i++) {
        coords = [];
        for (var f in calcs) {
            if (Array.isArray(calcs[f])&&calcs[f][1]==i) {
                coords.push(f)
            }
        }
        curstr = calcs.slice(coords[0]+1, coords[1]);
        console.log(curstr);
        if (curstr.indexOf("*")!= -1) {
            while (curstr.indexOf("*") != -1) {
                if (!(curstr[curstr.indexOf("*")+1])||!(curstr[curstr.indexOf("*")-1])) {
                    numbox.textContent = "Syntax Error";
                    console.log("here");
                    return;
                }
                curstr.splice(curstr.indexOf("*")-1, 3, `${curstr[curstr.indexOf("*")-1]*curstr[curstr.indexOf("*")+1]}`);
                console.log(curstr);
            }
        }
        if (curstr.indexOf("/")!= -1) {
            console.log(curstr[curstr.indexOf("/")+1])
            while (curstr.indexOf("/") != -1) {
                if (!(curstr[curstr.indexOf("/")+1])||!(curstr[curstr.indexOf("/")-1])) {
                    numbox.textContent = "Syntax Error";
                    console.log("here");
                    return;
                } else if (curstr[curstr.indexOf("/")+1]==0) {
                    numbox.textContent = "Math Error";
                    return;
                }
                curstr.splice(curstr.indexOf("/")-1, 3, `${curstr[curstr.indexOf("/")-1]/curstr[curstr.indexOf("/")+1]}`);
                console.log(curstr);
            }
        }
        if (curstr.indexOf("+")!= -1) {
            console.log(curstr[curstr.indexOf("+")+1])
            while (curstr.indexOf("+") != -1) {
                if (!(curstr[curstr.indexOf("+")+1])||!(curstr[curstr.indexOf("+")-1])) {
                    numbox.textContent = "Syntax Error";
                    console.log(calcs);
                    console.log("here");
                    return;
                }
                curstr.splice(curstr.indexOf("+")-1, 3, `${1*curstr[curstr.indexOf("+")-1]+curstr[curstr.indexOf("+")+1]*1}`);
                console.log(curstr);
            }
        }
        if (curstr.indexOf("-")!= -1) {
            console.log(curstr[curstr.indexOf("-")+1])
            while (curstr.indexOf("-") != -1) {
                if (!(curstr[curstr.indexOf("-")+1])||!(curstr[curstr.indexOf("-")-1])) {
                    numbox.textContent = "Syntax Error";
                    console.log("here");
                    return;
                }
                curstr.splice(curstr.indexOf("-")-1, 3, `${1*curstr[curstr.indexOf("-")-1]-curstr[curstr.indexOf("-")+1]*1}`);
                console.log(curstr);
            }
        }
        console.log(calcs, coords[0], coords[1], coords[1]-coords[0]);
        calcs.splice(coords[0], coords[1]-coords[0]+1, curstr[0]);
        console.log(calcs);
    }
    numbox.textContent = calcs[0];
}
