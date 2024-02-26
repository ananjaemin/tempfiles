import { Outlet, Route, Routes, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

import axios from 'axios';

import { MainPage, DownloadPage, DeletePage, FileListPage, ApiPage, NotFoundPage } from './pages';
import { ScrollArea } from '@/components/ui/scroll-area';

async function checkServerStatus() {
  return await axios.get(import.meta.env.VITE_APP_BACKEND_BASEURL);
}

export default function App() {
  const navigate = useNavigate();
  const [serverDown, setServerDown] = useState(false);

  useEffect(() => {
    // Replace this with a function that checks the status of the server
    checkServerStatus()
      .then(() => setServerDown(false))
      .catch(() => setServerDown(true));
  }, []);

  if (serverDown) {
    return (
      <div className="flex flex-col items-center justify-center h-screen py-4">
        🛠️ 서버 점검 중.. 잠시만 기다려주세요.
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col items-center justify-center h-screen py-4">
            <div className="flex flex-col gap-6">
              <a
                onClick={() => window.location.pathname !== '/' && navigate(-1)}
                className="cursor-pointer flex flex-col items-center justify-center w-full text-center"
              >
                <h1 className="scroll-m-20 text-4xl font-semibold">TEMPFILES</h1>
                <p className="text-sm text-muted-foreground">간단한 파일 공유 서비스</p>
              </a>

              <ScrollArea className="w-full h-96">
                <Outlet />
              </ScrollArea>
            </div>

            <div className="flex flex-row gap-1">
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Upload
              </Link>
              <Link to="/api" className={navigationMenuTriggerStyle()}>
                API
              </Link>
              <Link to="/list" className={navigationMenuTriggerStyle()}>
                File list
              </Link>
            </div>
          </div>
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
  );
}
