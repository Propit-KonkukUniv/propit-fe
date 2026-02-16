import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SubmitEvent } from 'react';

import logo from '../shared/assets/logoWhite.png';
import confettiAnim from '../shared/assets/confetti.json';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로티 잠깐 보여주고 사라지게
  const [showLottie, setShowLottie] = useState(true);
  // 로티 끝나고 폼 등장
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowUI(true), 650);
    const t2 = setTimeout(() => setShowLottie(false), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleLogin = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
    navigate('/');
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

      {/* 중앙 */}
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-[380px]">
          <AnimatePresence>
            {showUI && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* 로고 */}
                <div className="flex justify-center">
                  <img src={logo} alt="Propit 로고" className="h-10 w-auto" />
                </div>

                {/* 슬로건 */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="mt-3 text-center text-sm text-white/90"
                >
                  현명한 투자의 시작
                </motion.p>

                {/* 폼 */}
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
