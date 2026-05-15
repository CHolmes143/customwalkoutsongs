"use client";

import { FormEvent, useState } from "react";
import { musicStyleOptions, orderFieldLabels, playerDivisionOptions, type OrderFormPayload } from "@/lib/orderForm";

const teamSongHelpText =
  "Why is this information needed? This is one of the ways we ensure no teammates have a similar-sounding song.";

const initialForm: OrderFormPayload = {
  playerDivision: "",
  teamName: "",
  playerFirstName: "",
  playerLastName: "",
  jerseyNumber: "",
  musicStyle: "",
  rushOrder: "No",
  parentGuardianName: "",
  parentGuardianPhoneNumber: "",
};

export function OrderForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function updateField(name: keyof OrderFormPayload, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/order", {
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const result = (await response.json()) as { message?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(result.message ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setMessage(result.message ?? "Order received.");
    setForm(initialForm);
  }

  return (
    <form className="order-form" onSubmit={submitOrder}>
      <div className="form-grid">
        <label className="field">
          <span className="field-label">
            {orderFieldLabels.playerDivision} *
            <span aria-label={teamSongHelpText} className="help-tooltip" data-tooltip={teamSongHelpText} tabIndex={0}>
              ?
            </span>
          </span>
          <select
            name="playerDivision"
            onChange={(event) => updateField("playerDivision", event.target.value)}
            required
            value={form.playerDivision}
          >
            <option value="">Choose a division</option>
            {playerDivisionOptions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field-label">
            {orderFieldLabels.teamName}
            <span aria-label={teamSongHelpText} className="help-tooltip" data-tooltip={teamSongHelpText} tabIndex={0}>
              ?
            </span>
          </span>
          <input name="teamName" onChange={(event) => updateField("teamName", event.target.value)} value={form.teamName} />
        </label>
        <label className="field">
          <span>{orderFieldLabels.playerFirstName}</span>
          <input
            name="playerFirstName"
            onChange={(event) => updateField("playerFirstName", event.target.value)}
            required
            value={form.playerFirstName}
          />
        </label>
        <label className="field">
          <span>{orderFieldLabels.playerLastName}</span>
          <input
            name="playerLastName"
            onChange={(event) => updateField("playerLastName", event.target.value)}
            required
            value={form.playerLastName}
          />
        </label>
        <label className="field">
          <span>{orderFieldLabels.jerseyNumber}</span>
          <input
            inputMode="numeric"
            name="jerseyNumber"
            onChange={(event) => updateField("jerseyNumber", event.target.value)}
            required
            value={form.jerseyNumber}
          />
        </label>
        <label className="field">
          <span>{orderFieldLabels.musicStyle}</span>
          <select
            name="musicStyle"
            onChange={(event) => updateField("musicStyle", event.target.value)}
            required
            value={form.musicStyle}
          >
            <option value="">Choose a style</option>
            {musicStyleOptions.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="field radio-field span-2">
          <legend>{orderFieldLabels.rushOrder}</legend>
          <div className="radio-options">
            <label>
              <input
                checked={form.rushOrder === "Yes"}
                name="rushOrder"
                onChange={(event) => updateField("rushOrder", event.target.value)}
                required
                type="radio"
                value="Yes"
              />
              <span>Yes</span>
            </label>
            <label>
              <input
                checked={form.rushOrder === "No"}
                name="rushOrder"
                onChange={(event) => updateField("rushOrder", event.target.value)}
                required
                type="radio"
                value="No"
              />
              <span>No</span>
            </label>
          </div>
        </fieldset>
        <label className="field">
          <span>{orderFieldLabels.parentGuardianName}</span>
          <input
            name="parentGuardianName"
            onChange={(event) => updateField("parentGuardianName", event.target.value)}
            required
            value={form.parentGuardianName}
          />
        </label>
        <label className="field">
          <span>{orderFieldLabels.parentGuardianPhoneNumber}</span>
          <input
            name="parentGuardianPhoneNumber"
            onChange={(event) => updateField("parentGuardianPhoneNumber", event.target.value)}
            required
            type="tel"
            value={form.parentGuardianPhoneNumber}
          />
        </label>
      </div>
      <button className="order-submit" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Sending..." : "Submit -> pay with Venmo"}
      </button>
      {message ? <p className={status === "error" ? "order-message error" : "order-message"}>{message}</p> : null}
    </form>
  );
}
