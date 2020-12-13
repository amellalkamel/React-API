import React from "react";
class Child1 extends React.Component {
  render() {
    return <div>The data from parent is:{this.props.data1} </div>;
  }
}

export default Child1;
