
const inputIDDOM = document.getElementById("inputID");
const inputNameDOM = document.getElementById("inputFName");
const inputLNameDOM = document.getElementById("inputLName");
const inputEmailDOM = document.getElementById("inputEmail");
const inputPhoneDOM = document.getElementById("inputPhone");
const inputAddressDOM = document.getElementById("inputAddress");

const idToDeleteDOM = document.getElementById("inputIDDel");

const formDOM = document.querySelector(".FormCreate");
const delFormDOM = document.querySelector(".FormDelete");
const contactDOM = document.querySelector(".DataList");


let inputID = "";
let inputName = "";
let inputLName = "";
let inputEmail = "";
let inputPhone = "";
let inputAddress = "";

// let inputIDDel = "";

const clearAllInput = async() =>{

    inputIDDOM.value = null;
    inputNameDOM.value = null;
    inputLNameDOM.value = null;
    inputEmailDOM.value = null;
    inputPhoneDOM.value = null;
    inputAddressDOM.value = null;
    idToDeleteDOM.value = null;
}


const getAllContacts = async() =>{
    try {
        let allContacts = await axios.get("/api/contacts");
        console.log(allContacts);
        let {data} = allContacts;
        console.log(data);

        allContacts = data.map((contact) => {

            
            const { id, fname, lname, email, phone, address} = contact;
            return `
            <div class="DataObj">
            <h3>ID: ${id}</h3>
            <h4>First Name: ${fname}</h4>
            <h4>Last Name: ${lname}</h4>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Address: ${address}</p>
            </div>
            `

        });

        contactDOM.innerHTML = allContacts;


    } catch (error) {
        console.log(error);
    }
}

getAllContacts();


inputIDDOM.addEventListener("change", (e) => {
    inputID= e.target.value;
    console.log(inputID);
});


inputNameDOM.addEventListener("change", (e) => {
    inputName= e.target.value;
    console.log(inputName);
});

inputLNameDOM.addEventListener("change", (e) => {
    inputLName= e.target.value;
    console.log(inputLName);
});

inputEmailDOM.addEventListener("change", (e) => {
    inputEmail= e.target.value;
    console.log(inputEmail);
});

inputPhoneDOM.addEventListener("change", (e) => {
    inputPhone= e.target.value;
    console.log(inputPhone);
});

inputAddressDOM.addEventListener("change", (e) => {
    inputAddress= e.target.value;
    console.log(inputAddress);
});

// idToDeleteDOM.addEventListener("change", (e) => {
//     inputIDDel= e.target.value;
//     console.log(inputIDDel);
// });







formDOM.addEventListener("submit", async (e) => {

    e.preventDefault();
    if(inputID && inputName){
        console.log("add data");

        try {
            await axios.post("/api/contact", {
                id: inputID,
                fname: inputName,
                lname: inputLName,
                email: inputEmail,
                phone: inputPhone,
                address: inputAddress
            });
            getAllContacts();
            clearAllInput();
    
        } catch (error) {
            console.log(error);
        }
    }


});
delFormDOM.addEventListener("submit", async (e) => {

    e.preventDefault();
    if(inputIDDel){
        console.log("delete data is triggered");

        try {
            await axios.delete(`/api/contact/delete/${inputIDDel.value}`, {
                id: inputIDDel
            });
            getAllContacts();
            clearAllInput();
    
        } catch (error) {
            console.log(error);
        }
    }


});

