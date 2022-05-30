export const fetcher = (...args) => {
  return fetch(...args).then(async (res) => {
    let payload;
    try {
      if (res.status === 204) return null; // 204 does not have body
      // console.log('res',res);
      payload = await res.json();
    } catch (e) {
      // console.log('e',JSON.parse(e));
      /* noop */
    }
    if (res.ok) {
      // console.log('payload',payload);
      return payload;
    } else {
      // console.log('error',JSON.parse(payload));
      // return Promise.reject(payload.error || new Error('Something went wrong'));
      // return new Error('Something went wrong');
      const error = new Error('An error occurred while fetching the data.')
      // 将额外的信息附加到错误对象上。
      error.info = payload;
      error.status = res.status;
      // console.log(error);
      throw error
    }
  });
};
