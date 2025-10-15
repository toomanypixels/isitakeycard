let url = "https://pyanywhereacc.pythonanywhere.com/table"
let main_table = document.getElementById("main-table")
let main_body = document.getElementById("main-body")
let main_table_body = document.getElementById("main-table-body")
let dark_mode_toggle = document.getElementById("dark-mode-toggle")
let options ={
  valueNames: ['game', 'publisher', 'ts']
}

var list_js_init

async function getData(url) {
  fetch(url, {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network error")
      }
      return response.json()
    })
    .then(data => {
      for (let index = 1; index < Object.keys(data).length; index++) {
        let row = main_table_body.insertRow();
        let col1Data = row.insertCell(0)
        let col2Data = row.insertCell(1)
        let col3Data = row.insertCell(2)

        col1Data.innerHTML = data[index]['game'].trim()
        col2Data.innerHTML = data[index]['publisher'].trim()
        col1Data.setAttribute("class", "game")
        col2Data.setAttribute("class", "publisher")

        var temp = document.createElement("span")
        temp.setAttribute("class", "release")
        temp.innerHTML = data[index]['release'].trim()
        col3Data.appendChild(temp)
        
        
        var temp2 = document.createElement("span")
        temp2.setAttribute("class", "ts")
        temp2.innerHTML = data[index]['ts']
        col3Data.appendChild(temp2)
        temp2.setAttribute("style", "display:none;")

      }
    }).then(()=>{
      list_js_init = new List('main-table', {
        valueNames: ['game', 'publisher', 'ts']
      });
    })
  .catch(error => console.error(error))
}


$(document).ready(function () {
  getData(url)
  
});

$("#search-bar").on('keyup', function() {
  var searchString = $(this).val();
  list_js_init.search(searchString);
});



dark_mode_toggle.onclick = function toggleDarkMode() {
    if (main_body.classList.contains("active")){
      main_body.classList.remove("active")
      main_body.classList.add("inactive")
      dark_mode_toggle.innerHTML = "Dark Mode"
      
    }
    else{
      main_body.classList.remove("inactive")
      main_body.classList.add("active")
      dark_mode_toggle.innerHTML = "Light Mode"
    }
    
}
