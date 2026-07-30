(function () {
    'use strict';

    var ADMIN_USER = 'SUPERVISORES';
    var ADMIN_PASS = 'Corp1997';
    var SALT = 'AVIF-RDA-2026-Corp';
    var CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var STORAGE_KEY = 'avif_access_date';
    var ADMIN_KEY = 'avif_admin_session';

    function getTodayKey() {
        return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
    }

    function hashSeed(str) {
        var h = 0;
        for (var i = 0; i < str.length; i++) {
            h = ((h << 5) - h) + str.charCodeAt(i);
            h |= 0;
        }
        return Math.abs(h);
    }

    function generateDailyPassword() {
        var dateStr = getTodayKey();
        var seed = hashSeed(dateStr + SALT);
        var password = '';
        for (var i = 0; i < 8; i++) {
            seed = hashSeed(String(seed) + i + SALT + dateStr);
            password += CHARS[seed % CHARS.length];
        }
        return password;
    }

    function hasAccess() {
        try {
            return sessionStorage.getItem(STORAGE_KEY) === getTodayKey();
        } catch (e) {
            return false;
        }
    }

    function grantAccess() {
        try {
            sessionStorage.setItem(STORAGE_KEY, getTodayKey());
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

    function getNextResetLabel() {
        var now = new Date();
        var mx = new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
        var next = new Date(mx);
        next.setHours(24, 0, 0, 0);
        return next.toLocaleString('es-MX', {
            timeZone: 'America/Mexico_City',
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function validateAccessInput(input) {
        return input.trim().toUpperCase() === generateDailyPassword();
    }

    function bindWallEvents() {
        var input = document.getElementById('access-wall-input');
        var submit = document.getElementById('access-wall-submit');
        var error = document.getElementById('access-wall-error');

        function tryAccess() {
            if (!input) return;
            if (validateAccessInput(input.value)) {
                grantAccess();
                hideWall();
                if (error) error.classList.add('d-none');
            } else if (error) {
                error.classList.remove('d-none');
                input.value = '';
                input.focus();
            }
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
                if (error) error.classList.add('d-none');
            });
        }
    }

    function isAdminLoggedIn() {
        try {
            return sessionStorage.getItem(ADMIN_KEY) === '1';
        } catch (e) {
            return false;
        }
    }

    function setAdminLoggedIn(val) {
        try {
            if (val) sessionStorage.setItem(ADMIN_KEY, '1');
            else sessionStorage.removeItem(ADMIN_KEY);
        } catch (e) { /* ignore */ }
    }

    function showAdminPanel() {
        var modal = document.getElementById('admin-security-modal');
        var loginView = document.getElementById('admin-login-view');
        var panelView = document.getElementById('admin-panel-view');
        var dailyPass = document.getElementById('admin-daily-password');
        var resetLabel = document.getElementById('admin-reset-time');

        if (!modal) return;
        modal.style.display = 'flex';

        if (isAdminLoggedIn()) {
            if (loginView) loginView.style.display = 'none';
            if (panelView) panelView.style.display = 'block';
            if (dailyPass) dailyPass.textContent = generateDailyPassword();
            if (resetLabel) resetLabel.textContent = getNextResetLabel();
        } else {
            if (loginView) loginView.style.display = 'block';
            if (panelView) panelView.style.display = 'none';
        }
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
                if (user === ADMIN_USER && pass === ADMIN_PASS) {
                    setAdminLoggedIn(true);
                    if (loginError) loginError.classList.add('d-none');
                    showAdminPanel();
                } else if (loginError) {
                    loginError.classList.remove('d-none');
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                setAdminLoggedIn(false);
                hideAdminPanel();
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                var pass = generateDailyPassword();
                var copied = document.getElementById('admin-copy-feedback');
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(pass).then(function () {
                        if (copied) {
                            copied.classList.remove('d-none');
                            setTimeout(function () { copied.classList.add('d-none'); }, 2000);
                        }
                    });
                } else {
                    var ta = document.createElement('textarea');
                    ta.value = pass;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    if (copied) {
                        copied.classList.remove('d-none');
                        setTimeout(function () { copied.classList.add('d-none'); }, 2000);
                    }
                }
            });
        }
    }

    function init() {
        document.body.classList.add('access-locked');
        bindWallEvents();
        bindAdminEvents();

        if (hasAccess()) {
            hideWall();
        } else {
            showWall();
            var input = document.getElementById('access-wall-input');
            if (input) setTimeout(function () { input.focus(); }, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
