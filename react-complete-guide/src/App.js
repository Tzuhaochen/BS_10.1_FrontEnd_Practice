import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
      { name: "Stephanie", age: 26 }
    ]
  };
  render() {
    return (
      <div className="App">
        <h1>Hi,I am a React App.</h1>
        <p>This is Really working</p>
        <button>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        ></Person>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
        >
          My Hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        ></Person>
      </div>
    );
    //return React.createElement("div", null, "hi, I'm a React APP!!"); actually compile
  }
}
// 10/1
// function App() {
//   return (
//     <div className="App">
//       <h1>Hi,I am a React App.</h1>
//       <p>This is Really working</p>
//       <button>Switch Name</button>
//       <Person name="Max" age="28"></Person>
//       <Person name="Manu" age="29">
//         My Hobbies: Racing
//       </Person>
//       <Person name="Stephanie" age="30"></Person>
//     </div>
//   );
//   //return React.createElement("div", null, "hi, I'm a React APP!!"); actually compile
// }

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>Hi,I am a React App.</h1>
//       </div>
//     );
//   }
// }

export default App;
