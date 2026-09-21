import { useEffect, useState, type FormEvent } from "react";
import { RsvpResults } from "../components/RsvpResults";
import {
  PLANNING_PASSWORD,
  PLANNING_UNLOCK_KEY,
  planningLists,
} from "../site";
import { readStore, writeStore } from "../storage";

const NOTES_KEY = "kate-bach-planning-notes";

function planningOpen() {
  return readStore(PLANNING_UNLOCK_KEY) === "yes";
}

export function Planning() {
  const [open, setOpen] = useState(planningOpen);
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(readStore(NOTES_KEY) ?? "");
  }, []);

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

      <RsvpResults />

      {planningLists.map((list) => (
        <section key={list.title} className="panel">
          <h2>{list.title}</h2>
          <ul className="vibe">
            {list.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <section className="panel">
        <h2>Scratch pad</h2>
        <p className="fine">
          we can collab here!! use this google doc link if anyone has ideas for
          the weekend...&lt;3
        </p>
        <textarea
          className="notes"
          rows={10}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            writeStore(NOTES_KEY, e.target.value);
          }}
          placeholder="ideas for the weekend..."
        />
      </section>
    </article>
  );
}
