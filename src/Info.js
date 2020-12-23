import React from "react";

class Info extends React.Component {
  constructor(props) {
    super(props);
    // console.log(" props in info", this.props);
  }
  render() {
    return (
      <div className="contact-card">
        <img src={this.props.avatar} alt="profile" />
        <div className="user-details">
          <p>author: {this.props.author}</p>
          <p>Date de publication: {this.props.publishedAt}</p>
          <p>title: {this.props.title}</p>
          <p>name: {this.props.name}</p>
        </div>
      </div>
    );
  }
}
export default Info;
