const searchForm = document.getElementById("searchForm");
const searchField = document.getElementById("searchField");
const timeForm = document.getElementById("timeForm");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const logList = document.getElementById("logList");
const access_token = JSON.parse(localStorage.getItem("access_token"));
console.log(access_token);

window.onload = () => {
  fetch("http://127.0.0.1:8000/api/v1/log_list/", { method: "GET", headers: { "Authorization": "Bearer " + access_token, "Content-Type": "application/json" } })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach((element, eleIndex) => {
        let elementKeys = Object.keys(element);
        let logData = elementKeys.splice(elementKeys.indexOf("data"), 1);
        let logDataKeys = Object.keys(element[logData]);
        $("#logList").append(`
          <div class="card" style="width: 18rem;">
                  <div class="card-body" id=${eleIndex}>
                  </div>
                  <ul class="list-group list-group-flush" id=${"list" +
          eleIndex}></ul>
              </div>
          `);
        $("#" + eleIndex).on("click", () => {
          localStorage.setItem("element", JSON.stringify(element));
          window.location = ``;
        });
        elementKeys.forEach((elementKey, elementKeyIndex) => {
          if (elementKeyIndex === 2) {
            return;
          }
          $("#" + eleIndex).append(`
            <p class="card-text">${elementKey}: ${element[elementKey]}</p>
            `);
        });
        logDataKeys.forEach((logDataKey, i) => {
          if (i === 3) {
            return;
          }
          $("#list" + eleIndex).append(`
          <li class="list-group-item">${logDataKey}: ${
            element[logData][logDataKey]
            }</li>
          `);
        });
      });
    });
};

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  if (searchField.value == "") {
    alert("Write something to search!!");
    return;
  }
  console.log(searchField.value);
});

timeForm.addEventListener("submit", e => {
  e.preventDefault();
  if (fromDate.value == "" && toDate.value == "") {
    alert("Enter Date!!");
    return;
  }
  console.log(fromDate.value);
  console.log(toDate.value);
});