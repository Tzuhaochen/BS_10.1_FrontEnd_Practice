import React from "react";

// props can be attrbutes passed to our componants
const person = props => {
  return (
    <div>
      <p>
        I'm {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      {/* //If u want to pass any props which is not include in APP.js */}
    </div>
  );
};

//var person =  function person() {
// }

export default person;
