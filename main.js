const box = document.querySelector(".box");
const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".inputs");

const render = (data) => {
  box.innerHTML = data.map(
    (item) => ` <div class="box_2">
    <h1 class = "title">${item.title}</h1>
    <h2 class="des">${item.description}</h2>
    <button data-id="${item.id}" class="btn_del">delete</button>
    </div>
  `
  ).join("")
};

const getData = () => {
  fetch("http://localhost:3600/todos")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      render(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getData();

box.addEventListener("click", (e) => {
  const deleteItem = e.target.dataset.id;
  if (deleteItem) {
    fetch(`http://localhost:3600/todos/${deleteItem}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        getData();
      });
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {};
  for (let i of inputs) {
    obj[i.name] = i.value;
    i.value = "";
  }
  fetch("http://localhost:3600/todos", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then(() => {
      getData();
    });
});


//aaaa