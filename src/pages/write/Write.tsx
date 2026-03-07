import { useState, useRef } from 'react';
import Header from '../../shared/components/header/Header';
import Box from '../../shared/components/box/Box';
import WriteForm from '../../shared/components/write/WriteForm';
import uploadIcon from '@assets/write/upload.svg';

const Write = () => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <Header pageName="Write" />
      <div className="flex flex-col gap-5 px-5 pt-6">
        <section className="pl-[2px]">
          <p className="text-[12px] font-medium text-gray-500">기록이 성공을 만듭니다✍️</p>
          <h1 className="mt-1 text-[18px] font-bold">매매 기록하기</h1>
        </section>

        {/* 메인 폼 */}
        <Box>
          <WriteForm />
        </Box>

        {/* 사진 업로드 버튼 */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleUploadClick}
            className="flex h-[56px] w-full items-center justify-between rounded-[12px] bg-[#646BFA] px-5 font-bold text-white"
          >
            <span>사진 업로드</span>
            <img src={uploadIcon} alt="upload" />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          {fileName && <p className="pl-1 text-[12px] text-gray-400">{fileName}</p>}
        </div>

        {/* 저장하기 버튼 */}
        <button className="mt-2 h-[60px] w-full rounded-[12px] bg-[#646BFA] text-[18px] font-bold text-white shadow-lg transition-transform active:scale-[0.98]">
          저장하기
        </button>
      </div>
    </main>
  );
};

export default Write;
