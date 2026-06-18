// Decision Lego runtime configuration
(function () {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  window.DECISION_LEGO_CONFIG = Object.freeze({
    API_BASE: isLocal ? 'http://localhost:3000/ai/v1' : 'https://api.3dpolitics.xyz/ai/v1',
    USE_CASE: 'decisionlego_image'
  });
})();
