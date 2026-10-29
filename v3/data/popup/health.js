const check = () => {
  if (confirm(i18n.get('pp_health'))) {
    chrome.runtime.reload();
  }
};
check.id = setTimeout(check, 2000);

chrome.runtime.sendMessage({
  method: 'echo'
}, r => {
  if (r) {
    clearTimeout(check.id);
    console.info('health check passed');
  }
});
