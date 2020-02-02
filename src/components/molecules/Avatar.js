import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from '../../constants';
import { SmallStyled } from './../atom';

export const Avatar = (props) => {
  const { profile, setAvatarUrl, error } = props;

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (evt) => {
    // Not so good way of validation(test mode)
    if (evt.target.files[0].size > 307200) {
      alert('File is too big!');
      evt.target.value = '';
    }

    setUploading((prevState) => !prevState);

    const imageFile = new FormData();
    imageFile.append('file', evt.target.files[0]);
    imageFile.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    await axios
      .post(CLOUDINARY_URL, imageFile)
      .then((res) => {
        setAvatarUrl('avatar', res.data.secure_url);
        setTimeout(() => setUploading((prevState) => !prevState), 3000);
      })
      .catch((err) => err);
  };

  const renderUploadingButton = () => {
    if (uploading) {
      return <StyledUploadIcon uploading={uploading}></StyledUploadIcon>;
    } else {
      return (
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            aria-label="profile picture"
            onChange={handleImageUpload}
            accept="image/*"
          />
          <StyledUploadIcon></StyledUploadIcon>
        </label>
      );
    }
  };

  return (
    <ImageStyledContainer>
      <StyledImage>
        <img
          src={profile.avatar}
          alt={profile.avatar && `${profile.firstName}-avatar`}
        />
      </StyledImage>

      <UploadIcon>{renderUploadingButton()}</UploadIcon>

      <SmallStyled>{error || ''}</SmallStyled>
    </ImageStyledContainer>
  );
};

const ImageStyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  input::-webkit-file-upload-button {
    display: none;
  }
`;

const StyledUploadIcon = styled.span`
  ::before {
    ${'' /* content: 'Select profile picture'; */}
    content: "${(props) =>
      props.uploading ? 'uploading...' : 'Select profile picture'}";
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
  :hover::before {
    border-color: black;
  }
  :active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`;

const UploadIcon = styled.div`
  text-align: center;
`;

const StyledImage = styled.div`
  margin-bottom: 20px;
  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    border: 1px solid #999;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;
