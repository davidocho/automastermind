(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;

  //Add Image Request

    $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers: {
        	Authorization: 'Client-ID f5d7f88db4afbafc9cbeb9b4cbfc7538930d64885a2098c63f64efb79b091c45'
        }
    }).done(addImage)
      .fail(function (err) {
      	requestError(err, 'image');
      });
    
      //Add Article Request
    $.ajax({
        url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=b8fb6929c9e24808bb8422acf4ab35fd`,
    }).done(addArticles)
    .fail(function (err) {
      	requestError(err, 'articles');
      });
  });  

function addImage(images) {
    const firstImage = images.results[0];

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
    );
}

  function addArticles(data) {
  	let htmlContent = '';
  	if (data.response && data.response.docs && data.response.docs.length > 1) {
      const article = data.response.docs;
      responseContainer.insertAdjacentHTML('beforeend', '<ul>' + article.map(article => `<li class="article" >
    		<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
    		<p>${article.snippet}</p>
    	  </li>`
    	).join('') + '</ul>'
      );
    } else {
    	htmlContent = '<div class="error-no-articles">No articles available</div>';
    }
    function requestError (e, part) {
    	console.log(e);
    	responseContainer.insertAdjacentHTML('beforeend',  `<p class="network-warning error-no-articles"></p>`);	
    }
  }
})();