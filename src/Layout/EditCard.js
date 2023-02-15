import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const initialCardState = {
    id: "",
    front: "",
    back: "",
  };
  const [deck, setDeck] = useState(initialDeckState);
  const [card, setCard] = useState(initialCardState);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        const cardResponse = await readCard(cardId, abortController.signal);
        setDeck(deckResponse);
        setCard(cardResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => abortController.abort();
    }
    fetchData();
  }, []);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Card {cardId}</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <h2>Edit Card</h2>
        <div className="form-group">
          <label>Front</label>
          <textarea
            id="front"
            name="front"
            type="text"
            className="form-control"
            handleChange={handleChange}
            value={card.front}
          />
          <br />
          <label>Back</label>
          <textarea
            id="back"
            name="back"
            type="text"
            className="form-control"
            handleChange={handleChange}
            value={card.back}
          />
        </div>
        <button
          onClick={() => history.push(`/decks/${deckId}`)}
          className="btn btn-secondary mx-1"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mx-1">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
