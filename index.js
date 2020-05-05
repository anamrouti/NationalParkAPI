'use strict'

const searchURL = "https://developer.nps.gov/api/v1/parks";
const api_key = "e6veB9RwEXnBjL6yAZAmwR3hl3XvZj6iW5upHHsq";


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getParks(state, maxResults=10){
    const params = {
        key: api_key,
        q: query,
        stateCode: state,
        maxResults
    };

    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    fetch(url)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(JSON.stringify(responseJson)))
        .catch(error => {
            $('#js-error-message').text(`Something went wrong. Try again`);
        });
}


function displayResults(responseJson){
    console.log(responseJson);

    $('#results-list').empty();

    for (i = 0; i < responseJson.message.limit; i++) {

        $('#results-list').append(`
        <li><h3>${responseJson.item[i].stateCode.}`)
    }
}