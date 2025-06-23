let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTask");
let taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {
    let task = taskInput.value;

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

let li = document.createElement("li");
let checkbox = document.createElement("input");


    checkbox.type = "checkbox";
    checkbox.textContent = "task";

let text= document.createTextNode("" + task);

    li.appendChild(checkbox);
    li.appendChild(text);
    taskList.appendChild(li);
    taskInput.value = ""; //clear input

//Remove task when double clicked
    li.addEventListener("dblclick", function () {
            li.remove();
        });

 //Edit task when clicked
    li.addEventListener("click", function (e) {
        if (e.target.tagName === "INPUT") return;

            let currentText = text.textContent;
            let input = document.createElement("input");

            input.type = "text";
            input.value = currentText;
            input.className = "edit-input";

            li.innerHTML = "";
            li.appendChild(checkbox);
            li.appendChild(input);
            input.focus();

        //Save task on Enter
            function saveEdit() {
                let newTask = input.value || currentText;
                let checkbox = document.createElement("input");
                let textNode = document.createTextNode(""+ newTask);

                    li.innerHTML = "";
                    checkbox.type = "checkbox";
                    checkbox.name = "task";

                    li.appendChild(checkbox);
                    li.appendChild(textNode);
            }

            input.addEventListener("blur", saveEdit );

            input.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                input.blur(); //triggers blur to save
            }
        });
    });
});