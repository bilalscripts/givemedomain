const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b8116117a4msh1dc03e971dc3dd5p15fae5jsn0782a0ea8bac",
    "X-RapidAPI-Host": "domaination.p.rapidapi.com",
  },
};

let btn = document.getElementById("search");

var ul = document.getElementById("domain-name-list");

let select = document.getElementById("select");

btn.addEventListener("click", async (event) => {
  var ul = document.getElementById("domain-name-list");
  const domainData = [];
  ul.innerHTML = "";
  const list = [];
  let loading = document.getElementById("loading");
  loading.classList.remove("loading-hide");
  loading.classList.add("loading-show");
  let domainName = document.getElementById("domain-name").value;
  domainData.push(domainName.split(" ").join(""));
  if (domainName) {
    let data = await fetch(
      `https://api.datamuse.com//words?ml=${domainName}`,
      (error) => {
        console.log("there is an error in fetching data");
      }
    );

    var result = await data.json();

    if (result.length > 0) {
      result.length = 10;
      for (i of result) {
        domainData.push(i.word.split(" ").join(""));
      }
    }

    var value = select.options[select.selectedIndex].value;
    for (word of domainData) {
      let domainInfo = await fetch(
        `https://domaination.p.rapidapi.com/domains/${word}${value}`,
        options
      );
      const isavailable = await domainInfo.json();

      list.push(
        `${isavailable.domain.name}  ${
          isavailable.domain.isAvailable
            ? " is Available <<------"
            : " is Not Available"
        }`
      );
    }
    loading.classList.remove("loading-show");
    loading.classList.add("loading-hide");
    for (item of list) {
      var li = document.createElement("li");
      li.setAttribute("class", "list-item");
      li.innerHTML = item;
      ul.appendChild(li);
    }
  }
});
