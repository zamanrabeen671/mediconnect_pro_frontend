import isEmpty from "lodash/isEmpty";

const TOKEN_KEY = "jwtToken";
const USER_INFO = "userInfo";


const auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key: string) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  clearUserInfo(userInfo = USER_INFO) {
    return auth.clear(userInfo);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: string): any | null {
    if (localStorage && localStorage.getItem(key)) {
      const value = localStorage.getItem(key)!;
      try {
        return JSON.parse(value);
      } catch {
        return value; // 👈 token will come here
      }
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      const value = sessionStorage.getItem(key)!;
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  getUserInfo(userInfo = USER_INFO) {
    return auth.get(userInfo);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value: any, key: string, isLocalStorage?: boolean) {
    if (isEmpty(value)) return null;

    const storedValue =
      typeof value === "string" ? value : JSON.stringify(value);

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, storedValue);
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, storedValue);
    }

    return null;
  },

  setToken(value = "", isLocalStorage = true, tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  setUserInfo(value = "", isLocalStorage = true, userInfo = USER_INFO) {
    return auth.set(value, userInfo, isLocalStorage);
  },
};

export default auth;
