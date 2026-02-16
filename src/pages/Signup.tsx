import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { FormEvent } from 'react';

import logo from '../shared/assets/logoWhite.png';

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('회원가입 시도:', { name, email, password });
    navigate('/login');
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-[#764BA2] via-[#667EEA] to-[#667EEA] px-6 py-16 text-white">
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-[380px]">
          <AnimatePresence>
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
                <form onSubmit={handleSignup} className="space-y-4">
                  <input
                    type="text"
                    placeholder="이름"
                    className="mx-auto block w-full max-w-[320px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/60"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

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

                  <button
                    type="submit"
                    className="mx-auto block w-full max-w-[320px] rounded-2xl border border-white/30 bg-white/10 py-3 text-lg font-bold backdrop-blur-md transition hover:bg-white/20"
                  >
                    회원가입
                  </button>
                </form>

                <p className="mt-5 text-center text-sm">
                  이미 계정이 있으신가요?{' '}
                  <Link to="/login" className="font-bold text-white">
                    로그인
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
