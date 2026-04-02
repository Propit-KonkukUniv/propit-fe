import { userLoginApi } from '@shared/apis/user/userApi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FormEvent } from 'react';

import logo from '@assets/logoWhite.png';
import confettiAnim from '@assets/confetti.json';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showLottie, setShowLottie] = useState(true);
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowUI(true), 650);
    const t2 = setTimeout(() => setShowLottie(false), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await userLoginApi({ email, password });
      console.log('로그인 성공:', data);

      // userLoginApi 내부에서도 토큰을 저장하지만,
      // 백엔드 응답 필드명이 케이스별로 달라 토큰이 안 들어갈 수 있어 방어합니다.
      const getString = (v: unknown): string | null =>
        typeof v === 'string' && v.trim().length > 0 ? v : null;

      const extractToken = (payload: unknown): string | null => {
        if (!payload || typeof payload !== 'object') return null;
        const o = payload as Record<string, unknown>;

        const pickFrom = (obj: Record<string, unknown> | undefined | null): string | null => {
          if (!obj) return null;
          return (
            getString(obj.accessToken) ||
            getString(obj.access_token) ||
            getString(obj.token) ||
            getString(obj.jwt) ||
            getString(obj.jwtToken) ||
            null
          );
        };

        // 1차: root / data / data.data
        return (
          pickFrom(o) ||
          pickFrom(o.data as Record<string, unknown> | undefined) ||
          pickFrom(
            (o.data as Record<string, unknown> | undefined)?.data as Record<string, unknown> | undefined
          ) ||
          null
        );
      };

      const storedToken = localStorage.getItem('accessToken');
      if (!storedToken) {
        const fallback = extractToken(data);
        if (fallback) localStorage.setItem('accessToken', fallback);
      }

      const finalToken = localStorage.getItem('accessToken');
      if (!finalToken) {
        alert('로그인 응답에 토큰이 없어 홈으로 이동할 수 없습니다. (백엔드 응답 필드 확인 필요)');
        return;
      }

      navigate('/home');
    } catch (err) {
      console.error('로그인 실패:', err);
      if (axios.isAxiosError(err)) {
        const message =
          (err.response?.data as { message?: string } | undefined)?.message ??
          `로그인 실패 (${err.response?.status ?? 'network'})`;
        alert(message);
        return;
      }
      alert('로그인 실패');
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-[#764BA2] via-[#667EEA] to-[#667EEA] px-6 py-16 text-white">
      <AnimatePresence>
        {showLottie && (
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="h-[360px] w-[360px]">
              <Lottie
                animationData={confettiAnim}
                loop={false}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex w-full flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-[380px]">
          <AnimatePresence>
            {showUI && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="flex justify-center">
                  <img src={logo} alt="Propit 로고" className="h-10 w-auto" />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="mt-3 text-center text-sm text-white/90"
                >
                  현명한 투자의 시작
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.6, ease: 'easeOut' }}
                  className="mt-10"
                >
                  <form onSubmit={handleLogin} className="space-y-4">
                    <input
                      type="email"
                      placeholder="이메일"
                      className="mx-auto block w-full max-w-[320px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/60"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <input
                      type="password"
                      placeholder="비밀번호"
                      className="mx-auto block w-full max-w-[320px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/60"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button className="mx-auto block w-full max-w-[320px] rounded-2xl border border-white/30 bg-white/10 py-3 text-lg font-bold backdrop-blur-md transition hover:bg-white/20">
                      로그인
                    </button>
                  </form>

                  <p className="mt-5 text-center text-sm">
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className="font-bold text-white">
                      회원가입
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
