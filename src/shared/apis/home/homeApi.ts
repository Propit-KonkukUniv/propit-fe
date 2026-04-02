import api from '../axios';

export interface TodayMood {
  exists: boolean;
  mood: string | null;
  message: string | null;
}

export interface DailyReportData {
  tradeCount: number;
  winRate: number;
  profit: number;
  avgReturnRate: number;
  feedback: string;
}

export interface CumulativeReportData {
  totalTradeCount: number;
  winRate: number;
  totalProfit: number;
  avgReturnRate: number;
}

export interface HomePayload {
  todayMood: TodayMood;
  dailyReport: {
    exists: boolean;
    data: DailyReportData | null;
  };
  cumulativeReport: {
    exists: boolean;
    data: CumulativeReportData | null;
  };
}

export interface ApiEnvelope<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

// TODO: 백엔드 최종 명세 나오면 endpoint 확정해서 교체
const HOME_ENDPOINT = '/home';

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const json = atob(padded);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function getHomeApi() {
  const rawToken = localStorage.getItem('accessToken');

  let token: string | null = rawToken;
  if (token) {
    // stringified token ("...") 방어 + Bearer 접두사 중복 방어
    token = token.trim();
    try {
      if (token.startsWith('"') && token.endsWith('"')) {
        token = JSON.parse(token);
      }
    } catch {
      // ignore
    }
    if (typeof token === 'string') {
      token = token.replace(/^["']|["']$/g, '');
      token = token.replace(/^Bearer\s+/i, '').trim();
    }
  }

  if (token) {
    const payload = decodeJwtPayload(token);
    const exp = typeof payload?.exp === 'number' ? payload.exp : null;
    const nowSec = Math.floor(Date.now() / 1000);
    if (import.meta.env.DEV) {
      console.log('[getHomeApi] token exp:', exp ? new Date(exp * 1000).toISOString() : null);
    }
    if (exp && exp < nowSec) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error('TOKEN_EXPIRED');
    }
  }

  if (import.meta.env.DEV) {
    // 토큰 원문은 로그에 남기지 않고, 존재/길이만 확인합니다.
    // 403 원인이 "토큰 미전송"인지 "토큰 무효"인지 빠르게 구분하기 위함.
    console.log('[getHomeApi] token present:', Boolean(token), 'len:', token?.length ?? 0);
  }

  const res = await api.get<ApiEnvelope<HomePayload> | HomePayload>(HOME_ENDPOINT, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  const body = res.data;

  // 백엔드가 envelope 형태 또는 payload 직반환 둘 다 대응
  if (typeof body === 'object' && body !== null && 'data' in body && 'success' in body) {
    return (body as ApiEnvelope<HomePayload>).data;
  }

  return body as HomePayload;
}
