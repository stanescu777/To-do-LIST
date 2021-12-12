"use script";
let toDos = [];
function onPageStart() {
  const localStorageData = localStorage.getItem("ToDos");
  const localStorageParse = JSON.parse(localStorageData);
  if (localStorageParse) {
    toDos = localStorageParse;
  }
  generateList();
  // console.log(localStorageParse);
}
onPageStart();
function generateList() {
  let list = `<ul>`;
  toDos.forEach(function (element, index) {
    list += `<li id="${index}">
     <span id="toDo-${index}"`;
    if (element.checked) {
      list += `class="checked"`;
    }
    list += `> ${element.label} </span>
    <button onclick="deleteItem('${index}')">&#10060;</button>
    <button onclick="checkedItem('${index}')">&#10004;</button>
    </li>
    `;
  });
  list += `</ul>`;
  document.getElementById("lista").innerHTML = list;
  localStorage.setItem("ToDos", JSON.stringify(toDos));
}
//  The actual 'addTodo' function
function addToDo() {
  //  1. Get the value from the input
  const newItemElem = document.getElementById("newItem"); //  DOM element (object)
  const newItemElemValue = newItemElem.value; //  string
  if (newItemElemValue.trim() !== "") {
    //  2.  Add the new value into the toDos array
    const item = {
      label: newItemElemValue.trim(),
      checked: false,
    };
    toDos.push(item);
    //  3.  Regenerate the list and inject it into HTML
    generateList();
    newItemElem.value = "";
  }
}
//  On input keyUp
function onKeyUp(event) {
  //enter was pressed:
  if (event.keyCode === 13) {
    addToDo();
  }
}
//  On button click
function onClick() {
  addToDo();
}
function deleteItem(index) {
  toDos.splice(index, 1);
  generateList();
}
function checkedItem(index) {
  // if(toDos[index].checked === true) {
  //   toDos[index].checked = false;
  // } else {
  //   toDos[index].checked = true
  // }
  //  toggle
  toDos[index].checked = !toDos[index].checked;
  generateList();
}
// ////////////////////////////////////////
// //  LocalStorage theory
// //  Setting an item
// //  Let's say we have an object: const o = {name: 'John}
// // 1.) Transform the data to a string (if it's not a string already)
// const dataToStore = JSON.stringify(o);
// // 2.) Write the data to the localStorage
// localStorage.setItem("toDosData", dataToStore);
// //  Getting an item
// // 1.) Get the data form the localStorage
// const storedDataString = localStorage.getItem("toDosData");
// // 2.) Transform the data back to its initial type (array, object, etc)
// const storedData = JSON.parse(storedDataString);
