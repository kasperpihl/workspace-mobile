import request from 'core/utils/request';
import RNFS from 'react-native-fs';

const uploadProgress = response => {
  const percentage = Math.floor(
    (response.totalBytesSent / response.totalBytesExpectedToSend) * 100
  );
  console.log('UPLOAD IS ' + percentage + '% DONE!');
};

const uploadFilesToS3 = (file, uploadUrl) => {
  const files = [
    {
      name: file.filename,
      filename: file.filename,
      filepath: file.path,
      filetype: file.mime,
    },
  ];

  return RNFS.uploadFiles({
    toUrl: uploadUrl,
    files: files,
    method: 'PUT',
    headers: {
      'Content-Type': file.mime,
    },
    // begin: uploadBegin,
    progress: uploadProgress,
  })
    .promise.then(response => {
      if (response.statusCode == 200) {
        console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      } else {
        console.log('SERVER ERROR');
      }
    })
    .catch(err => {
      if (err.description === 'cancelled') {
        // cancelled by user
      }
      console.log(err);
    });
};

export default async (file, ownedBy) => {
  let res = await request('file.getSignedUrl', {
    owned_by: ownedBy,
    file_name: file.filename,
    file_type: file.mime,
  });

  if (!res.ok) {
    //T_TODO show error
  }

  const signedUrl = res.signed_url;
  const s3Url = res.s3_url;

  res = await uploadFilesToS3(file, signedUrl);

  if (!res.ok) {
    // T_TODO show error
  }

  return await request('file.add', {
    owned_by: ownedBy,
    file_name: fileName,
    s3_url: s3Url,
  });
};
