var searchElem = document.getElementById("search-input");
var posts;
function loadSearch() {
  // call the index.json file from server by http get request
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (data) {
          posts = data.items; // load json data
        }
      } else {
        console.log(xhr.responseText);
      }
    }
  };
  xhr.open("GET", "../project-showcase/index.json");
  xhr.send();
}
loadSearch(); // call loadsearch to load the json files
function showSearchResults() {
  var query = searchElem.value || ""; // get the value from input
  console.log(query);
  var searchString = query.replace(/[^\w\s]/gi, ""); // clear white spaces
  console.log(searchString);
  var target = document.getElementById("list"); // target the ul list to render the results
  console.log(target);
  var postsByTitle = posts.reduce((acc, curr) => {
    // map lunr search index to your articles
    acc[curr.title] = curr;
    return acc;
  }, {});
  // build lunr index file
  var index = lunr(function () {
    this.ref("title");
    this.field("content");
    posts.forEach(function (doc) {
      this.add(doc);
    }, this);
  });
  // search in lunr index
  if (searchString && searchString != "") {
    var matches = index.search(searchString);
    var matchPosts = [];
    matches.forEach((m) => {
      matchPosts.push(postsByTitle[m.ref]);
    });
    if (matchPosts.length > 0) {
      // match found with input text and lunr index
      target.innerHTML = matchPosts
        .map(function (p, index) {
          if (p != undefined) {
            var searchHtml = `
                        <a class="zoekresultaten" style="border-left:solid 2px #0075ff; border-right:solid 2px #0075ff" href='${p.url}'>
                          <table width='100%' ${index === matchPosts.length - 1 ? 'style="border-bottom: solid 2px #0075ff; border-radius: 10px"' : ''}>
                                <tr>
                                    <td min-width='90px' height='70px' class="searchimg"><img src=${p.image} ></td>
                                    <td min-width='170px' height='70px' class="searchtitle" >${p.title}</td>
                                    <td width=100% height='70px' class="SamenvattingSearch" >${p.samenvatting}</td>
                                    <hr class="hr-lijn">
                                </tr>
                            </table>
                        </a>`;

            return searchHtml;
          }
        })
        .join("");
    } else {
      // if no results found, then render a general message
      target.innerHTML = `<h2 class="tekstgeenzoekr" style="text-align:center">Geen zoekresultaten gevonden</h2>`;
    }
  } else {
    target.innerHTML = "";
  }
}
