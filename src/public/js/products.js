/*
function getQueryParams() { //Obtengo la url
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

function changePage(page) { 
    const params = getQueryParams();
    params.page = page;
    const queryString = new URLSearchParams(params).toString();
    window.location.href = './products?' + queryString;
}
*/