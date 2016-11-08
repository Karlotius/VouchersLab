function stringFunctions() {
    debugger;
    
    //Template Literals
    var productID = 100;
    var category = "music";
    var url = "http://server/" + category + "/" + productID; //old way
    console.log(url);
    var tl = `http://server/${category}/${productID}`; //template literal
    console.log(tl);

    //startswith
    var str = 'To be, or not to be, that is the question.';
    console.log(str.startsWith('To be'));       // true
    console.log(str.endsWith('question.'));     // true

    function countString(ts) {
        const characters = ["a", "b", "c"];
        let ct = 0;

        for (var i = 0; i < ts.length; i++) {
            if (characters.includes(ts[i])) {
                ct++;
            }
        }
        return ct;
    }

    console.log(`chars included in yr string: ${countString("abheben")}`);
}

function letBasics() {
    debugger;

    //tuce is *not* visible out here
    //console.log(tuce);
    for (let tuce = 0; tuce < 5; tuce++) {
        //tuce is only visible in here (and in the for() parentheses)
        console.log(tuce);
    };

    for (let tuce = 0; tuce < 5; tuce++) {
        //tuce is only visible in here (and in the for() parentheses)
        console.log(tuce);
    };
    //tuce is *not* visible out here
}

function constBasics() {
    debugger;

    //const pageSize; //produces ERROR: const declarations must be initialized
    //const is block scoped
    const nbr = 123;
    if (true) {
        const nbr = 456; // Allowed as its a new variable limited to this `if` block
    }

    //can be used with object literals
    const person = { name: 123 };
    person.bar = 456; // Allowed!
    console.log(person); // { name: 456 }    
}

function defaultParam() {

    function multiply(a, b = 1) {
        return a*b;
    }

        multiply(2);
}

function forOf() {
    var someArray = ["a", "b", "c"];
    for (var item in someArray) {
        console.log(item); // 0,1,2 ... Returns the key ... the index
    }

    for (var item of someArray) {
        console.log(item); // a, b, c
    }
}

function arrayHelpers() {
    debugger;

    var fruits = [
        { name: 'apples', quantity: 2, price: 3, region: "europe" },
        { name: 'bananas', quantity: 0, price: 5, region: "caribean" },
        { name: 'cherries', quantity: 5, price: 8, region: "europe" }
    ];

    //remember ECMA Script 5 pattern
    var result = [];
    for (var i = 0; i < fruits.length; i++) {
        var item = fruits[i];
        if (item.quantity < 6) {
            result.push(item);
        }
    }
    console.log(`There areas ${result.length } items in the Array`);
    
    //forEach
    fruits.forEach(function(fruit) {
        fruit.quantity ++;
    });

    //find
    var cherry = fruits.find(function(fruit) {
        return fruit.name === 'cherries';
    });
    console.log(cherry);

    //filter
    var cheap = fruits.filter(function(item) {
        return item.price < 6;
    });
    console.log(cheap);
    
    //every - some
    var allEuropean = fruits.every(function(fruit) {
        return fruit.region = "Europe";
    });
    console.log(allEuropean);

    var anyEuropean = fruits.some(function(fruit) {
        return fruit.region = "Europe";
    });
    console.log(anyEuropean);
    
    //reduce
    var fruitNames = fruits.reduce(function(prevArray, fruit) {
        prevArray.push(fruit.name);
        return prevArray;
    }, []);
    console.log(fruitNames);

    //look for balanced parenthesis
    function checkBalancedParanthesis(string) {
        return string.split("")
            .reduce(function(prev, char) {
                if (prev < 0) {return prev;}
                if (char === "(") {return ++prev;}
                if (char === ")") {return --prev;}
                return prev;
            }, 0)===0;
    }

    console.log(checkBalancedParanthesis("(())"));
    console.log(checkBalancedParanthesis("((())"));
}

//-> C# Dictionary
function maps() {
    var myMap = new Map();
    var keyString = "a string",
        keyObj = {},
        keyFunc = function () { };
    // setting the values
    myMap.set(keyString, "value associated with 'a string'");
    myMap.set(keyObj, "value associated with keyObj");
    myMap.set(keyFunc(), "value associated with keyFunc");
    console.log("Map size: " + myMap.size); // 3
    // getting the values
    myMap.get(keyString);   // "value associated with 'a string'"
    myMap.get("a string");  // "value associated with 'a string'" because keyString === 'a string'
    myMap.get(keyObj);      // "value associated with keyObj"
}

//-> Indexed Array
function sets() {
    var mySet = new Set();
    mySet.add(1);
    mySet.add("some text");
    var o = { a: 1, b: 2 };
    mySet.add(o);

    mySet.has(1); // true
    mySet.has(3); // false, 3 has not been added to the set
    mySet.has(Math.sqrt(25));  // true
    mySet.has("Some Text".toLowerCase()); // true
    mySet.has(o); // true
    var size = mySet.size; // 4
    mySet.delete(5); // removes 5 fro
}

function restParams() {    
    
    var store = new Array();
    store.rows = new Map;
   
    store.add = function (category, ...items) {

        var row = store.rows[category];
        if (row==undefined) {
            store.rows.set(category, new Array());
        }
        
        items.forEach(function (item) {
            store.rows.get(category).push(item);
        });
    };

    store.add('fruit', 'apple');
    store.add('dairy', 'milk', 'cheese', 'yoghurt');
    store.add('pastries', 'donuts', 'croissants');
    store.add('cleaning', 'soap', 'body lotion', 'shampoo', 'tooth brush');
}

function arrowFunctions() {
    let add = (x,y) => {
        let temp = x + y;
        return temp;
    };
    let square = x => x * x;

    console.log(add(4,9));
    console.log(square(6));
};


function introDestructuring() {
    var rect = { x: 0, y: 10, width: 15, height: 20 };

    // Destructuring assignment
    var {x, y, width, height} = rect;
    console.log(x, y, width, height); // 0,10,15,20

    // Array Destructuring
    var a = 1, b = 2;
    [a, b] = [b, a];
    console.log(x, y); // 2,1
}

function generatorFunction() {
    
function* getColors() {
    //Code to be executed in between
    yield "green";
    //Code to be executed in between
    yield "red";
    //Code to be executed in between
    yield "blue";
}

const colorGenerator = getColors();

debugger;
console.log(colorGenerator.next());
console.log(colorGenerator.next());
console.log(colorGenerator.next());

    //practical usage many time together with for ... of
    const arrColor = [];
    for (let col of getColors()) {
        arrColor.push(col);
    }
    console.log(arrColor);    
}

function enhancedObjectLiterals() {
    
    //Property value shorthand
    function getCarES5(make, model, value) {
        return {
            make: make,
            model: model,
            value: value        
        };
    }

    function getCar(make, model, value) {
        return {
            // with property value shorthand
            // syntax, you can omit the property
            // value if key matches variable
            // name
            make,
            model,
            value
        };
    }

    //Method definition shorthand
    function getBusES5(make, model, value) {
        return {
            depreciate: function() {
                this.value -= 2500;
            }
        };
    }

    function getBus(make, model, value) {
        return {
            // Method definition shorthand syntax
            // omits `function` keyword & colon
            depreciate() {
                this.value -= 2500;
            }
        };
    }
}

function destructuring() {
    // object pattern matching
        let {lName, fName} = {fName: 'John', age: 15, lName: 'Doe'};
 
    // array pattern matching
    let [first, second, third] = [8, 4, 100, -5, 20];
 
    // output: Doe, John
    console.log(lName + ', '+ fName);
 
    // output: 100, 4, 8
    console.log(third, second, first);

    let myArray = [1, ['hello'], true],
    [a, b, c] = myArray;
 
    // output: 1, ['hello'], true
    console.log(a, b, captureEvents());
}