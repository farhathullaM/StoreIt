export function toNullIfEmpty(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }
  return null;
}

export const toNumber = (value: string) => parseInt(value);
