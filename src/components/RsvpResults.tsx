import { useEffect, useState } from "react";
import type { Rsvp } from "../rsvp";
import { apiUrl } from "../asset";
import { PLANNING_PASSWORD } from "../site";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

function toCsv(rows: Rsvp[]) {
  const headers = [
    "Name",
    "Email",
    "Coming",
    "Diet",
    "Diet notes",
    "Arrival day",
    "Arrival time",
    "How",
    "Airport",
    "Flight",
    "Landing",
    "Airport ride",
    "Driving",
    "Extra seats",
    "Groceries",
    "Notes",
    "Updated",
  ];
  const lines = rows.map((row) =>
    [
      row.name,
      row.email,
      row.coming,
      row.diet.join("; "),
      row.dietNotes,
      row.arrivalDay,
      row.arrivalTime,
      row.arrivalMode,
      row.airport,
      row.flight,
      row.landingTime,
      row.rideFromAirport,
      row.drivingNotes,
      row.extraSeats,
      row.groceries,
      row.notes,
      row.updatedAt,
    ]
      .map((cell) => csvEscape(String(cell ?? "")))
      .join(","),
  );
  return [headers.join(","), ...lines].join("\n");
}

export function RsvpResults() {
  const [rows, setRows] = useState<Rsvp[] | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const res = await fetch(
        `${apiUrl("/api/rsvp")}?key=${encodeURIComponent(PLANNING_PASSWORD)}`,
      );
      const body = (await res.json()) as { replies?: Rsvp[]; error?: string };
      if (!res.ok) throw new Error(body.error ?? "Could not load replies");
      setRows(body.replies ?? []);
    } catch {
      setError(
        "Shared replies live on the local app. On the live site, have people text Mara.",
      );
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function download() {
    if (!rows) return;
    const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kate-bachelorette-rsvps.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const coming = rows?.filter((row) => row.coming === "yes").length ?? 0;
  const rides = rows?.filter((row) => row.rideFromAirport === "yes").length ?? 0;

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Guest list</p>
          <h2>Survey replies</h2>
        </div>
        <div className="panel-actions">
          <button type="button" className="btn ghost" onClick={() => void load()}>
            Refresh
          </button>
          <button type="button" className="btn ghost" onClick={download} disabled={!rows?.length}>
            Download CSV
          </button>
        </div>
      </div>
      <p className="fine">
        {rows
          ? `${rows.length} replies · ${coming} yes · ${rides} need an airport ride`
          : "Loading the shared list…"}
      </p>
      {error ? <p className="err">{error}</p> : null}
      <div className="table-wrap">
        <table className="results">
          <thead>
            <tr>
              <th>Who</th>
              <th>Coming</th>
              <th>Travel</th>
              <th>Food</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((row) => (
              <tr key={row.id}>
                <td>
                  <strong>{row.name}</strong>
                  <div className="muted">{row.email}</div>
                </td>
                <td>{row.coming}</td>
                <td>
                  <div>{row.arrivalDay}</div>
                  <div className="muted">
                    {row.arrivalTime || row.landingTime || "time TBD"} · {row.arrivalMode}
                  </div>
                  {row.airport ? <div className="muted">{row.airport} {row.flight}</div> : null}
                  {row.rideFromAirport === "yes" ? (
                    <div className="flag">Needs airport ride</div>
                  ) : null}
                  {row.extraSeats ? <div className="muted">Seats: {row.extraSeats}</div> : null}
                </td>
                <td>
                  {row.diet.length ? row.diet.join(", ") : "—"}
                  {row.dietNotes ? <div className="muted">{row.dietNotes}</div> : null}
                  {row.groceries ? <div className="muted">House: {row.groceries}</div> : null}
                </td>
                <td>{row.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows?.length === 0 ? (
        <p className="fine">Nobody yet. Survey on the welcome page lands here.</p>
      ) : null}
    </section>
  );
}
