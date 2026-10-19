import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { asset } from "../asset";
import { airports, needs, packing, recs, rooms, stay } from "../site";
import { readStore, writeStore } from "../storage";

const PACK_KEY = "kate-bach-pack";

export function Logistics() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = readStore(PACK_KEY);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, []);

  function toggle(item: string) {
    setChecked((prev) => {
      const next = { ...prev, [item]: !prev[item] };
      writeStore(PACK_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <article className="stack tight">
      <header className="page-head">
        <h1>Travel & accommodations</h1>
      </header>

      <section className="panel">
        <h2>Getting there</h2>
        <ol className="get-there">
          <li>
            <h3>1. Airports</h3>
            <ul className="cards">
              {airports.map((hub) => (
                <li key={hub.code} className="mini">
                  <p className="code">{hub.code}</p>
                  <h3>{hub.name}</h3>
                  <p>{hub.note}</p>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h3>2. Driving</h3>
            <p>
              Some of us will be driving up — we can{" "}
              <strong>carpool based on timing</strong>. Parking at the Airbnb.
            </p>
          </li>
        </ol>
        <p>
          Fill out the <Link to="/#rsvp">welcome survey</Link> so we can plan
          around everyone's schedule :)
        </p>
      </section>

      <section className="panel">
        <h2>The house</h2>
        <p className="status">{stay.status}</p>
        <h3 className="house-name">{stay.name}</h3>
        <div className="house-photos">
          <img src={asset("/rooms/house-exterior.jpeg")} alt="Airbnb exterior" />
          <img src={asset("/rooms/house-living.jpeg")} alt="Sunken living room with stone fireplace" />
        </div>
        <p className="house-address">{stay.address}</p>
        <p>{stay.vibe}</p>
        <p>{stay.area}</p>
        <p className="fine">
          <a href={stay.airbnb} target="_blank" rel="noreferrer">
            Open the Airbnb listing
          </a>
        </p>
        <h3 className="subhead">Rooms</h3>
        <ul className="room-grid">
          {rooms.map((room) => (
            <li key={room.name} className="room-card">
              <img src={asset(room.photo)} alt={room.name} />
              <div className="room-copy">
                <h3>{room.name}</h3>
                <p className="room-sleeps">{room.sleeps}</p>
                <p className="room-who">{room.who.trim() ? room.who : "Who: —"}</p>
                <p>{room.notes}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Recommendations</h2>
        <ul className="recs">
          {recs.map((rec) => (
            <li key={rec.title}>
              <h3>{rec.title}</h3>
              <p>{rec.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Packing</h2>
        <p className="fine">March: layers. Cool mornings, warmer afternoons.</p>
        <div className="pack-grid">
          {packing.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul className="checks">
                {group.items.map((item) => (
                  <li key={item}>
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(checked[item])}
                        onChange={() => toggle(item)}
                      />
                      <span>{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>What we need from you</h2>
        <ul className="vibe">
          {needs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
