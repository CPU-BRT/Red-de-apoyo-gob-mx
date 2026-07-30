(function () {
    'use strict';

    var TOKEN_KEY = 'avif_access_token';
    var ADMIN_TOKEN_KEY = 'avif_admin_token';
    var cachedDailyPassword = '';

    function apiPost(url, payload) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function (res) {
            return res.json();
        });
    }

    function getStoredToken(key) {
        try {
            return sessionStorage.getItem(key) || '';
        } catch (e) {
            return '';
        }
    }

    function setStoredToken(key, value) {
        try {
            if (value) sessionStorage.setItem(key, value);
            else sessionStorage.removeItem(key);
        } catch (e) { /* ignore */ }
    }

    function hideWall() {
        var wall = document.getElementById('access-wall');
        if (wall) wall.classList.add('access-wall-hidden');
        document.body.classList.remove('access-locked');
    }

    function showWall() {
        var wall = document.getElementById('access-wall');
        if (wall) wall.classList.remove('access-wall-hidden');
        document.body.classList.add('access-locked');
    }

    function verifyAccessToken(token) {
        if (!token) return Promise.resolve(false);
        return apiPost('/api/access', { action: 'check', token: token })
            .then(function (data) { return !!data.valid; })
            .catch(function () { return false; });
    }

    function bindWallEvents() {
        var input = document.getElementById('access-wall-input');
        var submit = document.getElementById('access-wall-submit');
        var error = document.getElementById('access-wall-error');

        function tryAccess() {
            if (!input || submit.disabled) return;

            submit.disabled = true;
            apiPost('/api/access', { action: 'validate', password: input.value })
                .then(function (data) {
                    if (data.valid && data.token) {
                        setStoredToken(TOKEN_KEY, data.token);
                        hideWall();
                        if (error) error.classList.add('d-none');
                    } else if (error) {
                        error.classList.remove('d-none');
                        input.value = '';
                        input.focus();
                    }
                })
                .catch(function () {
                    if (error) {
                        error.textContent = 'No se pudo verificar el acceso. Intente de nuevo.';
                        error.classList.remove('d-none');
                    }
                })
                .finally(function () {
                    submit.disabled = false;
                });
        }

        if (submit) submit.addEventListener('click', tryAccess);
        if (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    tryAccess();
                }
            });
            input.addEventListener('input', function () {
                if (error) {
                    error.textContent = 'Clave incorrecta. Verifique con su asesor.';
                    error.classList.add('d-none');
                }
            });
        }
    }

    function loadAdminPassword(adminToken) {
        return apiPost('/api/admin', { action: 'password', adminToken: adminToken })
            .then(function (data) {
                if (!data.ok) throw new Error('unauthorized');
                cachedDailyPassword = data.password || '';
                return data;
            });
    }

    function showAdminPanel() {
        var modal = document.getElementById('admin-security-modal');
        var loginView = document.getElementById('admin-login-view');
        var panelView = document.getElementById('admin-panel-view');
        var dailyPass = document.getElementById('admin-daily-password');
        var resetLabel = document.getElementById('admin-reset-time');
        var adminToken = getStoredToken(ADMIN_TOKEN_KEY);

        if (!modal) return;
        modal.style.display = 'flex';

        function showLogin() {
            if (loginView) loginView.style.display = 'block';
            if (panelView) panelView.style.display = 'none';
        }

        function showPanel(data) {
            if (loginView) loginView.style.display = 'none';
            if (panelView) panelView.style.display = 'block';
            if (dailyPass) dailyPass.textContent = data.password || '--------';
            if (resetLabel) resetLabel.textContent = data.expiresAt || '';
        }

        if (!adminToken) {
            showLogin();
            return;
        }

        apiPost('/api/admin', { action: 'verify', adminToken: adminToken })
            .then(function (data) {
                if (!data.ok) {
                    setStoredToken(ADMIN_TOKEN_KEY, '');
                    showLogin();
                    return null;
                }
                return loadAdminPassword(adminToken);
            })
            .then(function (data) {
                if (data) showPanel(data);
            })
            .catch(function () {
                showLogin();
            });
    }

    function hideAdminPanel() {
        var modal = document.getElementById('admin-security-modal');
        if (modal) modal.style.display = 'none';
    }

    function bindAdminEvents() {
        var trigger = document.getElementById('security-hidden-trigger');
        var supervisorTrigger = document.getElementById('supervisor-access-trigger');
        var wallLogo = document.querySelector('.access-wall-logo');
        var modal = document.getElementById('admin-security-modal');
        var closeBtn = document.getElementById('admin-close-btn');
        var loginForm = document.getElementById('admin-login-form');
        var logoutBtn = document.getElementById('admin-logout-btn');
        var copyBtn = document.getElementById('admin-copy-password');
        var loginError = document.getElementById('admin-login-error');

        if (trigger) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                showAdminPanel();
            });
        }

        if (supervisorTrigger) {
            supervisorTrigger.addEventListener('click', function (e) {
                e.preventDefault();
                showAdminPanel();
            });
        }

        if (wallLogo) {
            var logoClicks = 0;
            var logoTimer = null;
            wallLogo.addEventListener('click', function () {
                logoClicks++;
                clearTimeout(logoTimer);
                logoTimer = setTimeout(function () { logoClicks = 0; }, 800);
                if (logoClicks >= 3) {
                    logoClicks = 0;
                    showAdminPanel();
                }
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', hideAdminPanel);

        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) hideAdminPanel();
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var user = document.getElementById('admin-user').value.trim();
                var pass = document.getElementById('admin-pass').value;
                var submitBtn = loginForm.querySelector('button[type="submit"]');

                if (submitBtn) submitBtn.disabled = true;

                apiPost('/api/admin', { action: 'login', user: user, pass: pass })
                    .then(function (data) {
                        if (data.ok && data.adminToken) {
                            setStoredToken(ADMIN_TOKEN_KEY, data.adminToken);
                            if (loginError) loginError.classList.add('d-none');
                            return loadAdminPassword(data.adminToken);
                        }
                        if (loginError) loginError.classList.remove('d-none');
                        return null;
                    })
                    .then(function (data) {
                        if (data) showAdminPanel();
                    })
                    .finally(function () {
                        if (submitBtn) submitBtn.disabled = false;
                    });
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                setStoredToken(ADMIN_TOKEN_KEY, '');
                cachedDailyPassword = '';
                hideAdminPanel();
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                var pass = cachedDailyPassword;
                var copied = document.getElementById('admin-copy-feedback');
                if (!pass) return;

                function onCopied() {
                    if (copied) {
                        copied.classList.remove('d-none');
                        setTimeout(function () { copied.classList.add('d-none'); }, 2000);
                    }
                }

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(pass).then(onCopied);
                } else {
                    var ta = document.createElement('textarea');
                    ta.value = pass;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    onCopied();
                }
            });
        }
    }

    function init() {
        document.body.classList.add('access-locked');
        bindWallEvents();
        bindAdminEvents();
        showWall();

        verifyAccessToken(getStoredToken(TOKEN_KEY))
            .then(function (valid) {
                if (valid) {
                    hideWall();
                } else {
                    setStoredToken(TOKEN_KEY, '');
                    showWall();
                    var input = document.getElementById('access-wall-input');
                    if (input) setTimeout(function () { input.focus(); }, 100);
                }
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
