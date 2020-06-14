(function () {
  let categoryTemplate = `
<div id="category" class="category">
  <div>
    <h1 class="categoryHeader">{{name}}</h1>
  </div>
  <div class="menuItems">
    {{menuItems}}
  </div>
</div>`;

  let menuItemTemplate = `
  <div class="menuItem">
    <div>{{name}}</div>
    <div>\${{price}}</div></div>
  <div class="description">
    {{description}}
  </div>`;

  var prom = fetch("../api/menu");

  prom
    .then((data) => {
      return data.json();
    })
    .then((menu) => {
      console.log(menu);
      renderOldSchool(menu);

      renderFromTemplate(menu);
    });

  prom.catch((error) => {
    console.log("Error:", error);
  });

  function renderOldSchool(menu) {
    for (let i = 0; i < menu.length; i++) {
      let category = menu[i];
      console.log(category.id, category.categoryName);

      let categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");

      let categoryHeaderH1 = document.createElement("h1");
      categoryHeaderH1.innerHTML = category.categoryName;

      categoryDiv.appendChild(categoryHeaderH1);

      let itemsDiv = document.createElement("div");
      categoryDiv.appendChild(itemsDiv);

      for (let menuItem of category.menuItems) {
        console.log(menuItem);

        let menuItemDiv = document.createElement("div");
        menuItemDiv.innerHTML = `${menuItem.name}.....${menuItem.price}`;

        itemsDiv.appendChild(menuItemDiv);
      }

      let menuDiv = document.getElementById("menu");
      menuDiv.appendChild(categoryDiv);
    }
  }

  function renderFromTemplate(menuArr) {
    for (let category of menuArr) {
      let catTeml = categoryTemplate.replace("{{name}}", category.categoryName);

      let itemsHTML = "";
      for (let menuItem of category.menuItems) {
        itemsHTML += renderMenuItem(menuItem);
      }

      catTeml = catTeml.replace("{{menuItems}}", itemsHTML);

      let div = document.createElement("div");
      div.innerHTML = catTeml;

      let menuDiv = document.getElementById("menu");
      menuDiv.appendChild(div);
    }
  }

  function renderMenuItem(menuItem) {
    let menuItemHTML = menuItemTemplate.replace("{{name}}", menuItem.name);
    menuItemHTML = menuItemHTML.replace("{{price}}", menuItem.price);
    menuItemHTML = menuItemHTML.replace(
      "{{description}}",
      menuItem.description
    );

    return menuItemHTML;
  }
})();
