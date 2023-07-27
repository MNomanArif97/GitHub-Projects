let myLeads = []
let oldMyLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );
if(leadsFromLocalStorage){
    
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
// Assuming your data is stored with the key "myLeads" in local storage
const data = JSON.parse(localStorage.getItem("myLeads"));
const jsonData = JSON.stringify(data);
const blob = new Blob([jsonData], { type: "application/json" });
const url = URL.createObjectURL(blob);

// Create a link element and trigger a click event to download the file
const downloadLink = document.createElement("a");
downloadLink.href = url;
downloadLink.download = "data.json"; // File name
document.body.appendChild(downloadLink);
downloadLink.click();

// Clean up the URL object
URL.revokeObjectURL(url);

function render(leads){
    let listItems = ""
    for ( let i = 0; i < leads.length; i += 1 ){
        listItems += `
        <li>
            <a target='_blank' href = '${leads[i]}' > 
                ${leads[i]} 
            </a>
        </li>
        `  
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem( "myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    if(inputEl.value != null && inputEl.value != "" ){
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem( "myLeads", JSON.stringify(myLeads))
        render(myLeads) 
    }
})




