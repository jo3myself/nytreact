import React from "react";

const styles = {
  line: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "lightgrey",
    padding: 25
  }
};

const Search = props =>
  <div className="container">
    <div className="row">
      <div className="col-lg-12" style={styles.line}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title text-center">
              <strong>
                Search
              </strong>
            </h3>
          </div>
          <div className="panel-body text-center">
            <form>
              <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <input onChange={props.handleTopicChange} type="text" className="form-control" id="topic" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label htmlFor="start-year">Start Year</label>
                <input onChange={props.handleStartYearChange} type="text" className="form-control" id="start-year" />
              </div>
              <div className="form-group">
                <label htmlFor="end-year">End Year</label>
                <input onChange={props.handleEndYearChange} type="text" className="form-control" id="end-year" />
              </div>
              <button onClick={props.handleFormSubmit} type="submit" className="btn btn-lg btn-outline-primary">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <br/><br/>

    <div className="row">
      <div className="col-lg-12">
        <div className="panel panel-primary">
          <div className="panel-heading" style={styles.line}>
            <h3 className="panel-title text-center">
              <strong>
                Results
              </strong>
            </h3>
          </div>
          <div className="panel-body">
            {props.renderArticles()}
          </div>
        </div>
      </div>
    </div>
    <br/><br/>
  </div>


export default Search;
