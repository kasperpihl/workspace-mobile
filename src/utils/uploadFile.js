import request from 'core/utils/request';

// Current specification of xhr does not have onprogress build-in
// xhr2 will have it some day :)
// In order to do that I have to use rn-fetch-blob
// which is calculating the progress of the send bytes / total bytes itself
// It's a project for better times
// It can also be used for downloading progress
// which is going to be cool on the attachment viewer

const uploadFilesToS3 = (file, signedUrl) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedUrl);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return resolve({ ok: true });
        } else {
          return resolve({ ok: false });
        }
      }
    };
    xhr.setRequestHeader('Content-Type', file.mime);
    xhr.send({ uri: file.path, type: file.mime, name: file.filename });
  });
};

export default async (file, ownedBy) => {
  let res = await request('file.getSignedUrl', {
    owned_by: ownedBy,
    file_name: file.filename,
    file_type: file.mime,
  });

  if (!res.ok) {
    return { ok: false };
  }

  const signedUrl = res.signed_url;
  const s3Url = res.s3_url;

  res = await uploadFilesToS3(file, signedUrl);

  if (!res.ok) {
    return { ok: false };
  }

  return await request('file.add', {
    owned_by: ownedBy,
    file_name: file.filename,
    s3_url: s3Url,
  });
};
