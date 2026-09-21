import type { Venue } from "../site";
import { days } from "../site";

function VenueCards({ venues }: { venues: Venue[] }) {
  return (
    <ul className="option-grid">
      {venues.map((spot) => (
        <li key={spot.name} className="option-card">
          <div className="option-tags">
            {spot.listed ? (
              <span className="tag butter">On our list</span>
            ) : null}
            {spot.nearby ? <span className="tag sky">Near the house</span> : null}
          </div>
          <h3>{spot.name}</h3>
          <p className="place-where">{spot.where}</p>
          <dl className="facts">
            <div>
              <dt>Large party</dt>
              <dd>{spot.group}</dd>
            </div>
            <div>
              <dt>Fee</dt>
              <dd>{spot.fee}</dd>
            </div>
            <div>
              <dt>Also know</dt>
              <dd>{spot.extra}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export function Agenda() {
  return (
    <article className="stack tight">
      <header className="page-head">
        <h1>Weekend agenda</h1>
      </header>

      <ol className="days">
        {days.map((day) => (
          <li key={day.key} className={`day day-${day.color}`}>
            <div className="day-head">
              <h2 className="day-name">
                {day.name}
                <span className="day-label"> - {day.label}</span>
              </h2>
              <p className="day-date">{day.date}</p>
            </div>
            <ol className="beats">
              {day.beats.map((beat) => (
                <li key={beat.title}>
                  <p className="beat-time">{beat.time}</p>
                  <h2>{beat.title}</h2>
                  <p className="beat-detail">{beat.detail}</p>
                  {beat.venues ? <VenueCards venues={beat.venues} /> : null}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </article>
  );
}
