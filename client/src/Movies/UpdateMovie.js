import React, { useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";


const UpdateMovie = (props) => {
  const params = useParams();

  const id = params.id;
  const currentMovie = props.list[id];
  
  //console.log(currentMovie);

  const initialState = {
    //Why isn't this working?
    //title: props.list[id].title,
    //director: props[id].director,
    //metascore: props[id].metascore,
    //stars: props[id].stars,
    title: "",
    director: "",
    metascore: "",
  };

  const [formState, setFormState] = useState(initialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({...formState, [name]:value})
  };

  const handleUpdateMovie = (evt) => {
    evt.preventDefault();
    const updatedData = {...currentMovie, ...formState };
    
    axios.put(`http://localhost:5000/api/movies/${id}`, updatedData)
    .then(res => {
      window.location.href = "/";
      setFormState(initialState);
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <div>
      <form onSubmit={handleUpdateMovie}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={formState.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="director"
          value={formState.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="metascore"
          placeholder="metascore"
          value={formState.metascore}
          onChange={handleChange}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
