let user_name = document.getElementById("inputName")
let user_number = document.getElementById("inputNumber")

let kontakts_list = []
if (JSON.parse(localStorage.getItem("kontakts")) != null){
    kontakts_list = JSON.parse(localStorage.getItem("kontakts"))
}
let last_id = JSON.parse(localStorage.getItem("id"))

class user{
    constructor(name, number){
        this.id = last_id != 0 ? last_id + 1: 1;
        this.name = name;
        this.number = number;
    }
}

function addKontakt() {
    if (user_name.value != "" && user_number.value != "") {
        let user_info = new user(user_name.value, user_number.value);
        createKontakt(user_info);
        kontakts_list.push(user_info)
        localStorage.setItem("kontakts", JSON.stringify(kontakts_list));
        localStorage.setItem("id", user_info.id);
        last_id = JSON.parse(localStorage.getItem("id"))
        kontakts_list = JSON.parse(localStorage.getItem("kontakts"))
    }
}

function createKontakt(user_info) {
    let list = document.getElementsByTagName("tbody")
    let kontakt = document.createElement("tr");
    kontakt.id = user_info.id

    kontakt.innerHTML = '<th scope="row">'+user_info.id+'</th> <td>'+user_info.name+'</td> <td>'+user_info.number+'</td> <td class="d-grid gap-2 d-md-flex justify-content-md-end"><a href="#" class="btn btn-danger btn-sm" onclick="deleteKontakt('+user_info.id+')" >⠀X⠀</a></td>';
    list[0].append(kontakt)
}

function deleteKontakt(id) {
    let element = document.getElementById(""+id)
    element.remove()
    for (let index = 0; index < JSON.parse(localStorage.getItem("kontakts")).length; index++) {
        kontakts_list = JSON.parse(localStorage.getItem("kontakts"))
        if (kontakts_list[index].id == id) {
            kontakts_list.splice(index, 1);
            localStorage.setItem("kontakts", JSON.stringify(kontakts_list));
        }
    }
}



for (let index = 0; index < JSON.parse(localStorage.getItem("kontakts")).length; index++) {
    createKontakt(JSON.parse(localStorage.getItem("kontakts"))[index])
}