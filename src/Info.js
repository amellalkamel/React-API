import React from "react";

class Info extends React.Component {
  constructor(props) {
    super(props);
    console.log(" props in info", this.props);
  }
  render() {
    return (
      <div className="contact-card">
        <img
          src="https://static3.seekingalpha.com/assets/og_image_192-59bfd51c9fe6af025b2f9f96c807e46f8e2f06c5ae787b15bf1423e6c676d4db.png"
          alt="profile"
        />
        <div className="user-details">
          <p>author: {this.props.author}</p>
          <p>publishedAt: {this.props.publishedAt}</p>
          <p>title: {this.props.title}</p>
        </div>
      </div>
    );
  }
}
export default Info;
