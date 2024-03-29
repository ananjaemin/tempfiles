import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { Navbar } from './components';
import * as S from './styles/app';

import { MainPage, DownloadPage, DeletePage, FileListPage, ApiPage, NotFoundPage } from './pages';
import axiosInstance from './utils/axios';

async function checkServerStatus() {
  return await axiosInstance.get('/');
}
const TOAST_LIMIT = 2;
export default function App() {
  const navigate = useNavigate();
  const [serverDown, setServerDown] = useState(false);

  useEffect(() => {
    // Replace this with a function that checks the status of the server
    checkServerStatus()
      .then(() => setServerDown(false))
      .catch(() => setServerDown(true));
  }, []);

  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);

  if (serverDown) {
    return (
      <S.InfoText>
        🛠️ 서버 점검 중
        <br />
        잠시만 기다려주세요.
      </S.InfoText>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <S.RootLayout>
              <div>
                <Toaster
                  toastOptions={{
                    style: {
                      backgroundColor: '#757BAB',
                      color: '#FFFFFF',
                    },
                  }}
                />
              </div>
              <div className="RootWrapper">
                <a
                  className="LinkBox"
                  onClick={() => {
                    if (window.location.pathname !== '/') {
                      navigate(-1);
                    }
                  }}
                >
                  <div className="Text">TEMPFILES</div>
                  <div className="SubText">간단한 파일 공유 서비스</div>
                </a>
                <Outlet />
              </div>
              <Navbar />
            </S.RootLayout>
          }
        >
          <Route index element={<MainPage />} />
          <Route path="/dl/:folderid" element={<DownloadPage />} />
          <Route path="/del/:folderid" element={<DeletePage />} />
          <Route path="/list" element={<FileListPage />} />
          <Route path="/api/*" element={<ApiPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
