export function normalizeSearchValue(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function buildSearchText(value) {
  if (value == null) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => buildSearchText(item)).join(" ");
  }

  if (typeof value === "object") {
    return Object.values(value)
      .map((item) => buildSearchText(item))
      .join(" ");
  }

  return "";
}

export function filterCollectionByQuery(items = [], query, selector = (item) => item) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) =>
    normalizeSearchValue(buildSearchText(selector(item))).includes(normalizedQuery),
  );
}
