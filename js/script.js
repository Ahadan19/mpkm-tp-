document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked nav item
            item.classList.add('active');

            // Get target section id
            const targetId = item.getAttribute('data-target');

            // Hide all sections
            viewSections.forEach(section => {
                section.classList.remove('active-section');
            });

            // Show target section
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                targetSection.classList.add('active-section');
            }
        });
    });

    // 2. Copy to Clipboard Logic
    const copyBtn = document.getElementById('copyBtn');
    const hiddenText = document.getElementById('hiddenUndanganText');
    const toast = document.getElementById('toast');

    if(copyBtn && hiddenText) {
        copyBtn.addEventListener('click', () => {
            // Select text from textarea
            hiddenText.style.display = 'block';
            hiddenText.select();
            hiddenText.setSelectionRange(0, 99999); /* For mobile devices */

            try {
                // Copy text
                navigator.clipboard.writeText(hiddenText.value).then(() => {
                    showToast();
                }).catch(err => {
                    // Fallback for older browsers
                    document.execCommand('copy');
                    showToast();
                });
            } catch (err) {
                console.error('Failed to copy text: ', err);
                alert('Gagal menyalin teks. Silakan blok teks secara manual.');
            } finally {
                // Hide textarea again
                hiddenText.style.display = 'none';
            }
        });
    }

    // 3. Toast Notification Logic
    function showToast() {
        if(toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000); // Hide after 3 seconds
        }
    }

    // 4. Real-time Countdown Logic
    const countdownEl = document.getElementById('countdown');
    if(countdownEl) {
        // Target date: Kamis, 28 Mei 2026, 23:59:59
        const targetDate = new Date('May 28, 2026 23:59:59').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownEl.innerHTML = "Sisa Waktu: Sprint Selesai!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Tampilkan Sisa Waktu
            countdownEl.innerHTML = `Sisa Waktu: ${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
        }

        // Update setiap detik
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Call immediately on load
    }
});
