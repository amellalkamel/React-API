import React from "react";
import FormSearch from "./FormSearch";
import Info from "./Info";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      search: "",
      step: 1,
      avatar: "",
      name: "",
      email: "",
      age: "",
      filter: "title",
      resultsAPI: [],
      initial: [],
    };
  }
  async componentWillMount() {
    const x = await fetch(
      "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=761c349ec59f4915ab84e9ff1fb27f6d"
    );

    x.json().then(async (data) => {
      // console.log("data is ", data);
      await this.setState({
        initial: [...data.articles],
      });
      await this.setState({
        resultsAPI: [...this.state.initial],
      });
    });
  }
  handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    await this.setState({
      resultsAPI: [...this.state.initial],
    });
    console.log("this.state.filter", this.state.filter);
    var NewARRay = [];
    if (this.state.filter === "title") {
      NewARRay = this.state.resultsAPI.filter((r) => r.title.includes(value));
    } else if (this.state.filter === "author") {
      NewARRay = this.state.resultsAPI.filter((r) => r.author.includes(value));
    } else {
      NewARRay = this.state.resultsAPI.filter((r) =>
        r.source.name.includes(value)
      );
    }

    await this.setState({
      resultsAPI: [...NewARRay],
    });
  };
  handleCheck = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleClick = (event) => {};
  render() {
    return (
      <>
        <FormSearch
          {...this.state}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleCheck={this.handleCheck}
        />
        <br />
        <ul>
          {this.state.resultsAPI.map((results, index) => (
            <Info
              key={index}
              avatar={results.urlToImage}
              name={results.source.name}
              author={results.author}
              publishedAt={results.publishedAt}
              title={results.title}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default Form;
