import { useState, type FormEvent } from "react";
import { IdeaBoard } from "../components/IdeaBoard";
import { RsvpResults } from "../components/RsvpResults";
import { PLANNING_PASSWORD, PLANNING_UNLOCK_KEY } from "../site";
import { readStore, writeStore } from "../storage";

function planningOpen() {
  return readStore(PLANNING_UNLOCK_KEY) === "yes";
}

export function Planning() {
  const [open, setOpen] = useState(planningOpen);
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (guess.trim().toLowerCase() === PLANNING_PASSWORD) {
      writeStore(PLANNING_UNLOCK_KEY, "yes");
      setOpen(true);
      return;
    }
    setWrong(true);
  }

  if (!open) {
    return (
      <article className="stack">
        <form className="invite inner-invite" onSubmit={onSubmit}>
          <p className="eyebrow">Kate keep out....</p>
          <h1>Planning HQ</h1>
          <p className="lede">for the girls only</p>
          <label className="field">
            <span>Planning password</span>
            <input
              type="password"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
                setWrong(false);
              }}
              placeholder="different from the front door"
            />
          </label>
          {wrong ? <p className="err">That's the front-door one, or a typo.</p> : null}
          <button type="submit" className="btn">
            Open the notebook
          </button>
        </form>
      </article>
    );
  }

  return (
    <article className="stack">
      <header className="page-head">
        <p className="eyebrow">Kate keep out....</p>
        <h1>Planning HQ</h1>
        <p className="lede">for the girls only</p>
      </header>

      <IdeaBoard />

      <RsvpResults />
    </article>
  );
}
