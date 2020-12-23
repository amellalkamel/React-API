import React from "react";

class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    // console.log(" props in forum search", this.props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="search-container">
          <form>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              value={this.props.search}
              onChange={this.props.handleChange}
            />
            <button onClick={this.props.handleClick}>Search</button>
          </form>
        </div>
        <div className="filter-container">
          <p>Select your filter</p>
          <label>
            author:
            <input
              type="radio"
              name="filter"
              id="author"
              value="author"
              onChange={this.props.handleCheck}
            />
          </label>
          <label>
            title:
            <input
              type="radio"
              name="filter"
              id="title"
              value="title"
              onChange={this.props.handleCheck}
            />
          </label>
          <label>
            name:
            <input
              type="radio"
              name="filter"
              id="name"
              value="name"
              onChange={this.props.handleCheck}
            />
          </label>
        </div>
      </>
    );
  }
}

export default FormSearch;
