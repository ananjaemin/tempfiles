import React from 'react';

import { ReactComponent as LockIcon } from '../../../assets/lockIcon.svg';
import * as S from './styled';

type FileListBoxProps = {
  filename: string;
  size: string;
  uploadDate: any;
  isEncrypted: boolean;
  click: () => void;
};

export const FileListBox: React.FC<FileListBoxProps> = ({
  filename,
  size,
  uploadDate,
  isEncrypted,
  click,
}) => (
  <S.FileListBoxContainer onClick={click}>
    {isEncrypted ? <LockIcon width={'2.3rem'} style={{ marginRight: '0.5rem' }} /> : <></>}
    파일이름: {filename} / 크기:{size} / 업로드날짜:{uploadDate.year}-{uploadDate.month}-
    {uploadDate.day}
  </S.FileListBoxContainer>
);
