import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '../../components';
import { RootState } from '../../state/reducers';
import * as S from './styled';

export const DeletePage: React.FC = () => {
  const navigate = useNavigate();
  const DeleteFileName = useSelector((state: RootState) => state.DeleteFileName);
  useEffect(() => {
    if (DeleteFileName === '') {
      navigate('/');
    }
  });

  const deleteFile = async () => {
    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_BACKEND_BASEURL}/del/${DeleteFileName}`,
    })
      .then((res) => {
        console.log(res);
        navigate(-1);
        toast.success('삭제 완료', {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`삭제 실패 ${err.response.status}`, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <S.DeletePageContainer>
      <S.DeletePagePageLabel>업로드된 파일을 서버에서 삭제하시겠습니까?</S.DeletePagePageLabel>
      <S.DeletePageButtonSection>
        <Button bgColor="var(--color-button-primary)" label="확인" click={deleteFile} />
        <Button bgColor="var(--color-button-primary)" label="취소" click={() => navigate(-1)} />
      </S.DeletePageButtonSection>
    </S.DeletePageContainer>
  );
};
