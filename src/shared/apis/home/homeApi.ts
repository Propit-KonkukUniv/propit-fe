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

export async function getHomeApi() {
  const res = await api.get<ApiEnvelope<HomePayload> | HomePayload>(HOME_ENDPOINT);
  const body = res.data;

  // 백엔드가 envelope 형태 또는 payload 직반환 둘 다 대응
  if (typeof body === 'object' && body !== null && 'data' in body && 'success' in body) {
    return (body as ApiEnvelope<HomePayload>).data;
  }

  return body as HomePayload;
}
