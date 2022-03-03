//display menu
function displayMenu(menuItems) {
    menu = document.querySelector('.Menu');
    for (let item of menuItems) {
        let itemCard = document.createElement('div');
        itemCard.setAttribute('draggable', true);
        let itemName = document.createElement('h3');
        let itemPrice = document.createElement('p');
        let category = document.createElement('p');
        category.textContent = item["category"];
        category.style.display = 'none';
        itemCard.setAttribute("id", "item- " + item["id"]);
        itemCard.setAttribute("class", "fooditems");
        itemName.textContent = item["name"];
        itemPrice.textContent = "₹" + item["price"];
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);
        itemCard.appendChild(category);
        menu.appendChild(itemCard);
    }
}
displayMenu(menuItems);


//display tables
(function displayTables(tables) {
    let tableElement = document.querySelector('.Table');
    for (let table of tables) {
        let tableCard = document.createElement('div');
        tableCard.setAttribute('ondragover', 'allowdrag(event)')
        let tableName = document.createElement('h3');
        let tableContent = document.createElement('div');
        tableContent.setAttribute('id', 'tableContent');
        let tableTotal = document.createElement('p');
        let TotalItems = document.createElement('p');
        tableCard.setAttribute("id", table.id);
        tableCard.setAttribute("class", "tables");
        tableContent.setAttribute("class", "tableContent");
        tableName.textContent = `Table-${table.id}`;
        tableTotal.textContent = "Rs 0 ";
        TotalItems.textContent = "| Total Items: 0";
        tableCard.appendChild(tableName);
        tableContent.appendChild(tableTotal);
        tableContent.appendChild(TotalItems);
        tableCard.appendChild(tableContent);
        tableElement.appendChild(tableCard);
    }

})(tables);




//searching food items
let search = document.getElementById('searchitem');
let allItems = document.querySelectorAll('.fooditems')
search.addEventListener('keyup', () => {
    let target = search.value.toLowerCase();
    for (let item of allItems) {
        let name = item.children[0].innerHTML.toLowerCase();
        let category = item.children[2].innerHTML.toLowerCase();
        if (name.includes(target) || category.includes(target)) {
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    }
})

//searching tables
const tableElements = document.querySelectorAll('.tables');
const searchTable = document.querySelector('.searchtable');
searchTable.addEventListener('keyup', () => {
    let targetTable = searchTable.value.toLowerCase();
    for (let table of tableElements) {
        let tableName = table.children[0].innerHTML.toLowerCase();
        if (tableName.includes(targetTable)) {
            table.style.display = '';
        }
        else {
            table.style.display = "none";
        }
    }
}
);


//itemPrice map
let itemPrice = new Map();
menuItems.forEach(item => {
    itemPrice.set(item.name, item.price)
});


//count Quantity and count Total
function countQuantity(table) {
    let total = 0;
    const iterator = table.orders.values();
    let next = iterator.next().value;
    while (next) {
        total += Number(next);
        next = iterator.next().value;
    }
    return total;

}
function calculateTotal(foodOrders) {
    let total = 0;
    for (let order of foodOrders) {
        total += itemPrice.get(order[0]) * Number(order[1]);
    }
    return total;
}


//dragging
function allowdrag(ev) {
    ev.preventDefault();
}
let draggables = document.querySelectorAll('.fooditems');
let enterIntoTables = document.querySelectorAll('.tables');
for (let drag of draggables) {
    drag.addEventListener('dragstart', (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
        drag.classList.add('dragging');
    })
    drag.addEventListener('dragend', () => {
        drag.classList.remove('dragging');
    })
}
//drag drop
enterIntoTables.forEach(table => {
    table.addEventListener('drop', (e) => {
        let itemId = e.dataTransfer.getData("text");
        let itemElement = document.getElementById(itemId);
        let itemName = itemElement.children[0].textContent;
        let itemPrice = itemElement.children[1].textContent;
        let id = Number(table.getAttribute('id')) - 1;
        let cost = table.children[1].children[0];
        let noOfItems = table.children[1].children[1];
        let orderlist = tables[id].orders;
        if (orderlist.get(itemName) == null) {
            orderlist.set(itemName, 1);
        }
        else {
            orderlist.set(itemName, Number(orderlist.get(itemName)) + 1);
        }
        noOfItems.textContent = `Total Items:${countQuantity(tables[id])}`;
        cost.textContent = `Rs ${calculateTotal(tables[id].orders)}`;
    })
})

//popup

function displayPopup(table) {
    document.querySelector('.popcontent').style.display = 'block';
    let tableContent = document.querySelector('.ordertable');
    let currentTable = tables[table.parentElement.id - 1];
    let foodOrders = currentTable.orders;
    document.getElementById('total').textContent = `Total:${currentTable.totalCost}`;
    let count = 1;
    for (let foodItem of foodOrders) {
        let row = document.createElement('tr');
        row.setAttribute('id', `sno`)
        let sno = document.createElement('td');
        sno.textContent = count;
        let item = document.createElement('td');
        item.textContent = foodItem[0];
        let price = document.createElement('td');
        price.textContent = itemPrice.get(item.textContent);
        //quantity
        let quantity = document.createElement('td');
        let quantInput = document.createElement('input');
        quantInput.setAttribute('type', 'Number');
        quantInput.setAttribute('value', foodItem[1]);
        quantInput.setAttribute('min', 1);
        quantInput.setAttribute('max', 10);
        //change quantity
        quantInput.addEventListener('change', () => {
            foodOrders.set(foodItem[0], quantInput.value);
            let totalCost=calculateTotal(foodOrders);
            table.children[0].textContent=`Rs ${totalCost}`;
            let totalItems=countQuantity(tables[table.parentElement.id-1]);
            table.children[1].textContent=`Total Items:${totalItems}`;
            document.getElementById('total').textContent = `Total:${totalCost}`;
        })
        quantity.appendChild(quantInput);
        //delete icon
        let deleteImage=document.createElement('img');
        deleteImage.setAttribute('src','https://img.icons8.com/ios-glyphs/20/000000/filled-trash.png');
        let tabled=document.createElement('td');
        let imageButton=document.createElement('button');
        imageButton.setAttribute('id','delete');

        imageButton.appendChild(deleteImage);
        tabled.appendChild(imageButton);
        //appending to row 
        row.appendChild(sno);
        row.appendChild(item);
        row.appendChild(price);
        row.appendChild(quantity);
        row.appendChild(tabled);
        tableContent.appendChild(row);    
        count++;
        document.getElementById('total').textContent = `Total:${calculateTotal(foodOrders)}`;
    }
    //delete item in popup
    imageButton=document.querySelectorAll('#delete');
    imageButton.forEach(image=>{image.addEventListener('click',()=>{
        let rowElement=image.parentElement.parentElement;
        let parent=rowElement.children[1].textContent; 
        let target=foodOrders.get(parent);
        foodOrders.delete(parent);
        let total=calculateTotal(foodOrders);
        document.getElementById('total').textContent = `Total:${total}`;
        table.children[0].textContent=`Rs ${total}`;
        table.children[1].textContent=`Total Items:${countQuantity(currentTable)}`;
        rowElement.remove();
         let sNo=document.querySelectorAll('#sno');
         let count=0;
         sNo.forEach((serial)=>{
             serial.children[0].textContent=++count;
            })    
    })});

    //close btn
    document.querySelector('#closebtn').addEventListener('click', () => {
        while (tableContent.hasChildNodes()) {
            tableContent.removeChild(tableContent.children[0]);
        }
        document.querySelector('.popcontent').style.display = 'none';
        table.classList.remove('selected');
    }
    )
}

const tableContents = document.querySelectorAll('#tableContent')
tableContents.forEach(table => table.addEventListener('click', () => {
    table.classList.add('selected');
    displayPopup(table);
}
))
