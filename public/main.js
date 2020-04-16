(function IIFE() {
    let searchInput = document.getElementById('search');
    let searchButton = document.getElementById('do-search');
    let searchResults = document.getElementById('search-results');

    searchButton.addEventListener("click", function() {
        let query = searchInput.value;
        fetchSearch(query, searchResults);
    });

    searchInput.addEventListener("keyup", function(event) {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }

        if (event.keyCode === 13) {
            let query = searchInput.value;
            fetchSearch(query, searchResults);
        }
    });
})();

function fetchSearch(query, container) {
    fetch(`/search/${query}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            renderTable(result.data, container);
        });
}

function renderTable(courses, container) {
    console.log(courses)
    if (!container) {
        return;
    }

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    thead.innerHTML = "<tr><th>År</th><th>LP</th><th>Kurskod</th><th>Namn</th><th>Prestationsgrad</th><th>Index</th></tr>";

    table.appendChild(thead);

    let currentCode = "";
    let color = false;

    courses.forEach(function(c) {
        if (currentCode != c.course_code) {
            color = !color;
            currentCode = c.course_code;
        }


        let tr = document.createElement("tr");

        if (color) {
            tr.className = "row-background";
        }

        let performanceClass = c.performance_rate > 0.7 ?
                                "high" :
                                c.performance_rate < 0.5 ?
                                "low": "normal";
        let indexClass = c.eval_index > 3.3 ?
                                "high" :
                                c.eval_index < 2.5 ?
                                "low": "normal";

        tr.innerHTML = `<td>${c.year}</td><td>${c.study_period}</td><td>${c.course_code}</td><td>${c.name}</td><td class="${performanceClass}">${Math.round(c.performance_rate * 100)}%</td><td class="${indexClass}">${c.eval_index}</td>`;

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}
