export const transformForCsv = (item: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key,
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : value,
    ])
  );
