import {METHODS} from './core/constants';
import User from './models/user';
import API from './core/api';

window.onload = main;

function main() {
    debugger;
    addUsersToTable();
}

function addUsersToTable() {

    API.GetAction(METHODS.USERS, drawUsersBy, alert);
    // const user = new User();
    // API.PostAction(
    //     METHODS.USERS,
    //     null,
    //     user,
    //     drawUsersBy,
    //     alert
    // );
}

function drawUsersBy(users = []) {
    debugger;
    const tBody = document.getElementById('tBodyId');

    users.forEach(user => {
        const row = createRowFor(user);
        tBody.appendChild(row);
    });
}

function createRowFor(user) {
    const tr = document.createElement('tr');
    const columnKeys = ['id', 'name', 'username'];

    for (let key of columnKeys) {
        const td = document.createElement('td');
        td.innerText = user[key];
        tr.appendChild(td);
    }

    const lastCell = document.createElement('td');
    const addBtn = document.getElementById('addButtonId');
    const delBtn = creatBtn('delete');
    const editBtn = creatBtn('edit');
    lastCell.appendChild(delBtn);
    lastCell.appendChild(editBtn);

    delBtn.onclick = () => { deleteUser(user);};
    editBtn.onclick =() => { editUser(user);};
    addBtn.onclick = () => { debugger; editUser(user)};
    tr.appendChild(lastCell);

    return tr;
}

function deleteUser(user) {
    const id = user['id'];
    debugger;
    clearTable();
    API.DeleteAction(METHODS.USERS, id, addUsersToTable, alert);
}

function editUser(user) {
    const popup = document.getElementById('popupId');
    popup.className = 'showPopup';

    const addBtn = document.getElementById('addId');
    const cancelBtn = document.getElementById('cancelId');

    addBtn.onclick = () => { debugger; saveUser(user, popup) };

    cancelBtn.onclick = () => { popup.className = 'popup' }

}

function saveUser(user, className) {
    const name = document.getElementById('name');
    const userName = document.getElementById('username');

    if (name.value === '' || userName.value === '') {
      return   alert('Fill in the input fields, or press .CANCEL.');

    }
    const id = user['id'];
    const body = {
        name: name.value,
        username: userName.value
    };

    clearTable();
    className.className = 'popup';
    API.PutAction(METHODS.USERS, id, body, addUsersToTable, alert);
}

function creatBtn(btnName) {
    const btn = document.createElement('button');
    btn.style.backgroundImage = `url(./image/${btnName}.png)`;
    return btn;
}

function clearTable() {
    const myNode = document.getElementById("tBodyId");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}