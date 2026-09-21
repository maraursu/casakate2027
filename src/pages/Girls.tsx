import { asset } from "../asset";
import { girls } from "../site";

type Girl = (typeof girls)[number];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Face({ girl }: { girl: Girl }) {
  return (
    <>
      {girl.photo ? (
        <div className="girl-halo">
          {girl.bride ? (
            <span className="bride-stars" aria-hidden="true">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </span>
          ) : null}
          <div className="girl-photo">
            <img
              src={asset(girl.photo)}
              alt={girl.name}
              style={{
                objectPosition: girl.crop,
                transform: girl.zoom ? `scale(${girl.zoom})` : undefined,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="girl-initials" aria-hidden="true">
          {initials(girl.name)}
        </div>
      )}
      <h2>{girl.name}</h2>
    </>
  );
}

export function Girls() {
  const kate = girls.find((girl) => girl.bride);
  const others = girls.filter((girl) => !girl.bride);

  return (
    <article className="stack tight">
      <header className="page-head">
        <h1>the girlsssss</h1>
      </header>

      <ul className="girl-orbit">
        {kate ? (
          <li className="girl-card bride">
            <Face girl={kate} />
          </li>
        ) : null}
        {others.map((girl, i) => (
          <li
            key={girl.name}
            className="girl-card"
            style={{ ["--deg" as string]: `${(i * 360) / others.length}deg` }}
          >
            <Face girl={girl} />
          </li>
        ))}
      </ul>
    </article>
  );
}
