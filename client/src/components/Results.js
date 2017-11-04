import React from "react";

const Results = props =>
  <div>
    <li className="list-group-item">
      <h4>
        <span>
          <a href={props.url} target="_blank"><em>{props.title}</em></a>
        </span>
        <span className="pull-right">
          <button className="btn btn-outline-success" onClick={() => props.handleSaveButton(props._id)}>Save</button>
        </span>
      </h4>
      <p>Date Published: {props.date}</p>
    </li>
  </div>

export default Results;
