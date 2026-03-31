import api from '../axios';

// ==========================================
// 1. 공통 응답 인터페이스 (필요시 재사용)
// ==========================================
export interface BaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

// ==========================================
// 2. 데일리 AI 리포트 관련 타입 정의
// ==========================================

export interface DailyReportRequest {
  date: string; // 예: "2025-12-07"
}

export interface DailySummary {
  tradeCount: number;
  winRate: number;
  totalProfit: number;
  averageProfitRate: number;
}

export interface EmotionAnalysis {
  emotion: string;
  count: number;
  analysis: string;
}

export interface AiInsight {
  strengthPattern: string;
  improvementPoint: string;
  cautionTime: string;
}

export interface DailyReportData {
  date: string;
  summary: DailySummary;
  emotionAnalysis: EmotionAnalysis[];
  aiInsight: AiInsight;
  todayAdvice: string[];
}

// ==========================================
// 3. 누적 AI 리포트 관련 타입 정의
// ==========================================

export interface TradeRecord {
  stockName: string;
  profit: number;
  profitRate: number;
  date: string;
}

export interface EmotionSummary {
  mostUsedEmotion: string;
  count: number;
}

export interface OverviewSummary {
  totalTradeCount: number;
  winRate: number;
  totalProfit: number;
  avgProfitRate: number;
  bestTrade: TradeRecord;
  worstTrade: TradeRecord;
  emotionSummary: EmotionSummary;
  averageHoldingDays: number;
}

export interface ProfitRateTrend {
  month: number;
  profitRate: number;
}

export interface AiAnalysisDetail {
  emotion: string;
  description: string;
  insight: string;
}

export interface AiAnalysis {
  positive: AiAnalysisDetail;
  negative: AiAnalysisDetail;
}

export interface SectorPerformance {
  sector: string;
  rate: number;
}

export interface Strategy {
  title: string;
  description: string;
}

export interface OverviewReportData {
  summary: OverviewSummary;
  profitRateTrendSeries: ProfitRateTrend[];
  aiAnalysis: AiAnalysis;
  sectorPerformance: SectorPerformance[];
  strategies: Strategy[];
}

// ==========================================
// 4. API 함수 구현부
// ==========================================

// 데일리 ai 리포트 조회 (POST)
export const getDailyReport = async (
  body: DailyReportRequest
): Promise<BaseResponse<DailyReportData>> => {
  const response = await api.post('/reports/daily', body);
  return response.data;
};

// 누적 ai 리포트 조회 (GET)
// 명세서상 BaseResponse 형태(success, code 등) 없이 바로 데이터가 온다고 가정하여 작성했습니다.
// 만약 백엔드에서 success, code 등으로 한 번 감싸서 보낸다면 Promise<BaseResponse<OverviewReportData>> 로 변경하면 됩니다!
export const getOverviewReport = async (): Promise<BaseResponse<OverviewReportData>> => {
  const response = await api.get('/reports/overview');
  return response.data;
};
