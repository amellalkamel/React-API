import React from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";

class Parent extends React.Component {
  state = { data: "Hello World", data1: "hello child1" };
  render() {
    return (
      <div>
        <Child1 {...this.state} />
        <Child2 dataFromParent={this.state.data} />
      </div>
    );
  }
}
export default Parent;
