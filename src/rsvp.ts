export type ArrivalMode = "fly" | "drive" | "both" | "unsure";
export type RideNeed = "yes" | "no" | "maybe";
export type Coming = "yes" | "maybe" | "no";

export const dietOptions = [
  "None / I'll eat anything",
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Nut allergy",
  "Shellfish allergy",
  "No alcohol",
] as const;

export type Rsvp = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  coming: Coming;
  diet: string[];
  dietNotes: string;
  arrivalDay: string;
  arrivalTime: string;
  arrivalMode: ArrivalMode;
  airport: string;
  flight: string;
  landingTime: string;
  rideFromAirport: RideNeed;
  drivingNotes: string;
  extraSeats: string;
  groceries: string;
  notes: string;
};

export type RsvpInput = Omit<Rsvp, "id" | "createdAt" | "updatedAt">;

export const emptyRsvp = (): RsvpInput => ({
  name: "",
  email: "",
  coming: "yes",
  diet: [],
  dietNotes: "",
  arrivalDay: "Thursday, March 25",
  arrivalTime: "",
  arrivalMode: "unsure",
  airport: "",
  flight: "",
  landingTime: "",
  rideFromAirport: "maybe",
  drivingNotes: "",
  extraSeats: "",
  groceries: "",
  notes: "",
});

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function upsertRsvp(existing: Rsvp[], input: RsvpInput): Rsvp[] {
  const email = normalizeEmail(input.email);
  const now = new Date().toISOString();
  const next: Rsvp = {
    ...input,
    email,
    name: input.name.trim(),
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  const index = existing.findIndex((row) => row.email === email);
  if (index === -1) return [...existing, next];
  const prev = existing[index];
  const merged: Rsvp = { ...next, id: prev.id, createdAt: prev.createdAt };
  return existing.map((row, i) => (i === index ? merged : row));
}
