import React from "react";

class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    console.log(" props in forum search", this.props);
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
      </>
    );
  }
}

export default FormSearch;
