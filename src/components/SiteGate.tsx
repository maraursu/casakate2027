import { useState, type FormEvent, type ReactNode } from "react";
import { asset } from "../asset";
import {
  event,
  SITE_PASSWORD,
  SITE_UNLOCK_KEY,
} from "../site";
import { readStore, writeStore } from "../storage";

function isUnlocked() {
  return readStore(SITE_UNLOCK_KEY) === "yes";
}

export function SiteGate({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(isUnlocked);
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (guess.trim().toLowerCase() === SITE_PASSWORD) {
      writeStore(SITE_UNLOCK_KEY, "yes");
      setOpen(true);
      return;
    }
    setWrong(true);
  }

  if (open) return children;

  return (
    <div className="gate">
      <img className="vignette gate-vignette left" src={asset("/motifs/ladybugs.jpg")} alt="" />
      <img className="vignette gate-vignette right" src={asset("/motifs/moon.jpg")} alt="" />
      <form className="invite" onSubmit={onSubmit}>
        <p className="eyebrow">You're invited</p>
        <h1>{event.title}</h1>
        <p className="invite-meta">
          {event.place}
          <br />
          {event.dates}
        </p>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setWrong(false);
            }}
            placeholder="the one from the group chat"
          />
        </label>
        {wrong ? <p className="err">Not that one — try again.</p> : null}
        <button type="submit" className="btn">
          Enter at ur own risk ;)
        </button>
      </form>
    </div>
  );
}
