export type WakaLanguage = {
  name: string;
  percent: number;
  color?: string;
};

export type WakaTotals = {
  total: string;
  dailyAverage: string;
  bestDay: string;
  bestDayDate: string;
  /** Human label for the window the figures cover, e.g. "All time". */
  rangeLabel: string;
  /** Days with tracked activity inside that window. */
  activeDays: number | null;
  since: string;
};

export type WakaSnapshot = {
  languages: WakaLanguage[];
  totals: WakaTotals | null;
  unavailable: boolean;
};

/**
 * WakaTime share URLs are interchangeable — which embed lands in which env var
 * is not guaranteed, so both are fetched and sorted by the shape of what comes
 * back rather than by the name of the variable it came from.
 */
const SOURCES = [
  process.env.NEXT_PUBLIC_WAKATIME_API_URL,
  process.env.NEXT_PUBLIC_WAKATIME_HOURS_API_URL,
];

const RANGE_LABELS: Record<string, string> = {
  all_time: 'All time',
  last_7_days: 'Last 7 days',
  last_30_days: 'Last 30 days',
  last_6_months: 'Last 6 months',
  last_year: 'Last year',
  yesterday: 'Yesterday',
  today: 'Today',
};

/** Aggregate buckets, not languages — they do not belong in a language list. */
const NOT_A_LANGUAGE = new Set(['other', 'unknown']);

async function get(url: string | undefined): Promise<unknown | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: unknown };
    return json?.data ?? json;
  } catch {
    return null;
  }
}

function labelFor(range: any): string {
  const key = range?.range;
  if (typeof key === 'string') {
    if (RANGE_LABELS[key]) return RANGE_LABELS[key];
    return key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  }
  return 'Tracked';
}

function monthYear(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function fullDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
}

export async function getWakatime(): Promise<WakaSnapshot> {
  const payloads = await Promise.all(SOURCES.map(get));

  let languages: WakaLanguage[] = [];
  let totals: WakaTotals | null = null;

  for (const payload of payloads) {
    if (Array.isArray(payload)) {
      languages = payload
        .filter(
          (l: any) =>
            l?.name &&
            typeof l.percent === 'number' &&
            !NOT_A_LANGUAGE.has(String(l.name).toLowerCase())
        )
        .slice(0, 6)
        .map((l: any) => ({
          name: l.name,
          percent: l.percent,
          color: l.color,
        }));
      continue;
    }

    const grand = (payload as any)?.grand_total;
    if (grand) {
      const range = (payload as any)?.range;
      totals = {
        total: grand.human_readable_total ?? '—',
        dailyAverage: grand.human_readable_daily_average ?? '—',
        bestDay: (payload as any)?.best_day?.text ?? '—',
        bestDayDate: fullDate((payload as any)?.best_day?.date),
        rangeLabel: labelFor(range),
        activeDays:
          typeof range?.days_minus_holidays === 'number'
            ? range.days_minus_holidays
            : null,
        since: monthYear(range?.start),
      };
    }
  }

  return {
    languages,
    totals,
    unavailable: languages.length === 0 && totals === null,
  };
}
