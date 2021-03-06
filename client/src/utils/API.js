import axios from "axios";

export default {
  // Search articles topic
  searchArticle: function(topic, startYear, endYear) {
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
    return axios.get(queryURL);
  },
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Deletes article
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves article to the database
  saveArticle: function(bookData) {
    return axios.post("/api/articles", bookData);
  }
};
