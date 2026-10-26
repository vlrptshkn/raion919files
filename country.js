<script>
(function() {
    
    var flagEl = document.createElement('div');
    flagEl.id = 'visitor-country-flag';
    flagEl.style.cssText = [
        'position: fixed',
        'bottom: 16px',
        'right: 16px',
        'z-index: 9999',
        'display: flex',
        'align-items: center',
        'gap: 6px',
        'padding: 6px 10px',
        'background: rgba(0,0,0,0.55)',
        'color: #fff',
        'font: 13px/1.2 -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
        'border-radius: 8px',
        'backdrop-filter: blur(4px)',
        'pointer-events: none',
        'opacity: 0',
        'transition: opacity 0.3s'
    ].join(';');

    var flagEmoji = document.createElement('span');
    flagEmoji.style.cssText = 'font-size: 22px; line-height: 1;';

    var countryName = document.createElement('span');

    flagEl.appendChild(flagEmoji);
    flagEl.appendChild(countryName);
    document.body.appendChild(flagEl);

    
    function codeToFlag(code) {
        if (!code || code.length !== 2) return '';
        code = code.toUpperCase();
        
        var base = 0x1F1E6;
        return String.fromCodePoint(
            base + (code.charCodeAt(0) - 65),
            base + (code.charCodeAt(1) - 65)
        );
    }

   
    fetch('https://ipapi.co/json/')
        .then(function(res) {
            if (!res.ok) throw new Error('API error');
            return res.json();
        })
        .then(function(data) {
            var code = data.country_code || data.country;
            var name = data.country_name || code || 'Unknown';
            if (!code) return;

            flagEmoji.textContent = codeToFlag(code);
            countryName.textContent = name;
            flagEl.style.opacity = '1';
        })
        .catch(function() {
            
            fetch('https://ipwho.is/')
                .then(function(r) { return r.json(); })
                .then(function(d) {
                    var code = d.country_code;
                    var name = d.country;
                    if (!code) return;
                    flagEmoji.textContent = codeToFlag(code);
                    countryName.textContent = name;
                    flagEl.style.opacity = '1';
                })
                .catch(function() {
                   
                });
        });
})();
</script>