import { Ear } from "lucide-react";
import {
  DeliveryStatus,
  SongApprovalStatus,
  TeamOrderStatus,
  deliveryStatusLabels,
  songApprovalStatusLabels,
  statusOptions,
  teamOrderStatusLabels,
} from "@/lib/status";
import { decodeMusicStyles, musicStyleOptions } from "@/lib/musicStyles";

export function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} defaultValue={defaultValue ?? ""} required={required} type={type} />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="field span-2">
      <span>{label}</span>
      <textarea name={name} defaultValue={defaultValue ?? ""} rows={4} />
    </label>
  );
}

export function TeamStatusSelect({ defaultValue }: { defaultValue?: TeamOrderStatus | string }) {
  return <Select label="Order status" name="orderStatus" options={statusOptions(teamOrderStatusLabels)} defaultValue={defaultValue ?? "NEW"} />;
}

export function SongApprovalSelect({ defaultValue }: { defaultValue?: SongApprovalStatus | string }) {
  return <Select label="Approval status" name="approvalStatus" options={statusOptions(songApprovalStatusLabels)} defaultValue={defaultValue ?? "NEEDS_REVIEW"} />;
}

export function DeliveryStatusSelect({ defaultValue }: { defaultValue?: DeliveryStatus | string }) {
  return <Select label="Delivery status" name="deliveryStatus" options={statusOptions(deliveryStatusLabels)} defaultValue={defaultValue ?? "NOT_STARTED"} />;
}

export function MusicStyleCheckboxes({ defaultValue }: { defaultValue?: string | null }) {
  const selected = new Set(decodeMusicStyles(defaultValue));

  return (
    <fieldset className="field span-2 checkbox-group">
      <legend>Favorite Music Style</legend>
      <div className="checkbox-grid">
        {musicStyleOptions.map((style) => (
          <div className="checkbox-row" key={style.label}>
            <label className="checkbox">
              <input name="musicStyles" type="checkbox" value={style.label} defaultChecked={selected.has(style.label)} />
              {style.label}
            </label>
            {style.sampleUrl ? (
              <a
                aria-label={`Listen to ${style.label} sample on Suno`}
                className="icon-link"
                href={style.sampleUrl}
                rel="noreferrer"
                target="_blank"
                title={`Listen to ${style.label} sample on Suno`}
              >
                <Ear aria-hidden="true" size={18} />
              </a>
            ) : (
              <span
                aria-label={`${style.label} sample link not added yet`}
                className="icon-link disabled"
                title="Sample Suno link not added yet"
              >
                <Ear aria-hidden="true" size={18} />
              </span>
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: unknown }[];
  defaultValue: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {String(option.label)}
          </option>
        ))}
      </select>
    </label>
  );
}
