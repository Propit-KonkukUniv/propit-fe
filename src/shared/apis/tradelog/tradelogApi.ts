import api from '../axios';

// ==========================================
// 1. 타입(Type) 및 인터페이스(Interface) 정의
// ==========================================

// 생성 및 수정 요청에 쓰이는 Body 데이터 타입 (상세 조회의 data와 동일)
export interface TradeLogRequest {
  sellDate: string;
  stockName: string;
  sectorName: string;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  holdingDays: number;
  reason: string;
  emotionTags: string[];
}

// 전체 조회 시 배열 안에 들어가는 개별 아이템 타입
export interface TradeLogListItem {
  tradeLogId: number;
  sellDate: string;
  stockName: string;
}

// 공통 응답 포맷 (수정, 삭제, 생성 등 데이터가 없는 기본 응답용)
export interface BaseResponse {
  success: boolean;
  code: number;
  message: string;
}

// 전체 조회 API 응답 타입
export interface GetTradeLogsResponse extends BaseResponse {
  data: TradeLogListItem[];
}

// 상세 조회 API 응답 타입
export interface GetTradeLogDetailResponse extends BaseResponse {
  data: TradeLogRequest;
}

// ==========================================
// 2. API 함수 구현부
// ==========================================

// 매매 기록 생성
export const createTradeLog = async (body: TradeLogRequest): Promise<BaseResponse> => {
  const response = await api.post('/tradelogs', body);
  return response.data;
};

// 매매 기록 전체 조회
export const getTradeLogs = async (): Promise<GetTradeLogsResponse> => {
  const response = await api.get('/tradelogs');
  return response.data;
};

// 매매 기록 상세 조회
export const getTradeLogDetail = async (
  tradelogs_id: number
): Promise<GetTradeLogDetailResponse> => {
  const response = await api.get(`/tradelogs/${tradelogs_id}`);
  return response.data;
};

// 매매 기록 수정
export const updateTradeLog = async (
  tradelogs_id: number,
  body: TradeLogRequest
): Promise<BaseResponse> => {
  const response = await api.put(`/tradelogs/${tradelogs_id}`, body);
  return response.data;
};

// 매매 기록 삭제
export const deleteTradeLog = async (tradelogs_id: number): Promise<BaseResponse> => {
  const response = await api.delete(`/tradelogs/${tradelogs_id}`);
  return response.data;
};
