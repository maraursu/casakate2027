import { Link } from "react-router-dom";
import { RsvpForm } from "../components/RsvpForm";
import { event } from "../site";

export function Home() {
  return (
    <article className="stack tight">
      <section className="hero-card compact">
        <p className="eyebrow">You're invited</p>
        <h1 className="hero-oneline">{event.title}</h1>
        <p className="lede invite-line">
          <em>Santa Rosa, California</em> · <strong>{event.dates}</strong>.
        </p>
        <p className="lede">
          Travel plans and dietary restrictions: survey below.{" "}
          <Link to="/agenda">Weekend agenda</Link> ·{" "}
          <Link to="/travel">travel & stay</Link> ·{" "}
          <Link to="/costs">costs</Link> ·{" "}
          <Link to="/girls">the girlsssss</Link>.
        </p>
      </section>

      <RsvpForm />
    </article>
  );
}
