let input = document.getElementById("input");
let buton = document.getElementById("buton");
let todoList = JSON.parse(localStorage.getItem('list')) || [];

window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        ekle();
    }
});

buton.onclick = function () {
    ekle();
};

function ekle() {
    if (input.value.trim() !== "") {
        let newItem = input.value.trim();
        todoList.push(newItem);
        localStorage.setItem("list", JSON.stringify(todoList));
        todolist();
        input.value = "";
    } else {
        alert("Lütfen bir değer giriniz.");
    }
}

function todolist() {
    //başlamadan önce tüm p etiketlerini sil
document.querySelectorAll("p").forEach(item => item.remove())

    //element ekleme
    todoList.forEach(item => {
        console.log(item);
        let create = document.createElement("p");
        create.textContent = item;
        document.body.appendChild(create);

        //element silme
        create.onclick = function () {
            let confirmDelete = confirm("Silmek istediğinizden emin misiniz?");
            if (confirmDelete) {
                let index = todoList.indexOf(item);
                todoList.splice(index, 1);
                create.remove()
                localStorage.setItem("list", JSON.stringify(todoList));
                todolist();
            }
        };

        //element düzenleme
        create.oncontextmenu = function (e) {
            e.preventDefault();
            let newText = prompt("Düzenlemek istediğiniz şeyi yazın.");
            if (newText) {
                let index = todoList.indexOf(item);
                todoList[index] = newText;
                localStorage.setItem("list", JSON.stringify(todoList));
                todolist();
            }
        };
    });
}

//sayfa yenilendiği zaman değerler kaybolmasın
window.addEventListener("load", function () {
    todolist();
});
