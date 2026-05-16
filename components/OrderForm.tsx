"use client";

import { FormEvent, useState } from "react";
import { musicStyleOptions, orderFieldLabels, playerDivisionOptions, sportOptions, type OrderFormPayload } from "@/lib/orderForm";

const teamSongHelpText =
  "Why is this information needed? This is one of the ways we ensure no teammates have a similar-sounding song.";
const venmoUrl = "https://venmo.com/u/customwalkoutsong";

const initialForm: OrderFormPayload = {
  sport: "Baseball",
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

type OrderFormProps = {
  onSuccess?: () => void;
};

export function OrderForm({ onSuccess }: OrderFormProps) {
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
    onSuccess?.();
  }

  if (status === "success") {
    return <OrderSuccessPanel />;
  }

  return (
    <form className="order-form" onSubmit={submitOrder}>
      <div className="form-grid">
        <label className="field">
          <span>{orderFieldLabels.sport} *</span>
          <select
            name="sport"
            onChange={(event) => updateField("sport", event.target.value)}
            required
            value={form.sport}
          >
            {sportOptions.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </label>
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
          <span>{orderFieldLabels.playerFirstName} *</span>
          <input
            name="playerFirstName"
            onChange={(event) => updateField("playerFirstName", event.target.value)}
            required
            value={form.playerFirstName}
          />
        </label>
        <label className="field">
          <span>{orderFieldLabels.playerLastName} *</span>
          <input
            name="playerLastName"
            onChange={(event) => updateField("playerLastName", event.target.value)}
            required
            value={form.playerLastName}
          />
        </label>
        <label className="field">
          <span>{orderFieldLabels.jerseyNumber} *</span>
          <input
            inputMode="numeric"
            name="jerseyNumber"
            onChange={(event) => updateField("jerseyNumber", event.target.value)}
            required
            value={form.jerseyNumber}
          />
        </label>
        <label className="field">
          <span>{orderFieldLabels.musicStyle} *</span>
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
          <legend>{orderFieldLabels.rushOrder} *</legend>
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
          <span>{orderFieldLabels.parentGuardianName} *</span>
          <input
            name="parentGuardianName"
            onChange={(event) => updateField("parentGuardianName", event.target.value)}
            required
            value={form.parentGuardianName}
          />
        </label>
        <label className="field">
          <span>{orderFieldLabels.parentGuardianPhoneNumber} *</span>
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
        {status === "submitting" ? (
          "Sending..."
        ) : (
          <>
            Submit
            <span aria-hidden="true" className="button-arrow">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </svg>
            </span>
            pay with Venmo
          </>
        )}
      </button>
      {status === "error" && message ? <p className="order-message error">{message}</p> : null}
    </form>
  );
}

export function OrderSuccessPanel() {
  return (
    <div
      aria-label="Thank you for supporting our small business. Your song will be delivered in MP3 format via text within 48 hours of your payment being received. Please complete your order now so we can get to work."
      className="venmo-payment-panel venmo-payment-panel-full"
    >
      <a href={venmoUrl} rel="noreferrer" target="_blank">
        Pay now to complete your order
      </a>
      <div className="thank-you-copy">
        <p>THANK YOU for supporting our small business!</p>
        <p>Your song will be delivered in MP3 format via text within 48 hours of your payment being received.</p>
        <strong>PLEASE COMPLETE YOUR ORDER NOW SO WE CAN GET TO WORK!</strong>
      </div>
    </div>
  );
}
