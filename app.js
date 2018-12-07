var buttons = document.querySelectorAll('button');

buttons.forEach(function(btn){
  btn.addEventListener('click', function(e){
    var language = e.target.textContent.toLowerCase();
    const request = superagent;

    if(language === "all"){
      var apiEndpoint = 'https://restcountries.eu/rest/v2/all';
    }
    else{
      var apiEndpoint = 'https://restcountries.eu/rest/v2/lang/' + language;
    }

    request
      .get(apiEndpoint)
      .then(function(response){
        var container = document.querySelector('tbody');
        var counter = document.querySelector("strong");
        var template = "";
        var countries = response.body;

        countries.forEach(function(country){
          template += `<tr>
                        <td>${country.name}</td>
                        <td>${country.latlng[0]}</td>
                        <td>${country.latlng[1]}</td>
                        <td><img src="${country.flag}" alt="flag"></td>
                      </tr>`
        })
        container.innerHTML = template;
        counter.textContent = countries.length;
      })
      .catch(function(error){
        console.log(error);
      })
  })
})
