import React from "react";
import axios from "axios";

const initialState = {
  id: new Date(),
  title: "",
  director: "",
  metascore: "",
  stars: ["", "", ""],
};

export default class AddMovie extends React.Component {
  constructor() {
    super();
    this.state = {
      formState: initialState,
    };
  }

  handleChange = (evt) => {
    const { name, value, id } = evt.target;
    if (name.substring(5, 0) === "stars") {
      console.log("if")
      let newStars = [...this.state.formState.stars];
      let star = newStars[id];
      star = value;
      newStars[id] = star;
      this.setState({ formState: { ...this.state.formState, stars: newStars }})
    } else {
      this.setState({ formState: { ...this.state.formState, [name]: value } });
    }
  };

  handleAddMovie = (evt) => {
    evt.preventDefault();
    axios.post(`http://localhost:5000/api/movies`, this.state.formState)
    .then((res) => {
      this.setState({ formState: initialState });
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddMovie}>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={this.state.formState.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="director"
            placeholder="director"
            value={this.state.formState.director}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="metascore"
            placeholder="metascore"
            value={this.state.formState.metascore}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="stars 1"
            id={0}
            placeholder="star 1"
            value={this.state.formState.stars[0]}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="stars 2"
            id={1}
            placeholder="star 2"
            value={this.state.formState.stars[1]}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="stars 3"
            id={2}
            placeholder="star 3"
            value={this.state.formState.stars[2]}
            onChange={this.handleChange}
          />
          <button>Add New Movie</button>
        </form>
      </div>
    );
  }
}
