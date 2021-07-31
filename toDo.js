// Choose all of elements
const form = document.querySelector("#todo-form"); 
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners (){ // All eventListeners here
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}
function clearAllTodos(e){
    // clear Todos
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
        // solution 1 (slower) => todoInput.innerHTML = "" ;

        // solution 2 (faster than 1)
        while(todoList.firstElementChild != null ) {
            todoList.removeChild(todoList.firstElementChild);

        }
        localStorage.removeItem("todos");
        
    }

}
function filterTodos (e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){

            listItem.setAttribute("style", "display : none !important");
        }
        else {
            listItem.setAttribute("style", "display : block");
        }

    });

}
function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Madde başarıyla silindi.." );
    }


}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){
        if (todo === deletetodo){
            todos.splice(index,1); // delete value from Array
        }

    });

    localStorage.setItem("todos", JSON.stringify(todos));

}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);

    })

}
function addTodo(e){
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        /*
        <div class="alert alert-danger" role="alert">
                    A simple danger alert—check it out!
                </div>
                */

        showAlert("danger","Lütfen bir todo girin!");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi..")
    }
    


    e.preventDefault();
}
function getTodosFromStorage(){ // catch all of Todos from Storage
    let todos; 

    if( localStorage.getItem("todos") === null){
        todos = []; 
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos ; 


}
function addTodoToStorage (newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));



}
function showAlert (type, message) {
        const alert = document.createElement("div");

        alert.className = `alert alert-${type}`;

        alert.textContent = message;

        firstCardBody.appendChild(alert);

        //setTimeOut
        setTimeout(function(){

                alert.remove();

        }, 1000);
        


}
function addTodoToUI(newTodo){ // value adds as listItem to UI

/* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */
    //create listItem
    const listItem = document.createElement("li");
    //create link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // add listItem to toDoList

    todoList.appendChild(listItem);
    todoInput.value = "";

}