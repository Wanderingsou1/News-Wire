const API_KEY = "440eb71d41614f1c8d12156b5e9d8a45";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach(function(article) {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.getElementById("news-img");
  const newsTitle = cardClone.getElementById("news-title");
  const newsSource = cardClone.getElementById("news-source");
  const newsDesc = cardClone.getElementById("news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} ▫ ${date}`;

  cardClone.firstElementChild.addEventListener("click", function () {
    window.open(article.url, "_blank");
  });
}


let curSelectedNav = document.getElementById('india');
curSelectedNav.classList.add('active');

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav = navItem;
  curSelectedNav.classList.add('active'); 
}

const searchBtn = document.getElementById("search-btn");
const searchText = document.getElementById("search-text");

searchBtn.addEventListener('click', () => {
  const query = searchText.value;
  if(!query) return;
  fetchNews(query);
  curSelectedItem = null;
  curSelectedNav?.classList.remove('active');
});

searchText.addEventListener("keypress", function(event) {
  if(event.key === "Enter") {
    searchBtn.click();
  }
});
