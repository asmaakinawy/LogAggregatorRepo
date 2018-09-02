const element = JSON.parse(localStorage.getItem("element"));

if (element) {
  console.log(element);
  let elementKeys = Object.keys(element);
  let logData = elementKeys.splice(elementKeys.indexOf("data"), 1);
  let logDataKeys = Object.keys(element[logData]);
  $("#log").append(`
          <div class="card" style="width: 18rem;">
                  <div class="card-body" id="elementId">
                  </div>
                  <ul class="list-group list-group-flush" id="listelementId"></ul>
              </div>
          `);
  $("#elementId").on("click", () => {
    localStorage.setItem("element", JSON.stringify(element));
    window.location = `api/v1/log_detail`;
  });
  elementKeys.forEach((elementKey, elementKeyIndex) => {
    $("#elementId").append(`
            <p class="card-text">${elementKey}: ${element[elementKey]}</p>
            `);
  });
  logDataKeys.forEach((logDataKey, i) => {
    $("#listelementId").append(`
          <li class="list-group-item">${logDataKey}: ${
      element[logData][logDataKey]
    }</li>
          `);
  });
}