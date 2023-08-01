import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const myAppSetting = {
    databaseURL: "https://realtime-database-d9e77-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const myApp = initializeApp(myAppSetting)
const myDatabase = getDatabase(myApp)
const myShoppingListInDB = ref(myDatabase, "shoppingList")

const inputDataEl = document.getElementById("data-input")
const addBtnEl = document.getElementById("add-item")
const shoppingListEl = document.getElementById("shopping-list")

addBtnEl.addEventListener("click", function(){
    let inputValue = inputDataEl.value
    push(myShoppingListInDB, inputValue)
    clearInputFieldEl()
})

onValue(myShoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let myShoppingDataBaseList = Object.entries(snapshot.val())
        clearShoppingItemsListEl()
        for(let i = 0; i < myShoppingDataBaseList.length; i++){
            let currentShoppingItem = myShoppingDataBaseList[i]
        
            let currentShoppingItemID = currentShoppingItem[0];
            let currentShoppingItemValue = currentShoppingItem[1];
            
            appendItemToShoppingListEl(currentShoppingItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearInputFieldEl(){
    inputDataEl.value = ""
}
function clearShoppingItemsListEl(){
    shoppingListEl.innerHTML = ""
}
function appendItemToShoppingListEl(item){
    let itemID = item[0];
    let itemValue = item[1];

    let newItemValueEl = document.createElement("li")

    newItemValueEl.textContent = itemValue

    newItemValueEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(myDatabase, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newItemValueEl);
}