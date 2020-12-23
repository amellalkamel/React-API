import React from "react";
import FormSearch from "./FormSearch";
import Info from "./Info";
import ReactPaginate from "react-paginate";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      search: "",
      step: 1,
      avatar: "",
      name: "",
      email: "",
      age: "",
      filter: "title",
      resultsAPI: [],
      initial: [],
      NewARRay: [],
      currentPage: 0,
      perPage: 5,
    };
  }
  async componentWillMount() {
    const x = await fetch(
      "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=761c349ec59f4915ab84e9ff1fb27f6d"
    );

    x.json().then(async (data) => {
      console.log("data is ", data);
      await this.setState({
        initial: [...data.articles],
      });
      await this.setState({
        resultsAPI: [...this.state.initial],
      });
      var slice = this.state.initial.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      console.log("slice -----------", slice);
      this.setState({
        pageCount: Math.ceil(data.articles.length / this.state.perPage),
        initial: data.articles,
        resultsAPI: slice,
      });
      console.log("pageCount---------->", this.state.pageCount);
      console.log("resultsAPI -------------->", this.state.resultsAPI);
    });
  }
  handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    console.log("-------------- on change function ------------");
    console.log("resultsAPI ----->", this.state.resultsAPI);
    console.log("initial ----->", this.state.initial);

    await this.setState({
      resultsAPI: [...this.state.initial],
    });

    if (this.state.filter === "title") {
      this.setState({
        NewARRay: this.state.resultsAPI.filter((r) => r.title.includes(value)),
      });
    } else if (this.state.filter === "author") {
      this.setState({
        NewARRay: this.state.resultsAPI.filter((r) =>
          r.author ? r.author.includes(value) : null
        ),
      });
    } else {
      this.setState({
        NewARRay: this.state.resultsAPI.filter((r) =>
          r.source.name.includes(value)
        ),
      });
    }
    console.log(
      "NewARRay ----------->",
      this.state.NewARRay,
      "NewARRay lenght ------->",
      this.state.NewARRay.length
    );
    await this.setState({
      resultsAPI: [...this.state.NewARRay],
    });
    var slice = this.state.NewARRay.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(this.state.NewARRay.length / this.state.perPage),
      resultsAPI: slice,
    });
    console.log("pageCount ---------->", this.state.pageCount);
  };
  handleCheck = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };
  loadMoreData = () => {
    //data = les 20 data
    if (this.state.search) {
      console.log("you have a data to search", this.state.NewARRay);
      const data = this.state.NewARRay;

      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        resultsAPI: slice,
      });
    } else {
      console.log("this.state.initial -------->", this.state.initial);
      const data = this.state.initial;

      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      console.log("slice ============>", slice);
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        resultsAPI: slice,
      });
    }
  };
  render() {
    return (
      <>
        <FormSearch
          {...this.state}
          handleChange={this.handleChange}
          handleClick={this.handlePageClick}
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
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </>
    );
  }
}

export default Form;
