import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';

import { CheckBox, PasswordInput, UpLoadButton, FileFind } from '../../components';
import { actionCreators } from '../../state';
import { getFileSize } from '../../utils';
import * as S from './styled';

export const MainPage: React.FC = () => {
  const [retentionPeriod, setRetentionPeriod] = useState(false);
  const [downloadCount, setDownloadCount] = useState(false);
  const [passwordBoolean, setPasswordBoolean] = useState(false);
  const [fileProps, setFileProps] = useState({ name: '', size: '', fileType: '', files: '' });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { SetSusccesFileProps } = bindActionCreators(actionCreators, dispatch);

  const handleChangeFile = (event: any) => {
    setFileProps({
      name: event.target.files[0].name.split('.')[0],
      size: getFileSize(event.target.files[0].size),
      fileType: event.target.files[0].name.split('.')[1],
      files: event.target.files[0],
    });
    SetSusccesFileProps({
      name: event.target.files[0].name.split('.')[0],
      size: getFileSize(event.target.files[0].size),
      fileType: event.target.files[0].name.split('.')[1],
      files: event.target.files[0],
    });
  };

  const UpLoad = async () => {
    if (fileProps.files != '') {
      const formdata = new FormData();
      formdata.append('file', fileProps.files);
      await axios({
        method: 'post',
        url: 'https://tfb.minpeter.cf/upload',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          console.log(res);
          navigate('/success');
        })
        .catch((err) => {
          console.log(err);
          toast.error('업로드 실패..', {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    } else {
      toast.error('파일을 선택해주세요!', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <S.MainPageContainer>
      <S.MainPageCheckBoxSection>
        <CheckBox
          click={() => setRetentionPeriod(!retentionPeriod)}
          isCheck={retentionPeriod}
          label={'유지기간'}
        />
        <CheckBox
          click={() => setDownloadCount(!downloadCount)}
          isCheck={downloadCount}
          label={'다운로드 횟수'}
        />
        <CheckBox
          click={() => setPasswordBoolean(!passwordBoolean)}
          isCheck={passwordBoolean}
          label={'비밀번호'}
        />
      </S.MainPageCheckBoxSection>
      {passwordBoolean ? <PasswordInput placeholder="비밀번호를 입력해주세요." /> : <></>}
      <FileFind handleChangeFile={handleChangeFile} fileProps={fileProps} />
      <UpLoadButton type={'button'} value={'업로드'} onClick={UpLoad} />
    </S.MainPageContainer>
  );
};
