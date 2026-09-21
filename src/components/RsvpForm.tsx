import { useEffect, useState, type FormEvent } from "react";
// Survey does not collect room preferences — rooms are assigned by hosts.
import {
  type ArrivalMode,
  type Coming,
  type RideNeed,
  type RsvpInput,
  dietOptions,
  emptyRsvp,
} from "../rsvp";
import { apiUrl } from "../asset";
import { readStore, writeStore } from "../storage";

const MINE_KEY = "kate-bach-my-rsvp";

export function RsvpForm() {
  const [form, setForm] = useState<RsvpInput>(emptyRsvp);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const raw = readStore(MINE_KEY);
    if (!raw) return;
    try {
      setForm({ ...emptyRsvp(), ...(JSON.parse(raw) as RsvpInput) });
      setStatus("saved");
    } catch {
      /* ignore */
    }
  }, []);

  function set<K extends keyof RsvpInput>(key: K, value: RsvpInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status === "saved") setStatus("idle");
  }

  function toggleDiet(option: string) {
    setForm((prev) => {
      const on = prev.diet.includes(option);
      return {
        ...prev,
        diet: on ? prev.diet.filter((item) => item !== option) : [...prev.diet, option],
      };
    });
    if (status === "saved") setStatus("idle");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch(apiUrl("/api/rsvp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      writeStore(MINE_KEY, JSON.stringify(form));
      if (res.ok) {
        setStatus("saved");
        setMessage("Got it — thank you. Come back and change this anytime.");
        return;
      }
      setStatus("saved");
      setMessage(
        "Saved on this device. Text Mara so it hits the shared list — the live site doesn't keep a server.",
      );
    } catch {
      writeStore(MINE_KEY, JSON.stringify(form));
      setStatus("saved");
      setMessage(
        "Saved on this device. Text Mara so it hits the shared list — the live site doesn't keep a server.",
      );
    }
  }

  const flying = form.arrivalMode === "fly" || form.arrivalMode === "both";
  const driving = form.arrivalMode === "drive" || form.arrivalMode === "both";

  return (
    <section className="panel survey" id="rsvp">
      <p className="eyebrow">Please fill this out</p>
      <h2>Travel and food survey</h2>
      <p className="lede">Travel plans and dietary restrictions.</p>

      <form className="survey-form" onSubmit={onSubmit}>
        <div className="form-row">
          <label className="field">
            <span>Your name</span>
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="First and last"
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="so we can update your reply later"
            />
          </label>
        </div>

        <fieldset className="field">
          <legend>Are you in?</legend>
          <div className="pills">
            {(
              [
                ["yes", "Yes"],
                ["maybe", "Soft yes / depends"],
                ["no", "Can't make it"],
              ] as [Coming, string][]
            ).map(([value, label]) => (
              <label key={value} className={form.coming === value ? "pill on" : "pill"}>
                <input
                  type="radio"
                  name="coming"
                  checked={form.coming === value}
                  onChange={() => set("coming", value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="field">
          <legend>Food & drink</legend>
          <div className="pills">
            {dietOptions.map((option) => (
              <label
                key={option}
                className={form.diet.includes(option) ? "pill on" : "pill"}
              >
                <input
                  type="checkbox"
                  checked={form.diet.includes(option)}
                  onChange={() => toggleDiet(option)}
                />
                {option}
              </label>
            ))}
          </div>
          <label className="field nested">
            <span>Anything else we should cook around</span>
            <input
              value={form.dietNotes}
              onChange={(e) => set("dietNotes", e.target.value)}
              placeholder="Allergies, spice, I'll bring my own oat milk…"
            />
          </label>
          <label className="field nested">
            <span>Food / coffee preferences, groceries you want in the house</span>
            <input
              value={form.groceries}
              onChange={(e) => set("groceries", e.target.value)}
              placeholder="Coffee, MALK, Nerds Clusters, sparkling water…"
            />
          </label>
        </fieldset>

        <div className="form-row">
          <label className="field">
            <span>When do you plan to get in</span>
            <select
              value={form.arrivalDay}
              onChange={(e) => set("arrivalDay", e.target.value)}
            >
              <option>Thursday, March 25</option>
              <option>Wednesday, March 24 (early)</option>
              <option>Friday, March 26</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="field">
            <span>Rough arrival time</span>
            <input
              value={form.arrivalTime}
              onChange={(e) => set("arrivalTime", e.target.value)}
              placeholder="e.g. 3pm at the house, 1:10pm landing"
            />
          </label>
        </div>

        <fieldset className="field">
          <legend>How are you getting there</legend>
          <div className="pills">
            {(
              [
                ["fly", "Flying"],
                ["drive", "Driving"],
                ["both", "Fly + drive / mix"],
                ["unsure", "Not sure yet"],
              ] as [ArrivalMode, string][]
            ).map(([value, label]) => (
              <label
                key={value}
                className={form.arrivalMode === value ? "pill on" : "pill"}
              >
                <input
                  type="radio"
                  name="mode"
                  checked={form.arrivalMode === value}
                  onChange={() => set("arrivalMode", value)}
                />
                {label}
              </label>
            ))}
          </div>
          <p className="fine">Parking at the Airbnb.</p>
        </fieldset>

        {flying ? (
          <div className="form-block">
            <div className="form-row">
              <label className="field">
                <span>Airport</span>
                <select
                  value={form.airport}
                  onChange={(e) => set("airport", e.target.value)}
                >
                  <option value="">Pick one</option>
                  <option>STS — Santa Rosa</option>
                  <option>OAK — Oakland</option>
                  <option>SFO — San Francisco</option>
                  <option>Other / not booked</option>
                </select>
              </label>
              <label className="field">
                <span>Flight number</span>
                <input
                  value={form.flight}
                  onChange={(e) => set("flight", e.target.value)}
                  placeholder="Airline + number, or TBD"
                />
              </label>
            </div>
            <div className="form-row">
              <label className="field">
                <span>Landing time</span>
                <input
                  value={form.landingTime}
                  onChange={(e) => set("landingTime", e.target.value)}
                  placeholder="e.g. Thu 2:45pm"
                />
              </label>
              <fieldset className="field">
                <legend>Need a ride from the airport?</legend>
                <div className="pills">
                  {(
                    [
                      ["yes", "Yes please"],
                      ["maybe", "If it's easy"],
                      ["no", "I'll handle it"],
                    ] as [RideNeed, string][]
                  ).map(([value, label]) => (
                    <label
                      key={value}
                      className={form.rideFromAirport === value ? "pill on" : "pill"}
                    >
                      <input
                        type="radio"
                        name="ride"
                        checked={form.rideFromAirport === value}
                        onChange={() => set("rideFromAirport", value)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        ) : null}

        {driving ? (
          <div className="form-block">
            <p className="fine">Parking at the Airbnb.</p>
            <div className="form-row">
            <label className="field">
              <span>Driving notes</span>
              <input
                value={form.drivingNotes}
                onChange={(e) => set("drivingNotes", e.target.value)}
                placeholder="Own car, rental from SFO, leaving Friday…"
              />
            </label>
            <label className="field">
              <span>Spare seats for the group?</span>
              <input
                value={form.extraSeats}
                onChange={(e) => set("extraSeats", e.target.value)}
                placeholder="e.g. 2 seats from OAK Thursday"
              />
            </label>
            </div>
          </div>
        ) : null}

        <label className="field">
          <span>Anything else</span>
          <textarea
            className="notes"
            rows={4}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Early Sunday flight, birthday during the trip, I can be a designated driver…"
          />
        </label>

        {message ? (
          <p className={status === "error" ? "err" : "ok"}>{message}</p>
        ) : null}

        <button type="submit" className="btn" disabled={status === "saving"}>
          {status === "saving"
            ? "Saving…"
            : status === "saved"
              ? "Update my reply"
              : "Send my reply"}
        </button>
      </form>
    </section>
  );
}
