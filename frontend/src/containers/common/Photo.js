import React from 'react';
import { Header, Segment, Icon, Button, Input, Image } from 'semantic-ui-react';

function Photo(props) {
  const {
    photo,
    setDeatilImageFile,
    setDetailImageUrl,
    setIsImageModified,
    isCircular,
  } = props;

  const setImageFromFile = ({ file, setImageUrl }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl({ result: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const onClickDeletePhotoButton = () => {
    setDetailImageUrl(null);
    setDeatilImageFile(null);
    setIsImageModified(2);
  };

  const onClickFindPhotoButton = ({ target: { files } }) => {
    if (files.length) {
      setImageFromFile({
        file: files[0],
        setImageUrl: ({ result }) => {
          setDeatilImageFile(files[0]);
          setDetailImageUrl(result);
        },
      });
      setIsImageModified(1);
    }
  };

  return (
    <>
      <Segment placeholder circular={isCircular} size="small">
        {photo ? (
          <div className="image_area">
            <Image size="medium" circular={isCircular} src={photo} />
          </div>
        ) : (
          <Header icon>
            <Icon name="photo" />
            No photo uploaded yet!
          </Header>
        )}
      </Segment>
      <Input
        id="input_file"
        type="file"
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        onChange={onClickFindPhotoButton}
      />
      <Button id="button_delete" primary onClick={onClickDeletePhotoButton}>
        Delete Photo
      </Button>
    </>
  );
}

export default Photo;
