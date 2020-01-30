import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from '../../constants';

const Avatar = (props) => {
  const { profile, setAvatarUrl } = props;

  const handleImageUpload = async (evt) => {
    // Not so good way of validation(test mode)
    if (evt.target.files[0].size > 307200) {
      alert('File is too big!');
      evt.target.value = '';
    }

    const imageFile = new FormData();
    imageFile.append('file', evt.target.files[0]);
    imageFile.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    await axios
      .post(CLOUDINARY_URL, imageFile)
      .then((res) => {
        setAvatarUrl('avatar', res.data.secure_url);
      })
      .catch((err) => err);
  };

  return (
    <ImageStyledContainer>
      <StyledImage>
        <img
          src={profile.avatar}
          alt={profile.avatar && `${profile.firstName}-avatar`}
        />
      </StyledImage>

      <UploadIcon>
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            aria-label="profile picture"
            onChange={handleImageUpload}
            accept="image/*"
          />
          <span></span>
        </label>
      </UploadIcon>
    </ImageStyledContainer>
  );
};

const ImageStyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  input::-webkit-file-upload-button {
    display: none;
  }

  span::before {
    content: 'Select profile picture';
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
  span:hover::before {
    border-color: black;
  }
  span:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`;

const UploadIcon = styled.div`
  text-align: center;
`;

const StyledImage = styled.div`
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

export default Avatar;
