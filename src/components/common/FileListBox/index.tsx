import React from 'react';
import { getShortFileName } from '../../../utils';
import * as S from './styled';

type FileListBoxProps = {
  filename: string;
  fileId: string;
  size: string;
  uploadDate: {
    year: number;
    month: number;
    day: number;
  };
  isEncrypted: boolean;
  click: () => void;
};

export const FileListBox: React.FC<FileListBoxProps> = ({
  filename,
  size,
  uploadDate,
  fileId,
  isEncrypted,
  click,
}) => (
  <S.FileListBoxContainer onClick={click}>
    <div className="long">
      {isEncrypted ? '🔐' : ''} {fileId != '' ? 'ID: ' + fileId + ' / ' : ''}파일이름: {filename} /
      크기:{size} / 업로드날짜:{uploadDate.year}-{uploadDate.month}-{uploadDate.day}
    </div>

    <div className="middle">
      <p>
        {isEncrypted ? '🔐' : ''} {fileId != '' ? 'ID: ' + fileId + ' / ' : ''} 크기:{size} /
        업로드날짜:{uploadDate.year}-{uploadDate.month}-{uploadDate.day}
      </p>
      <p>파일이름: {filename}</p>
    </div>

    <div className="short">
      <p>
        {isEncrypted ? '🔐' : ''} {fileId != '' ? 'ID: ' + fileId + ' / ' : ''} 크기:{size} /
        업로드날짜:{uploadDate.year}-{uploadDate.month}-{uploadDate.day}
      </p>
      <p>파일이름: {getShortFileName(filename)}</p>
    </div>
  </S.FileListBoxContainer>
);
