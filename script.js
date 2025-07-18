const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const completedCounter = document.getElementById("Completed-counetr");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters(){
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

function addTask(){
    const task = inputBox.value.trim(); //trim uklanja prazne znakove na pocetku i na kraju stringa ili npr. sljdeci red ali ako napises "dobar dan" ovaj razmak izemu dobar i dan nece ukloniti
    if(!task){
        alert("Please write down a task.");
        return;
    }

    const li = document.createElement("li");
                                                    //pomocu ovih `` je omoguceno dodavanje iz js u html i onda mozes koristiti ${} da bi dodala varijablu
    li.innerHTML = `                                
        <label>
            <input type= "checkbox">
            <span> ${task}</span>
        <label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
        `;
//label se koristi da se poveže checkbox i tekst, olakšava klik

    listContainer.appendChild(li);

    inputBox.value=""; //ovo dodajemo jer kada dodamo neki task u formu on jos uvijek ostane pa ga moramo rucno brisati prije nego upisemo drugi, pa ga ovako automatski brisemo

    //ovo sve moramo stvoriti u addTask() jer prije toga uopce nije postojalo, pa kad nastane tek im onda moramo dodjeliti addEventListener
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");
    //querySelector() - pomocu njega trazimo html elemente, ali trazimo pomocu CSS selektora, znaci #id, .class itd., i vraca PRVI element koji odgovara selektoru

    checkbox.addEventListener("click", function(){          //pazi sada ovo, morali smo tu dodati taj addeventlistener i iako ce se ova funkcija izvrsiti addtask() svejedno ce se kada kliknemo na taj checkbox izvrsiti ova funkcija za zavrsavanje taska iako vise nismo u addTask funkciji
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
});

    //classList je objekt koji sadrzi sve klase nekog html elementa
    //toggle omogucuje dodavajne klase ako je zadovoljen uvjet, znaci ako je checkbox.checked = true onda doda klasu completed, a ako je checkbox.completed = false onda je uklanja

    editBtn.addEventListener("click", function(){
        const update = prompt("Edit task:", taskSpan.textContent);
        if(update !== null){
            taskSpan.textContent = update;
            checkbox.checked=false;
            li.classList.remove("completed");
            updateCounters();
        }
    });

    deleteBtn.addEventListener("click", function(){
        if(confirm("Are you sure you want to delete this task?")){
            li.remove();
            updateCounters();
        }
    })

    updateCounters();

}

document.getElementById("input-button").addEventListener("click", addTask);


document.querySelector(".deleteAll-btn").addEventListener("click", function() {
    if(confirm("Are you sure you want to delete ALL tasks?")){
    const allTasks = listContainer.querySelectorAll("li");
    allTasks.forEach(task => task.remove());
    updateCounters();
    }
});
