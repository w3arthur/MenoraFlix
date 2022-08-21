 export default function debounce(callback ){ 
  let timeout;
  return async (...args) => {
    if(timeout) clearTimeout(await timeout);
    timeout = setTimeout(
      async() => callback(...args)
      , 1500
    );
  };
}

// https://www.youtube.com/watch?v=cjIswDCKgu0