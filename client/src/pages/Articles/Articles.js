import React, { Component } from "react";
import Saved from "../../components/Saved";
import Search from "../../components/Search";
import Results from "../../components/Results";
import API from "../../utils/API";

const styles = {
  line: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "lightgrey",
    padding: 25
  }
};

class Articles extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  // When the component mounts, get a list of all saved articles and update this.state.saved
  componentDidMount() {
    this.getSavedArticles()
  };

  // Method for getting saved articles (all articles) from the db
  getSavedArticles = () => {
  API.getArticles()
      .then(res =>
        this.setState({ saved: res.data })
      )
      .catch(err => console.log(err));
  };

  // Rendering one search results div for each article
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // Rendering one div for each saved article
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // Track user input so can be grabbed later
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  };

  // Track user input so can be grabbed later
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  };

  // Track user input so can be grabbed later
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  };

  // When the search form submits, perform api search with user topic
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Getting NYT Articles");
    console.log("this.state.topic: ", this.state.topic);
    console.log("this.state.startYear: ", this.state.startYear);
    console.log("this.state.endYear: ", this.state.endYear);
    API.searchArticle(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  };

  // When save article button is clicked, add article to db
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(res => this.getSavedArticles())
        .catch(err => console.log(err));
  };

  // When delete article button is clicked, remove article from db
  handleDeleteButton = id => {
    API.deleteArticle(id)
      .then(res => this.getSavedArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (

      <div className="main-container">
        <div className="container-fluid">
          <div className="jumbotron">
            <h1 className="text-center"><u><strong>New York Times Article Scrubber</strong></u></h1>
            <h4 className="text-center">Search for and annotate articles of interest!</h4>
          </div>
          {/* Search Form and Results Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />

          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading" style={styles.line}>
                    <h3 className="panel-title text-center">
                      <strong>
                        Saved Articles
                      </strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {this.renderSaved()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
        </div>
      </div>

    );
  }
}

export default Articles;
