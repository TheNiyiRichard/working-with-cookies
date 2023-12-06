document.addEventListener('DOMContentLoaded', function () {
    setTimeout(checkCookies, 1000);
  });

 
    const cookiesModal = document.getElementById('cookie-modal');
  
  function checkCookies() {
    const cookieDetails = getCookies();
  
    if (cookieDetails.status === 'rejected') {
      // Cookies are rejected, take appropriate action
      showCookieModal();
    } else if (cookieDetails.status === 'accepted') {
      // Cookies are accepted, you can use cookieDetails.settings to get accepted settings
      console.log('Cookies are accepted with the following settings:', cookieDetails.settings);
    }
  }
  
  function getCookies() {
    const cookieConsent = getCookie('cookieConsent');
  
    if (cookieConsent === 'rejected') {
      return { status: 'rejected' };
    } else if (cookieConsent === 'accepted') {
      const settings = {
        browser: getCookie('browser'),
        os: getCookie('os'),
        width: getCookie('width'),
        height: getCookie('height')
      };
  
      return { status: 'accepted', settings };
    } else {
      return { status: 'rejected' };
    }
  }
  
  const settingsModal = document.getElementById('settings-modal')

  function showCookieModal() {
    cookiesModal.style.display = "block";
  }
  
  function acceptAllCookies() {
    setAllCookies();
    hideModals();
  }
  
  function showSettings() {
    settingsModal.style.display = "block"
  }
  
  function saveSettings() {
    const browser = document.getElementById('browserCheckbox').checked;
    const os = document.getElementById('osCheckbox').checked;
    const width = document.getElementById('widthCheckbox').checked;
    const height = document.getElementById('heightCheckbox').checked;
  
    setCookies(browser, os, width, height);
    hideModals();
  }
  
  function hideModals() {
    document.getElementById('cookie-modal').style.display = 'none';
    document.getElementById('settings-modal').style.display = 'none';
  }
  
  function setAllCookies() {
    setCookies(true, true, true, true);
  }
  
  function setCookies(browser, os, width, height) {
    if (browser) {
      setCookie('browser', getBrowserName(), 20);
    }
  
    if (os) {
      setCookie('os', getOsName(), 20);
    }
  
    if (width) {
      setCookie('width', window.screen.width, 20);
    }
  
    if (height) {
      setCookie('height', window.screen.height, 20);
    }
  
    setCookie('cookieConsent', 'accepted', 20);
  }
  
  function setCookie(name, value, seconds) {
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
  }
  
  function getCookie(name) {
    const cookieName = name + '=';
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
  
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  
    return '';
  }
  
  function getBrowserName() {
    const agent = navigator.userAgent.toLowerCase();
  
    if (agent.indexOf('chrome') > -1) {
      return 'Chrome';
    } else if (agent.indexOf('firefox') > -1) {
      return 'Firefox';
    } else if (agent.indexOf('safari') > -1) {
      return 'Safari';
    } else if (agent.indexOf('edge') > -1 || agent.indexOf('edg') > -1) {
      return 'Edge';
    } else {
      return 'Unknown';
    }
  }
  
  function getOsName() {
    const platform = navigator.platform.toLowerCase();
  
    if (platform.indexOf('win') > -1) {
      return 'Windows';
    } else if (platform.indexOf('mac') > -1) {
      return 'Mac';
    } else if (platform.indexOf('linux') > -1) {
      return 'Linux';
    } else {
      return 'Unknown';
    }
  }
  
  window.addEventListener("load", )