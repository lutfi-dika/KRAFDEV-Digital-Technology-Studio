const SPREADSHEET_ID = "1b1C9MjDTDfuyOQyiEknhDun_2uWklNQVVmaUlkBizLE";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`;

export type GoogleSheetsProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  link: string;
  year: string;
  status: string;
  featured: boolean;
  tags: string[];
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800";

function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ""));
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ""));
  return result;
}

function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  let headerIndex = lines.findIndex((line) => {
    const upper = line.toUpperCase();
    return upper.includes("NAME") || upper.includes("ID");
  });
  if (headerIndex === -1) headerIndex = 0;

  const headers = splitCSVLine(lines[headerIndex]).map((h) =>
    h.toUpperCase(),
  );
  const rows: Record<string, string>[] = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const values = splitCSVLine(lines[i]);
    if (values.length === 0 || !values.some((v) => v !== "")) continue;
    const rowObj: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowObj[header] = values[index] || "";
    });
    rows.push(rowObj);
  }

  return rows;
}

function pickLink(item: Record<string, string>): string {
  return (
    item["URL WEBSITE"] ||
    item["URL_WEBSITE"] ||
    item.URLWEBSITE ||
    item.DEMOURL ||
    item.LINK ||
    "#"
  );
}

function parseTags(raw: string | undefined): string[] {
  const fallback = ["React", "Tailwind CSS", "Vite"];
  if (raw && typeof raw === "string" && raw.trim() !== "") {
    return raw.split(",").map((tt) => tt.trim()).filter(Boolean);
  }
  return fallback;
}

function isFeatured(raw: string | undefined): boolean {
  if (raw === undefined || raw === null) return false;
  const upper = String(raw).toUpperCase();
  return (
    upper === "TRUE" || String(raw) === "1"
  );
}

export async function fetchProjectsFromSheet(): Promise<GoogleSheetsProject[]> {
  const response = await fetch(CSV_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const csvText = await response.text();
  const rawData = parseCSV(csvText);

  return rawData
    .filter((item) => item.NAME && item.NAME.trim() !== "")
    .map((item, idx) => ({
      id: item.ID || `project-${idx}`,
      name: item.NAME || "Untitled Project",
      category: item.CATEGORY || "Portfolio",
      description: item.DESCRIPTION || "A project crafted by KRAFDEV.",
      image: item.IMAGE && item.IMAGE.trim() !== "" ? item.IMAGE : DEFAULT_IMAGE,
      link: pickLink(item),
      year: item.YEAR || "2026",
      status: item.STATUS || "Done",
      featured: isFeatured(item.FEATURED),
      tags: parseTags(item.TAGS),
    }));
}
