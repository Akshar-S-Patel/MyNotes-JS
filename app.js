let allMyNotes = document.getElementById("allNotes");
let arrNotes = [];
let arrTitle = [];

if (localStorage.getItem("Notes") == null) {
    arrNotes = [];
} else {
    arrNotes = JSON.parse(localStorage.getItem("Notes"));
}

if (localStorage.getItem("Titles") == null) {
    arrTitle = [];
} else {
    arrTitle = JSON.parse(localStorage.getItem("Titles"));
}

getAllNotes();
ifNoNote();

document.getElementById("addNote").addEventListener("click", function () {
    let getText = document.getElementById("textarea");
    let getTitle = document.getElementById("title");
    getText.value = getText.value.trim();
    getTitle.value = getTitle.value.trim();
    if (!(getText.value == "" || getTitle.value == "")) {
        arrNotes.push(getText.value);
        arrTitle.push(getTitle.value);
        localStorage.setItem("Notes", JSON.stringify(arrNotes));
        localStorage.setItem("Titles", JSON.stringify(arrTitle));
        getAllNotes();
        getText.value = "";
        getTitle.value = "";
    } else {
        if (getTitle.value == "") {
            alert("Title should not be empty! Please enter something");
            getTitle.focus();
        }
        else if (getText.value == "") {
            alert("Notes should not be empty! Please enter something");
            getText.focus();
        }
    }
});

document.getElementById("textBox").addEventListener("input", function () {
    let element1 = document.getElementsByClassName('card-title');
    Array.from(document.getElementsByClassName("card-text")).forEach(function (element, index) {
    if (element.innerHTML.trim().toLowerCase().includes(document.getElementById("textBox").value) || element1[index].innerHTML.trim().toLowerCase().includes(document.getElementById("textBox").value) ){
        document.getElementsByClassName("myNotes")[index].style.display = "block";
    } else {
        document.getElementsByClassName("myNotes")[index].style.display = "none";
    }
    });
});

document.getElementById("deleteAll").addEventListener("click", function () {
    arrNotes = [];
    arrTitle = [];
    localStorage.clear();
    allMyNotes.innerHTML = "";
    ifNoNote();
});

document.getElementById("notesView").addEventListener("click", function() {
    allMyNotes.innerHTML = "";
    if(document.getElementById("notesView").innerHTML == "Grid View") {
        allMyNotes.classList.remove("mx-2");
        allMyNotes.classList.add("row");  
        allMyNotes.classList.add("container-fluid");
        allMyNotes.classList.add("mx-4");
        document.getElementById("notesView").innerHTML = "List View";
        arrNotes.forEach(function (element, index) {
            let html = `
            <div class="myNotes card mx-2 my-2" style="width: 14rem;">
                <div class="card-body">
                    <h5 id="Title-${index}" class="card-title" ondblclick="editable(id)" onblur="nonEditable(id)">${arrTitle[index]} </h5>
                    <p id="Note-${index}" class="card-text" ondblclick="editable(id)" onblur="nonEditable(id)">
                        ${element}
                    </p>
                <button id="${index}" type="button" class="btn btn-outline-danger" onclick="deleteNote(id)"> Delete </button>
                </div>
            </div>
            `;
            allMyNotes.innerHTML += html;
        })
    } else {
        allMyNotes.classList.remove("row");  
        allMyNotes.classList.remove("container-fluid");
        allMyNotes.classList.remove("mx-4");
        allMyNotes.classList.add("mx-2");
        document.getElementById("notesView").innerHTML = "Grid View";
        arrNotes.forEach(function (element, index) {
            let html = `
            <div class="myNotes card mx-2 my-2">
                <div class="card-body">
                    <h5 style="margin: 0; display: inline-block; float: left;" id="Title-${index}" class="card-title" ondblclick="editable(id)" onblur="nonEditable(id)">${arrTitle[index]}</h5>
                    <h5 style="margin: 0; display: inline-block; float: left;"> &nbsp; :- &nbsp;</h5>
                    <p style="float: left;"id="Note-${index}" class="card-text" ondblclick="editable(id)" onblur="nonEditable(id)">
                        ${element}
                    </p>
                <button style="float: right;" id="${index}" type="button" class="btn btn-outline-danger" onclick="deleteNote(id)"> Delete </button>
                </div>
            </div>
            `;
            allMyNotes.innerHTML += html;
        })
    }
})

function getAllNotes() {
    allMyNotes.innerHTML = "";
    allMyNotes.classList.add("row");  
    allMyNotes.classList.add("container-fluid");
    allMyNotes.classList.add("mx-4");
    arrNotes.forEach(function (element, index) {
        let html = `
        <div class="myNotes card mx-2 my-2" style="width: 14rem;">
            <div class="card-body">
                <h5 id="Title-${index}" class="card-title" ondblclick="editable(id)" onblur="nonEditable(id)">${arrTitle[index]} </h5>
                <p id="Note-${index}" class="card-text" ondblclick="editable(id)" onblur="nonEditable(id)">
                    ${element}
                </p>
            <button id="${index}" type="button" class="btn btn-outline-danger" onclick="deleteNote(id)"> Delete </button>
            </div>
        </div>
        `;
        allMyNotes.innerHTML += html;
    })
    ifNoNote();
}

function deleteNote(index) {
    arrNotes.splice(index, 1);
    arrTitle.splice(index, 1);
    localStorage.setItem("Notes", JSON.stringify(arrNotes));
    localStorage.setItem("Titles", JSON.stringify(arrTitle));
    getAllNotes();
}

function ifNoNote() {
    if (document.getElementsByClassName("myNotes").length === 0) {
        allMyNotes.innerHTML = "<small  style='color: red'> * Nothing to show please add some notes </small>"
    }
}

function editable(id) {
    document.getElementById(id).contentEditable = true;
}

function nonEditable(id) {
    let index = id.split("-")[1];
    document.getElementById(id).contentEditable = false;
    arrTitle[index] = document.getElementById("Title-" + String(index)).innerHTML;
    arrNotes[index] = document.getElementById("Note-" + String(index)).innerHTML;
    localStorage.setItem("Notes", JSON.stringify(arrNotes));
    localStorage.setItem("Titles", JSON.stringify(arrTitle));
}
