// Create ajax method which, uses XMLHttpRequest under the hood, but returns a promise
// It should accept two parameters: url – remote service endpoint (ex. https://example.com/api/shoes), config – possible configs described further
// Implement your own Promise library, which ajax must use

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;
    this.fulfillCallbacks = [];
    this.rejectCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.fulfillCallbacks.forEach((callback) => callback(this.value));
      }
    };

    const reject = (error) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.error = error;
        this.rejectCallbacks.forEach((callback) => callback(this.error));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    const promise = new MyPromise((resolve, reject) => {
      const fulfillCallback = (value) => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(value);
            resolve(result);
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      };

      const rejectCallback = (error) => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(error);
            resolve(result);
          } else {
            reject(error);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'fulfilled') {
        fulfillCallback(this.value);
      } else if (this.state === 'rejected') {
        rejectCallback(this.error);
      } else {
        this.fulfillCallbacks.push(fulfillCallback);
        this.rejectCallbacks.push(rejectCallback);
      }
    });

    return promise;
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}


function ajax(url, config = {}) {
  const { type = 'GET', headers = {}, data = {} } = config;

  return new MyPromise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: type,
        headers: headers,
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        resolve(result);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}

const url = 'https://jsonplaceholder.typicode.com/posts';

const p1 = ajax(url, {
  type: 'GET',
  headers: {},
  data: {}
}).then(() => {
  console.log('p1 fulfilled');
}).catch(() => {
  console.log('p1 rejected');
});

const p2 = ajax(url, {
  type: 'POST',
  headers: {},
  data: {
    title: 'New Post',
    body: 'This is the body of the new post',
    userId: 1
  }
}).then(() => {
  console.log('p2 fulfilled');
}).then(() => {
  console.log('p2 then callback executed');
}).catch(() => {
  console.log('p2 rejected');
});

const p3 = ajax(url, {
  type: 'GET',
  headers: {},
  data: {}
}).catch(() => {
  console.log('p3 rejected');
}).then(() => {
  console.log('p3 fulfilled');
}).then(() => {
  console.log('p3 then callback executed');
});

const p4 = ajax(url, {
  type: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer token123'
  },
  data: {
    name: 'A A-yan',
    age: 25
  }
}).then((response) => {
  console.log('p4 fulfilled with response:', response);
}).catch((error) => {
  console.log('p4 rejected with error:', error);
});

Promise.all([p1, p2, p3, p4])
  .catch(() => {
    console.log('Promise.all rejected');
  })
  .then(() => {
    console.log('Promise.all fulfilled');
  })
  .then(() => {
    console.log('Promise.all then callback executed');
  });