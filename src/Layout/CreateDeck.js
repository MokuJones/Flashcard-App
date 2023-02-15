import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const initialState = {
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState(initialState);

  function handleChange({ target }) {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck({ ...newDeck }, abortController.signal);
    history.push("/");
    return response;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">Create Deck</li>
      </ol>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1>Create Deck</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            onChange={handleChange}
            value={newDeck.name}
            placeholder="Deck Name"
          />
          <br />
          <label>Description</label>
          <textarea
            id="description"
            name="description"
            type="text"
            className="form-control"
            onChange={handleChange}
            value={newDeck.description}
            placeholder="Brief description of the text"
          />
        </div>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
        <button className="btn btn-primary mx-1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
