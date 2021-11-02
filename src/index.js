// task => string(html)
// const renderTask = (task) => `<li class="${task.done ? 'done' : ''}">${task.text}</li>`;
// const renderTask = (task) => `<li data-done="${task.done}">${task.text}</li>`;
const renderTask = ({ text, done }) => `<li data-done="${done}">${text}</li>`;

const addTask = (render, appState, { newTaskText }) => {
    appState.tasks.push({ id: appState.nextId, text: newTaskText, done: false });
    appState.nextId += 1;
    render();
    return appState.nextId - 1;
};

const getTaskById = (tasks, id) => tasks.find((task) => task.id === id);

const toggleDoneTask = (render, { tasks }, id) => {
    // const task = tasks.find((task) => task.id ===id )
    const task = getTaskById(tasks, id);
    task.done = !task.done;
    render();
};

const changeTask = (render, { tasks }, id, taskText) => {
    const task = getTaskById(tasks, id);
    task.text = taskText;
    render();
};

const removeTask = (render, { tasks }, id) => {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    render();
};

const appState = {
    nextId: 0,
    tasks: [
        { id: -1, text: "Убрать снег", done: true },
        { id: -2, text: "Растопить печь", done: false },
    ],
};

const render = () => {
    const { tasks } = appState;
    // tasks => string(html)   11/12
    const allTasks = tasks.length;
    const doneTask = tasks.filter((task) => task.done).length;

    const root = document.getElementById("root");
    const name1 = "Dima";
    const hello = `<h1>Hi, ${name1}!</h1>`;
    const renderedTasks = tasks.map(renderTask).join("");
    root.innerHTML = `${hello} ${doneTask}/${allTasks} <ul>${renderedTasks}</ul>`;
};
// first render
render();

// mutations
const id = addTask(render, appState, { newTaskText: "Задача" });
toggleDoneTask(render, appState, -1);
changeTask(render, appState, id, "новый текст");
removeTask(render, appState, id);

// render();

// const obj = { q: 1, b: 2 }
// const { q, b } = obj
// console.log(q);
// console.log(b);