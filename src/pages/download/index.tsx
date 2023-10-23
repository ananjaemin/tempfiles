import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FileListBox, Button, SkeletonUI } from '../../components';
// import { useDeletePageNavigator } from '../../hooks';
// import { RootState } from '../../state/reducers';
import { getDate, getFileSize, getExpireTime } from '../../utils';
import * as S from './styled';

export const DownloadPage: React.FC = () => {
  // const navigate = useNavigate();
  // const downloadFileProps: any = useSelector((state: RootState) => state.DownloadFileProps);
  const [loading, setLoading] = useState(true);
  const { folderid } = useParams<{ folderid: string }>();
  const [fileProps, setFileProps] = useState({
    files: [
      {
        filename: '',
        size: '',
        downloadUrl: '',
        deleteUrl: '',
      },
    ],
    uploadDate: '',
    isEncrypted: false,
    downloadCount: 0,
    expireTime: {
      day: 0,
      hour: 0,
      minute: 0,
    },
  });
  // const [move] = useDeletePageNavigator(
  //   // todo fix it
  //   fileProps.files[0].deleteUrl,
  //   fileProps.isEncrypted,
  //   downloadFileProps.token
  // );

  useEffect(() => {
    const getFileProps = async () => {
      await axios({
        method: 'get',
        url: `${import.meta.env.VITE_APP_BACKEND_BASEURL}/file/${folderid}`,
      })
        .then((res) => {
          setLoading(false);
          const updatedFileProps = {
            files: res.data.files.map((file: any) => ({
              filename: file.fileName,
              size: getFileSize(file.fileSize),
              downloadUrl: file.downloadUrl,
              deleteUrl: file.deleteUrl,
            })),
            uploadDate: getDate(res.data.uploadDate),
            isEncrypted: res.data.isEncrypted,
            downloadCount: res.data.downloadLimit - res.data.downloadCount,
            expireTime: getExpireTime(res.data.expireTime),
          };

          setFileProps(updatedFileProps);
        })
        .catch((err) => {
          // navigate('/');
          if (err.response.status !== 401) {
            toast.error(`error 문의해주세요. ${err.response.status}`, {
              duration: 3000,
              icon: '🔥',
            });
          } else {
            toast.error('잘못된 링크입니다', {
              duration: 3000,
              icon: '🔥',
            });
          }
        });
    };
    getFileProps();
  }, []);

  return (
    <S.DownloadPageContainer>
      {!loading ? (
        <>
          {fileProps.files.map((file, index) => (
            <div key={index}>
              <FileListBox filename={file.filename} size={file.size} />
            </div>
          ))}

          <S.DownloadFileStatusText>
            {/* 만료까지 {file.expireTime.day}일 {file.expireTime.hour}시간 {file.expireTime.minute}
                분 / {file.downloadCount}회 남았습니다. */}
            만료까지 XX일 XX시간 XX분 / XX회 남았습니다.
          </S.DownloadFileStatusText>
          <S.DownloadPageButtonSection>
            <a
            // href={`${file.download_url}${
            //   file.isEncrypted ? `?token=${downloadFileProps.token}` : ''
            // }`}
            >
              <Button click={() => {}} bgColor="var(--color-button-primary)" label="다운로드" />
            </a>
            <Button
              click={async () => {
                try {
                  // await navigator.clipboard.writeText(
                  //   // `${file.download_url}${
                  //   //   file.isEncrypted ? `?token=${downloadFileProps.token}` : ''
                  //   // }`
                  // );
                  toast.success('복사 완료', {
                    duration: 3000,
                    icon: '🎉',
                  });
                } catch (err) {
                  toast.error('복사 실패', {
                    duration: 3000,
                    icon: '❌',
                  });
                }
              }}
              bgColor="var(--color-button-primary)"
              label="링크복사"
            />
            <Button
              click={() => {
                // move();
              }}
              bgColor="var(--color-button-secondary)"
              label="파일삭제"
            />
          </S.DownloadPageButtonSection>
        </>
      ) : (
        <>
          <SkeletonUI width="80rem" height="4.6rem" margin="0" />
          <SkeletonUI width="64rem" height="6rem" margin="3rem 0px 0px 0px" />
        </>
      )}
    </S.DownloadPageContainer>
  );
};
