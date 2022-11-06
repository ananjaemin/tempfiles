import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { FileListBox, SkeletonUIBox } from '../../components';
import { actionCreators } from '../../state';
import { getFileSize, getShortFileName, getDate } from '../../utils';
import * as S from './styled';

export const FileListPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const SkeletonUIRandomWidth = ['50', '55', '60', '65', '70', '75', '80'];
  const dispatch = useDispatch();
  const { SetDownloadFileProps } = bindActionCreators(actionCreators, dispatch);
  const [fileList, setFileList] = useState<any[]>();
  const getFileList = async () => {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_BASEURL}/list`,
    })
      .then((res) => {
        setFileList(res.data.list); //파일리스트 요소 갯수에 따른 핸들링 추가예정
        setTimeout(() => {
          setLoading(true); //loading 확인하고싶으면 false로 바꿔주세요.
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFileList();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <S.FileListPageContainer>
            {fileList?.map((item, index) => (
              <FileListBox
                key={index}
                filename={getShortFileName(item.filename)}
                size={getFileSize(item.size)}
                LastModified={getDate(item.lastModified)}
                click={() => {
                  SetDownloadFileProps({
                    Name: item.filename,
                    Size: item.size,
                    LastModified: item.lastModified,
                    //passowrd 유무 추가예정
                  });
                  navigate('/download');
                }}
              />
            ))}
          </S.FileListPageContainer>
          <S.FileListPageBoxShoadow />
        </>
      ) : (
        <>
          <S.FileListPageContainer>
            <SkeletonUIBox randomWitdh={SkeletonUIRandomWidth[Math.floor(Math.random() * 6)]} />
            <SkeletonUIBox randomWitdh={SkeletonUIRandomWidth[Math.floor(Math.random() * 6)]} />
            <SkeletonUIBox randomWitdh={SkeletonUIRandomWidth[Math.floor(Math.random() * 6)]} />
            <SkeletonUIBox randomWitdh={SkeletonUIRandomWidth[Math.floor(Math.random() * 6)]} />
            <SkeletonUIBox randomWitdh={SkeletonUIRandomWidth[Math.floor(Math.random() * 6)]} />
            <SkeletonUIBox randomWitdh={SkeletonUIRandomWidth[Math.floor(Math.random() * 6)]} />
            <SkeletonUIBox randomWitdh={SkeletonUIRandomWidth[Math.floor(Math.random() * 6)]} />
          </S.FileListPageContainer>
          <S.FileListPageBoxShoadow />
        </>
      )}
    </>
  );
};
