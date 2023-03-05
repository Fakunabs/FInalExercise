/*  */
const addNewTask = document.getElementsByClassName("btn-add");
const closeNewTask = document.getElementsByClassName("btn-close");
const submit = document.getElementById("submit");
const form = document.getElementsByClassName("form-add");
const colBody = document.getElementsByClassName("col-body");
const categoryInput = document.getElementById("category");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const date = new Date();
const todoCount = document.getElementById("todo-count");
const doingCount = document.getElementById("doing-count");
const finishCount = document.getElementById("finished-count");
const categoryEdit = document.getElementById("edit-category");
const titleEdit = document.getElementById("edit-title");
const contentEdit = document.getElementById("edit-content");

let id = 0;

todoCount.textContent = "0";
doingCount.textContent = "0";
finishCount.textContent = "0";

// Tạo chức năng cho nút add new task
addNewTask[0].addEventListener("click", () => {
  const popup = document.getElementsByClassName("popup");
  const formAdd = document.getElementsByClassName("form-add");
  popup[0].classList.add("visible");
  formAdd[0].classList.add("visible");
});

// Tạo chức năng cho nút close
closeNewTask[0].addEventListener("click", () => {
  const popup = document.getElementsByClassName("popup");
  const formAdd = document.getElementsByClassName("form-add");
  popup[0].classList.remove("visible");
  formAdd[0].classList.remove("visible");
});

// Tạo chức năng cho nút submit trong form, nếu trong 3 ô input không có gì thì không cho submit và hiện đỏ 3 ô input
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    document.getElementById("title").value == "" ||
    document.getElementById("category").value == "" ||
    document.getElementById("content").value == ""
  ) {
    document.getElementById("title").style.border = "2px solid red";
    document.getElementById("title").style.borderRadius = "5px";
    document.getElementById("category").style.border = "2px solid red";
    document.getElementById("category").style.borderRadius = "5px";
    document.getElementById("content").style.border = "2px solid red";
    document.getElementById("content").style.borderRadius = "5px";
  } else {
    // nếu ô nào không có chữ thì không cho submit và hiện đỏ ô đó nhưng có có ô có chữ thì vẫn hiện xanh ô đó
    if (document.getElementById("title").value != "") {
      document.getElementById("title").style.border = "2px solid green";
      document.getElementById("title").style.borderRadius = "5px";
    }
    if (document.getElementById("category").value != "") {
      document.getElementById("category").style.border = "2px solid green";
      document.getElementById("category").style.borderRadius = "5px";
    }
    if (document.getElementById("content").value != "") {
      document.getElementById("content").style.border = "2px solid green";
      document.getElementById("content").style.borderRadius = "5px";
    }
    // Lưu task mới vào Local Storage
    const task = {
      id: id++,
      category: categoryInput.value,
      title: titleInput.value,
      content: contentInput.value,
      date: date.getTime(),
    };
    let tasks = [];
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Hãy render task được lưu vào Local Storage ra màn hình khi reload
    const tasksRender = JSON.parse(localStorage.getItem("tasks"));
    tasksRender.forEach((task) => {
      colBody[0].innerHTML += `
      <div class="box" id="item">
      <!-- ở đây -->
      <div class="box-head">
        <div class="box-title">
          <div class="category">${task.category}</div>
          <h3 class="title">${task.title}</h3>
        </div>
        <div class="box-action">
          <div class="icon">
            <img
              class="edit-btn"
              src="./static/Edit.png"
              alt="edit"
              data-id="item"
            />
          </div>
          <div class="icon">
            <img
              class="delete-btn"
              src="./static/Delete.png"
              alt="delete"
              data-id="item"
            />
          </div>
        </div>
      </div>
      <div class="box-divider"></div>
      <div class="box-body">
        <p class="box-desc content">${task.content}</p>
        <div class="box-time">
          <img src="./static/time.png" alt="time" />
            <span class="time">${date.toLocaleString("default", {
              month: "long",
            })} ${date.getDate()} <span>,</span> ${date.getFullYear()}</span>
        </div>
      </div>
    </div>
    `;
    });

    // Tăng số lượng task trong danh sách
    todoCount.textContent = parseInt(todoCount.textContent) + 1;

    // khi submit thành công thì thêm 1 task mới vào danh sách
    const popup = document.getElementsByClassName("popup");
    const formAdd = document.getElementsByClassName("form-add");
    popup[0].classList.remove("visible");
    formAdd[0].classList.remove("visible");

    colBody[0].innerHTML += `
    <div class="box" id="item">
          <!-- ở đây -->
          <div class="box-head">
            <div class="box-title">
              <div class="category">${categoryInput.value}</div>
              <h3 class="title">${titleInput.value}</h3>
            </div>
            <div class="box-action">
              <div class="icon">
                <img
                  class="edit-btn"
                  src="./static/Edit.png"
                  alt="edit"
                  data-id="item"
                />
              </div>
              <div class="icon">
                <img
                  class="delete-btn"
                  src="./static/Delete.png"
                  alt="delete"
                  data-id="item"
                />
              </div>
            </div>
          </div>
          <div class="box-divider"></div>
          <div class="box-body">
            <p class="box-desc content">${contentInput.value}</p>
            <div class="box-time">
              <img src="./static/time.png" alt="time" />
                <span class="time">${date.toLocaleString("default", {
                  month: "long",
                })} ${date.getDate()} <span>,</span> ${date.getFullYear()}</span>
            </div>
          </div>
        </div>
        `;
    todoCount.textContent = parseInt(todoCount.textContent) + 1;
  }
  // Tạo chức năng cho nút delete
  const deleteTask = document.querySelectorAll(".delete-btn");
  deleteTask.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".box");
      item.remove();
      todoCount.textContent = parseInt(todoCount.textContent) - 1;
    });
  });

  // Tạo chức năng cho nút edit
  const editTask = document.querySelectorAll(".edit-btn");
  editTask.forEach((btn) => {
    btn.addEventListener("click", () => {
      const popup = document.getElementsByClassName("popup");
      const formEdit = document.getElementsByClassName("form-edit");
      popup[0].classList.add("visible");
      formEdit[0].classList.add("visible");
    });
  });
  // tạo chức năng nút close trong form edit
  const closeEdit = document.getElementsByClassName("btn-close-edit");
  closeEdit[0].addEventListener("click", () => {
    const popup = document.getElementsByClassName("popup");
    const formEdit = document.getElementsByClassName("form-edit");
    popup[0].classList.remove("visible");
    formEdit[0].classList.remove("visible");
  });
  // tạo chức năng cho nút submit của form edit
  const submitEdit = document.getElementById("submit-edit");
  submitEdit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("submit edit");
    function addBox(category, title, content, date) {
      colBody[0].innerHTML += `
          <div class="box" id="item">
              <div class="box-head">
                <div class="box-title">
                  <div class="category">${category}</div>
                  <h3 class="title">${title}</h3>
                </div>
                <div class="box-action">
                  <div class="icon">
                    <img
                      class="edit-btn"
                      src="./static/Edit.png"
                      alt="edit"
                      data-id="item"
                    />
                  </div>
                  <div class="icon">
                    <img
                      class="delete-btn"
                      src="./static/Delete.png"
                      alt="delete"
                      data-id="item"
                    />
                  </div>
                </div>
              </div>
              <div class="box-divider"></div>
              <div class="box-body">
                <p class="box-desc content">${content}</p>
                <div class="box-time">
                  <img src="./static/time.png" alt="time" />
                    <span class="time">${date.toLocaleString("default", {
                      month: "long",
                    })} ${date.getDate()} <span>,</span> ${date.getFullYear()}</span>
                </div>
              </div>
            </div>
            `;
    }
    function addBox1(category, title, content, date) {
      colBody[1].innerHTML += `
          <div class="box" id="item">
              <div class="box-head">
                <div class="box-title">
                  <div class="category">${category}</div>
                  <h3 class="title">${title}</h3>
                </div>
                <div class="box-action">
                  <div class="icon">
                    <img
                      class="edit-btn"
                      src="./static/Edit.png"
                      alt="edit"
                      data-id="item"
                    />
                  </div>
                  <div class="icon">
                    <img
                      class="delete-btn"
                      src="./static/Delete.png"
                      alt="delete"
                      data-id="item"
                    />
                  </div>
                </div>
              </div>
              <div class="box-divider"></div>
              <div class="box-body">
                <p class="box-desc content">${content}</p>
                <div class="box-time">
                  <img src="./static/time.png" alt="time" />
                    <span class="time">${date.toLocaleString("default", {
                      month: "long",
                    })} ${date.getDate()} <span>,</span> ${date.getFullYear()}</span>
                </div>
              </div>
            </div>
            `;
    }
    function addBox2(category, title, content, date) {
      colBody[2].innerHTML += `
          <div class="box" id="item">
              <div class="box-head">
                <div class="box-title">
                  <div class="category">${category}</div>
                  <h3 class="title">${title}</h3>
                </div>
                <div class="box-action">
                  <div class="icon">
                    <img
                      class="edit-btn"
                      src="./static/Edit.png"
                      alt="edit"
                      data-id="item"
                    />
                  </div>
                  <div class="icon">
                    <img
                      class="delete-btn"
                      src="./static/Delete.png"
                      alt="delete"
                      data-id="item"
                    />
                  </div>
                </div>
              </div>
              <div class="box-divider"></div>
              <div class="box-body">
                <p class="box-desc content">${content}</p>
                <div class="box-time">
                  <img src="./static/time.png" alt="time" />
                    <span class="time">${date.toLocaleString("default", {
                      month: "long",
                    })} ${date.getDate()} <span>,</span> ${date.getFullYear()}</span>
                </div>
              </div>
            </div>
            `;
    }
    if (document.getElementById("todo-check").checked) {
      const popup = document.getElementsByClassName("popup");
      const formEdit = document.getElementsByClassName("form-edit");
      popup[0].classList.remove("visible");
      formEdit[0].classList.remove("visible");
      const item = document.getElementById("item");
      item.remove();
      addBox(
        categoryEdit.value,
        titleEdit.value,
        contentEdit.value,
        new Date()
      );
    }
    if (document.getElementById("doing-check").checked) {
      const popup = document.getElementsByClassName("popup");
      const formEdit = document.getElementsByClassName("form-edit");
      popup[0].classList.remove("visible");
      formEdit[0].classList.remove("visible");
      const item = document.getElementById("item");
      // todoCount.textContent = parseInt(todoCount.textContent) - 1;
      // doingCount.textContent = parseInt(doingCount.textContent) + 1;
      item.remove();
      addBox1(
        categoryInput.value,
        titleInput.value,
        contentInput.value,
        new Date()
      );
    }
    if (document.getElementById("finished-check").checked) {
      const popup = document.getElementsByClassName("popup");
      const formEdit = document.getElementsByClassName("form-edit");
      popup[0].classList.remove("visible");

      item.remove();
      addBox2(
        categoryInput.value,
        titleInput.value,
        contentInput.value,
        new Date()
      );
    }
    const deleteTask = document.querySelectorAll(".delete-btn");
    deleteTask.forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".box");
        item.remove();
        todoCount.textContent = parseInt(todoCount.textContent) - 1;
      });
    });

    // Tạo chức năng cho nút edit
    const editTask = document.querySelectorAll(".edit-btn");
    editTask.forEach((btn) => {
      btn.addEventListener("click", () => {
        const popup = document.getElementsByClassName("popup");
        const formEdit = document.getElementsByClassName("form-edit");
        popup[0].classList.add("visible");
        formEdit[0].classList.add("visible");
      });
    });
  });
});

