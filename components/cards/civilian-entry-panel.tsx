"use client";

import { useState, type FormEvent } from "react";

import type { ResponseAction } from "@/types/dashboard";

const inputClassName =
  "mt-2 w-full rounded-2xl border border-white/8 bg-black/8 px-4 py-3 text-sm text-(--text-main) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--ring) placeholder:text-(--text-dim) dark:bg-white/4";

const labelClassName = "text-xs uppercase tracking-[0.18em] text-(--text-dim)";

const optionClassName =
  "rounded-full border border-white/8 px-3 py-2 text-sm text-(--text-dim) transition hover:border-(--primary)/40 hover:text-(--text-main)";

export function CivilianEntryPanel({ selectedAction }: { selectedAction: ResponseAction }) {
  const [sosForm, setSosForm] = useState({
    name: "Aditi Sharma",
    phone: "+91 98XXXXXX41",
    location: "Ward 5 rooftop near primary school",
    peopleCount: "3",
    need: "Medical support",
    notes: "One child and one elder. Water level is rising and stair access is blocked."
  });
  const [safeForm, setSafeForm] = useState({
    householdCount: "4",
    shelter: "Delta Relief Camp",
    contactable: "Yes"
  });
  const [sosReceipt, setSosReceipt] = useState<null | { reference: string; eta: string; team: string }>(null);
  const [safeReceipt, setSafeReceipt] = useState<null | { status: string; update: string }>(null);

  const handleSosSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSosReceipt({
      reference: "SOS-C4-204",
      eta: "12 min",
      team: "Boat Team 2 with pediatric support"
    });
  };

  const handleSafeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSafeReceipt({
      status: "Household marked safe",
      update: "Search priority has been lowered for Ward 5 and family notifications can proceed."
    });
  };

  if (selectedAction.id === "map") {
    return (
      <div className="bubble-subtle mt-4 rounded-[26px] p-4">
        <p className={labelClassName}>Selected Flow</p>
        <p className="mt-2 text-sm leading-6 text-(--text-main)">{selectedAction.status}</p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-white/8 bg-black/8 p-4 dark:bg-white/4">
            <p className={labelClassName}>Nearest shelter</p>
            <p className="mt-2 text-base font-semibold text-(--text-main)">Delta Relief Camp</p>
            <p className="mt-2 text-sm leading-6 text-(--text-dim)">Capacity at 68%. Medical overflow team requested.</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-black/8 p-4 dark:bg-white/4">
            <p className={labelClassName}>Open corridor</p>
            <p className="mt-2 text-base font-semibold text-(--text-main)">School bridge route</p>
            <p className="mt-2 text-sm leading-6 text-(--text-dim)">Estimated safe passage window is 14 minutes.</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-black/8 p-4 dark:bg-white/4">
            <p className={labelClassName}>Hospital access</p>
            <p className="mt-2 text-base font-semibold text-(--text-main)">Hospital North</p>
            <p className="mt-2 text-sm leading-6 text-(--text-dim)">AI route confidence is 91% for medevac transfer.</p>
          </div>
        </div>

        <a
          href="#live-map"
          className="mt-4 inline-flex rounded-full border border-(--primary)/35 bg-(--primary)/14 px-4 py-3 text-sm font-medium text-(--text-main) transition hover:-translate-y-0.5"
        >
          Jump to live map
        </a>
      </div>
    );
  }

  if (selectedAction.id === "safe") {
    return (
      <div className="bubble-subtle mt-4 rounded-[26px] p-4">
        <p className={labelClassName}>Selected Flow</p>
        <p className="mt-2 text-sm leading-6 text-(--text-main)">{selectedAction.status}</p>

        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSafeSubmit}>
          <label className="block">
            <span className={labelClassName}>People safe with you</span>
            <input
              className={inputClassName}
              value={safeForm.householdCount}
              onChange={(event) => setSafeForm((current) => ({ ...current, householdCount: event.target.value }))}
            />
          </label>
          <label className="block">
            <span className={labelClassName}>Current shelter</span>
            <input
              className={inputClassName}
              value={safeForm.shelter}
              onChange={(event) => setSafeForm((current) => ({ ...current, shelter: event.target.value }))}
            />
          </label>
          <label className="block md:col-span-2">
            <span className={labelClassName}>Phone reachable</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Yes", "Intermittent", "No"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSafeForm((current) => ({ ...current, contactable: option }))}
                  className={`${optionClassName} ${safeForm.contactable === option ? "border-(--success)/45 bg-(--success)/12 text-(--text-main)" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </label>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex rounded-full border border-(--success)/35 bg-(--success)/14 px-4 py-3 text-sm font-medium text-(--text-main) transition hover:-translate-y-0.5"
            >
              Confirm safe status
            </button>
            <span className="text-sm text-(--text-dim)">This should update rescue search queues immediately.</span>
          </div>
        </form>

        {safeReceipt ? (
          <div className="mt-4 rounded-3xl border border-(--success)/25 bg-(--success)/10 p-4">
            <p className="text-sm font-semibold text-(--text-main)">{safeReceipt.status}</p>
            <p className="mt-2 text-sm leading-6 text-(--text-dim)">{safeReceipt.update}</p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="bubble-subtle mt-4 rounded-[26px] p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={labelClassName}>Selected Flow</p>
          <p className="mt-2 text-sm leading-6 text-(--text-main)">{selectedAction.status}</p>
        </div>
        <div className="rounded-full border border-(--danger)/25 bg-(--danger)/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-(--danger)">
          Priority intake
        </div>
      </div>

      <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSosSubmit}>
        <label className="block">
          <span className={labelClassName}>Caller name</span>
          <input
            className={inputClassName}
            value={sosForm.name}
            onChange={(event) => setSosForm((current) => ({ ...current, name: event.target.value }))}
          />
        </label>
        <label className="block">
          <span className={labelClassName}>Phone</span>
          <input
            className={inputClassName}
            value={sosForm.phone}
            onChange={(event) => setSosForm((current) => ({ ...current, phone: event.target.value }))}
          />
        </label>
        <label className="block md:col-span-2">
          <span className={labelClassName}>Current location</span>
          <input
            className={inputClassName}
            value={sosForm.location}
            onChange={(event) => setSosForm((current) => ({ ...current, location: event.target.value }))}
          />
        </label>
        <label className="block">
          <span className={labelClassName}>People with you</span>
          <input
            className={inputClassName}
            value={sosForm.peopleCount}
            onChange={(event) => setSosForm((current) => ({ ...current, peopleCount: event.target.value }))}
          />
        </label>
        <label className="block">
          <span className={labelClassName}>Immediate need</span>
          <select
            className={inputClassName}
            value={sosForm.need}
            onChange={(event) => setSosForm((current) => ({ ...current, need: event.target.value }))}
          >
            <option>Medical support</option>
            <option>Boat rescue</option>
            <option>Food and water</option>
            <option>Evacuation guidance</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className={labelClassName}>Situation notes</span>
          <textarea
            className={`${inputClassName} min-h-28 resize-y`}
            value={sosForm.notes}
            onChange={(event) => setSosForm((current) => ({ ...current, notes: event.target.value }))}
          />
        </label>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex rounded-full border border-(--danger)/35 bg-(--danger)/14 px-4 py-3 text-sm font-medium text-(--text-main) transition hover:-translate-y-0.5"
          >
            Send priority SOS
          </button>
          <span className="text-sm text-(--text-dim)">A real product would capture GPS, offline fallback, and multilingual prompts here.</span>
        </div>
      </form>

      {sosReceipt ? (
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-(--danger)/25 bg-(--danger)/10 p-4">
            <p className={labelClassName}>Incident reference</p>
            <p className="mt-2 text-lg font-semibold text-(--text-main)">{sosReceipt.reference}</p>
          </div>
          <div className="rounded-3xl border border-(--primary)/25 bg-(--primary)/10 p-4">
            <p className={labelClassName}>Estimated response</p>
            <p className="mt-2 text-lg font-semibold text-(--text-main)">{sosReceipt.eta}</p>
          </div>
          <div className="rounded-3xl border border-(--success)/25 bg-(--success)/10 p-4">
            <p className={labelClassName}>Assigned unit</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-(--text-main)">{sosReceipt.team}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}