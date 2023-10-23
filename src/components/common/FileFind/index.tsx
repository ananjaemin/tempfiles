import React from 'react';

import * as S from './styled';

type FileFindProps = {
  handleChangeFile: React.ChangeEventHandler<HTMLInputElement>;
  handleDrop: React.DragEventHandler<HTMLLabelElement>;
  handleDragOver: React.DragEventHandler<HTMLLabelElement>;
  fileProps: {
    files: {
      filename: string;
      size: string;
      fileType: string;
      fileData: any;
    }[];
  };
};

export const FileFind: React.FC<FileFindProps> = ({
  handleChangeFile,
  handleDrop,
  handleDragOver,
  fileProps,
}) => (
  <S.FileFindContainer>
    <S.FileFindLabelBox
      id="label-file-upload"
      htmlFor="input-file-upload"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {fileProps.files.length === 0 ? (
        <>
          <S.FileFindText>파일을 드래그하거나</S.FileFindText>
          <S.FileFindText>클릭하여 파일을 선택해주세요.</S.FileFindText>
        </>
      ) : (
        <>
          <S.FileFindText>{fileProps.files.length}개의 파일이 선택되었습니다.</S.FileFindText>
        </>
      )}
    </S.FileFindLabelBox>

    <S.FileFindButton htmlFor="input-file-upload">찾아보기</S.FileFindButton>
    <input
      id="input-file-upload"
      type={'file'}
      multiple={true}
      style={{ display: 'none' }}
      onChange={handleChangeFile}
    />
  </S.FileFindContainer>
);
