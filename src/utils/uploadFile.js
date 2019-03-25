import request from 'core/utils/request';
import RNFS from 'react-native-fs';

const uploadProgress = response => {
  const percentage = Math.floor(
    (response.totalBytesSent / response.totalBytesExpectedToSend) * 100
  );
  console.log('UPLOAD IS ' + percentage + '% DONE!');
};

// const uploadFilesToS3 = (file, uploadUrl) => {
//   const files = [
//     {
//       filename: file.filename,
//       filepath: file.path,
//       filetype: file.mime,
//     },
//   ];

//   return RNFS.uploadFiles({
//     toUrl: uploadUrl,
//     files: files,
//     method: 'PUT',
//     headers: {
//       'Content-Type': file.mime,
//     },
//     // begin: uploadBegin,
//     // progress: uploadProgress,
//   })
//     .promise.then(response => {
//       if (response.statusCode == 200) {
//         console.log(response);
//         return { ok: true };
//       } else {
//         // T_TODO handle errors
//       }
//     })
//     .catch(err => {
//       if (err.description === 'cancelled') {
//         // cancelled by user
//       }
//       // T_TODO handle errors
//     });
// };

const uploadFilesToS3 = (file, signedUrl) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedUrl);
  // xhr.onprogress = uploadProgress;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Image successfully uploaded to S3');
      } else {
        console.log('Error while sending the image to S3');
      }
    }
  };
  xhr.setRequestHeader('Content-Type', file.mime);
  xhr.send({ uri: file.path, type: file.mime, name: file.filename });
};

export default async (file, ownedBy) => {
  console.log(file);
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

  console.log(s3Url);

  // const fileContent = await RNFS.readFile(file.path, 'base64');
  // console.log(fileContent);

  res = await uploadFilesToS3(file, signedUrl);

  // console.log(res);

  // if (!res.ok) {
  //   // T_TODO show error
  // }

  // return await request('file.add', {
  //   owned_by: ownedBy,
  //   file_name: file.filename,
  //   s3_url: s3Url,
  // });
};
