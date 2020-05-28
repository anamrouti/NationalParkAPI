'use strict'

const searchURL = "https://developer.nps.gov/api/v1/parks";
const api_key = "e6veB9RwEXnBjL6yAZAmwR3hl3XvZj6iW5upHHsq";


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getParks(state, maxResults, term){
    const params = {
        api_key: api_key,
        q: term,
        stateCode: state,
        limit: maxResults,
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
        //.then(responseJson => console.log(JSON.stringify(responseJson)))
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#js-error-message').text(`Something went wrong. Try again`);
        });
};



function displayResults(responseJson){
    var mylength = responseJson["data"].length;    
    
    for(i=0; i<mylength; i++){
    
    $('#results-list').append(`
        <li><h3>${responseJson["data"][i].fullName}</h3></li>
        <p>${responseJson["data"][i].description}</p>
        <a href="${responseJson["data"][i].url}">${responseJson["data"][i].url}</a></li>`);
    }
    $('#results').removeClass('hidden');
    
    //console.log(responseJson["data"]);

    //$('#results-list').empty();
   
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const stateCode = $('#js-parkState').val();
        const maxResults = $('#js-maxResults').val();
        const searchTerm = $('#js-searchTerm').val();
        getParks(stateCode, maxResults, searchTerm);

    });
}

$(watchForm);