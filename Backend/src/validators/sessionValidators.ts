export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidSessionDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    // regex to test for valid YYYY-MM-DD format
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function isValidSessionTime(value: unknown): value is string {
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value); // regex test to test valid HH:MM format
}

export function validateCapacity(value: unknown): number | null {
  const capacity = Number(value);

  if (Number.isInteger(capacity) && capacity > 0) {
    return capacity;
  }

  return null;
}
