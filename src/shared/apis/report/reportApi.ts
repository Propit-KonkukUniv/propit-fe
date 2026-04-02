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
  date: string; // 예: "2025-12-07" 형태의 오늘날짜를 전송한다.
}

export interface DailySummary {
  tradeCount: number; // 거래횟수
  winRate: number; // 승률
  totalProfit: number; // 오늘의 손익
  averageProfitRate: number; // 평균 수익률
}

export interface EmotionAnalysis {
  // 감정 분석
  emotion: string; // 감정
  count: number; // 횟수
  analysis: string; // 분석 내용
}

export interface AiInsight {
  // AI 인사이트
  strengthPattern: string; // 강정 패턴
  improvementPoint: string; // 개선 포인트
  cautionTime: string; // 주의 사항
}

export interface DailyReportData {
  date: string; // 오늘 날짜
  summary: DailySummary; //
  emotionAnalysis: EmotionAnalysis[]; // 감정 분석 결과 배열
  aiInsight: AiInsight; // AI 인사이트
  todayAdvice: string[]; // 오늘의 조언
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
  totalTradeCount: number; // 총 거래 횟수
  winRate: number; // 승률
  totalProfit: number; // 전체 손익
  avgProfitRate: number; // 평균 수익률
  bestTrade: TradeRecord; // 최고의 거래
  worstTrade: TradeRecord; // 최악의 거래
  emotionSummary: EmotionSummary; // 가장 많았던 감정
  averageHoldingDays: number; // 평균 보유 기간
}

export interface ProfitRateTrend {
  month: number; // 월
  profitRate: number; // 해당 월의 수익률
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
