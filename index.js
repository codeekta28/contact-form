let counter = 1;
class CollectData {
    constructor(name, email, msg) {
        this.name = name;
        this.email = email;
        this.msg = msg;
    }
}
// UI class for everything visible
class UserInterface {
    static alertMsg(message, status) {
        let alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${status} my-3 text-capitalize`;
        alertDiv.appendChild(document.createTextNode(message));
        let body = document.querySelector("body");
        let form = document.querySelector("#form");
        body.insertBefore(alertDiv, form);
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    static displayDataFromLocalStoreToTable() {
        let localStoreData = LocalStore.getDataFromLocalStorage();
        localStoreData.forEach((data) => {
            this.addDataToTable(data);
        })
    }
    static addDataToTable(userData) {
        let tBody = document.querySelector("#contactTableBody");
        let tRow = document.createElement("tr");
        tRow.innerHTML = `<td>${counter}</td>
                           <td>${userData.name}</td>
                           <td>${userData.email}</td>
                           <td>${userData.msg}</td>
                           <td><a href="" class="${counter} delete">X</a></td>`
        tBody.appendChild(tRow);
        counter++;

    }
    static deleteDataFromTable(target) {
        target.parentElement.parentElement.remove();
    }
    static clearFields() {
        document.querySelector("#name").value = " ";
        document.querySelector("#email").value = " ";
        document.querySelector("#message").value = " ";
    }
    static resetTable(){
        localStorage.clear();
    }
}
// Store class for everything localstorage
class LocalStore {
    static getDataFromLocalStorage() {
        let formDataArray;
        if (localStorage.getItem("formData") === null) {
            formDataArray = [];
        } else {
            formDataArray = JSON.parse(localStorage.getItem("formData"));
        }
        return formDataArray;
    }
    static storeDataToLocalStorage(userData) {
        // console.log("localStore", userData);
        let formData = LocalStore.getDataFromLocalStorage();
        formData.push(userData);
        // console.log("formData", formData);
        localStorage.setItem("formData", JSON.stringify(formData));
    }
    static deleteDataFromLocalStore(index) {
        let formData = LocalStore.getDataFromLocalStorage();
        formData.splice(index, 1);
        localStorage.setItem("formData", JSON.stringify(formData));
    }
}
// event listener on send button
document.querySelector("#send").addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let msg = document.querySelector("#message").value;
    console.log(email);
    console.log(msg);
    console.log(name);
    if (name == "" || email == "" || msg == "") {
        UserInterface.alertMsg("error", "danger");
    }else{
        // instantiate the class
        let userInputObject = new CollectData(name,email,msg);
        // store in local storage
        LocalStore.storeDataToLocalStorage(userInputObject);
        // add to table
        UserInterface.addDataToTable(userInputObject);
        // clearfields
        UserInterface.clearFields();
    }
})
// event listener for delete buttons
document.querySelector("#contactTableBody").addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        UserInterface.deleteDataFromTable(e.target);
    }
    if (e.target.classList.contains("delete")) {
        let index = parseInt(e.target.className);
        index--
        LocalStore.deleteDataFromLocalStore(index);
    }
})
// dom event listener
document.addEventListener("DOMContentLoaded", (e) => {
    UserInterface.displayDataFromLocalStoreToTable();
})
// reset event listener
document.querySelector("#reset").addEventListener("click",(e)=>{
    UserInterface.resetTable();
})