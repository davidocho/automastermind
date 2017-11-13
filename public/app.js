(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
          headers: {
            Authorization: 'Client-ID f5d7f88db4afbafc9cbeb9b4cbfc7538930d64885a2098c63f64efb79b091c45'
          }
        })
        .then(response => response.json())
        .then(addImage)
        .catch(e => requestError(e, 'image'));
      
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=b8fb6929c9e24808bb8422acf4ab35fd`)
        .then(response => response.json())
        .then(addArticles)
        .catch(err => requestError(err, 'articles'));
    });

    
    function addImage(data) {
       let htmlContent = '';

       if (data&& data.results && data.results.length > 1) {
          const firstImage = data.results[0];
          htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaptions>${searchedForText} by ${firstImage.user.name}</figcaptions>
          </figure>`;
       } else {
           htmlContent = '<div class="error-no-image">No images available</div>';
       }
       responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    function addArticles(data) {
       let htmlContent = '';

       if (data.response && data.response.docs && data.response.docs.length > 1) {
          const articles = data.response.docs;
          htmlContent = '<ul>' + articles.map(article => `<li class="article" >
              <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
              <p>${article.snippet}</p>
             </li>`
          ).join('') + '</ul>';
       } else {
         htmlContent = '<div class="error-no-articles">No articles available</div>';
       }
       responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    
    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }

})();
