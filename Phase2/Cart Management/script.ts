var cart:any[] = []
var item;
var cartsize:number = 0;

type shopitem = {
    name: string;
    price: number;
}

function addtoCart(itemname:string,itemprice:number): void{

    item = {} as shopitem;
    item = {name: itemname, price: itemprice};
    cart.push(item);
    
    console.log(cart);

    if (window.sessionStorage.getItem('checkoutcart') === null) {
        window.sessionStorage.setItem('checkoutcart', JSON.stringify(cart));
    }
    else {
        cart = JSON.parse(window.sessionStorage.getItem('checkoutcart'));
        cart.push(item);
        window.sessionStorage.setItem('checkoutcart', JSON.stringify(cart));
    }

    //update cart size
    cartsize = eval( document.getElementById("cart-size").innerHTML);
    cartsize = cartsize + 1;
    document.getElementById("cart-size").innerHTML = cartsize.toString();
}

// ----------------------------------------------------------------------------------

var a1 = document.getElementById("add1");
if (a1) {
    console.log("a1");
    a1.addEventListener("click", function () { addtoCart("Cat", 150); }, false);
}

var a2 = document.getElementById("add2");
if (a2) {
    console.log("a2");
    a2.addEventListener("click", function () { addtoCart("Dog", 150); }, false);

}

var a3 = document.getElementById("add3");
if (a3) {
    console.log("a3");
    a3.addEventListener("click", function () { addtoCart("CatDog", 1000); }, false);

}

var a4 = document.getElementById("add4");
if (a4) {
    console.log("a4");
    a4.addEventListener("click", function () { addtoCart("Billy", 5); }, false);

}

//---------------------------------------------------------------------------

type cartItem = {
    name: string;
    price: number;
    count: number;
}

function loadCart(): void{

    var itms:cartItem[] = [];  // [ {name, price, count}, {name, price, count}, etc..]
    var itm = {} as cartItem;
    var cart1 = JSON.parse(window.sessionStorage.getItem("checkoutcart"));

    cart1.forEach(element => {

        if(itms != null){

            var index:number = -1;
            for (var i:number = 0; i < itms.length; i++) {

                if (itms[i].name == element.name) {
                    index = i;
                }
            }
            if (index != -1) {
                itms[index].count === null ? itms[index].count = 1: itms[index].count++ ;  
            }
            else {
                itm = {name: element.name, price: element.price, count: 1};
                itms.push(itm);
            }

        }
        else{
            itm = { name: element.name, price: element.price, count: 1 };
            itms.push(itm);
        }

    });

    var totalprice:number = 0;
    var tableContent:string = "";
    var headerTable:string = "<table border=1 style= 'margin: auto'> <tr> <th>Name</th> <th>Price</th> <th>Count</th> </tr>";

    if (itms != null) {
        itms.forEach((element) => {
            tableContent = tableContent + "<tr><td>" + element.name + "</td><td>" + element.price + "</td><td>" + element.count + "</td></tr>";
            totalprice = totalprice + ( element.price * element.count);
        });
    }

    var endTable = "</table>";

    tableContent = headerTable + tableContent + endTable;

    document.getElementById("Checkout-table").innerHTML = tableContent;
    document.getElementById("totalprice").innerHTML = "The total annual budget is: " + totalprice;
}