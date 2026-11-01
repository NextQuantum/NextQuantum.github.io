/**
 * EasyPi Website - Main JavaScript
 * Modern ES6+ with Intersection Observer, smooth animations, and interactivity
 */

// ==================
// Theme Management
// ==================
const ThemeManager = {
    init() {
        this.themeToggle = document.getElementById('themeToggle');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        // Load saved theme or use system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (this.prefersDark.matches) {
            this.setTheme('dark');
        }

        // Event listeners
        this.themeToggle?.addEventListener('click', () => this.toggle());
        this.prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        this.setTheme(current === 'dark' ? 'light' : 'dark');
    }
};

// ==================
// Internationalization (i18n)
// ==================
const I18nManager = {
    translations: {
        en: {
            "hero-tagline": "Your Raspberry Pi. Your network. One control plane.",
            "hero-description": "Monitor the Pi, control the network path, protect every device, and keep your data at home. Security, routing, storage, cameras, recovery, and local AI live in one clear interface.",
            "hero-cta-primary": "Install Now",
            "hero-cta-secondary": "View Features",
            "stat-services-label": "Services Supported",
            "stat-apps-label": "Apps Blockable",
            "stat-license-label": "Secure",
            "features-title": "Powerful Features",
            "features-description": "Everything you need to turn your Raspberry Pi into a professional home server.",
            "install-title": "Install a Verified Release",
            "install-tab-binary": "Binary Release (Recommended)",
            "install-tab-source": "From Source",
            "setup-title": "🔑 Initial Setup",
            "setup-warning": "No default credentials. You will create your admin account during the first setup. Make sure to save your recovery token!",
            "footer-copyright": "© 2026 EasyPi. Distributed under a Proprietary License.",
            "footer-made-with": "Made with ❤️ for the Raspberry Pi community",
            "legal-title": "Legal",
            "nav-features": "Features",
            "nav-security": "Security",
            "nav-ai": "AI Assistant",
            "nav-parental": "Parental",
            "nav-network": "Network",
            "nav-mobile": "Mobile",
            "nav-gallery": "Gallery",
            "nav-modules": "Modules",
            "nav-install": "Install",
            "nav-docs": "Docs",
            "footer-product": "Product",
            "footer-resources": "Resources",
            "footer-release-latest": "Latest Release",
            "footer-release-all": "All Releases",
            "footer-issues": "Issues",
            "footer-discussions": "Discussions",
            "all-features-badge": "Features",
            "all-features-title": "All EasyPi Functions",
            "all-features-desc": "Every main module is shown below with a real screenshot from the corresponding EasyPi section.",
            "mobile-card-title": "EasyPi Mobile",
            "mobile-card-desc": "Android companion for private protection, Chameleon VPN, photos, file sharing, and home cameras.",
            "mobile-card-l1": "One-time QR pairing",
            "mobile-card-l2": "Independent PRISM and Chameleon controls",
            "mobile-card-l3": "Private photos, sharing, and camera access",
            "mobile-badge": "Android companion",
            "mobile-title": "EasyPi protection and private services on your phone",
            "mobile-desc": "EasyPi Mobile links an Android 11+ phone to your home EasyPi with a one-time QR code. A restricted Mobile API token and pinned HTTPS connection keep remote management separate from full-device VPN traffic.",
            "mobile-prism-title": "PRISM Protection",
            "mobile-prism-desc": "Applies authenticated EasyPi domain policy locally to DNS and TLS SNI traffic.",
            "mobile-vpn-title": "Chameleon VPN",
            "mobile-vpn-desc": "Routes all traffic or selected apps through Chameleon, independently from PRISM.",
            "mobile-cloud-title": "Photos and sharing",
            "mobile-cloud-desc": "Syncs a chosen photo folder and accepts Android Share actions for private uploads to EasyPi.",
            "mobile-camera-title": "Dashboard and cameras",
            "mobile-camera-desc": "Shows this phone's DNS protection statistics and snapshots from cameras connected to EasyPi.",
            "mobile-security-note": "Tokens and the Chameleon profile are encrypted with Android Keystore. The app uses no Accessibility service, does not inspect the screen, disables cleartext traffic, and keeps Mobile Link available while the VPN reconnects.",
            "mobile-platform": "Android 11+ · one VpnService · no cleartext traffic",
            "parental-badge": "Parental Control",
            "parental-title": "Bypass Detection + Immediate Response",
            "parental-desc": "EasyPi can detect encrypted DNS and proxy/VPN bypass attempts, log them, and apply device quarantine when needed.",
            "modules-badge": "Module Map",
            "modules-title": "EasyPi Product Modules",
            "modules-desc": "The website now mirrors the real EasyPi interface layout and core modules.",
            "modules-group-core": "Core Control",
            "modules-group-security": "Security & Family",
            "modules-group-network": "Network & Access",
            "modules-group-automation": "Automation",
            "gallery-badge": "Screenshots",
            "gallery-title": "Structured Gallery by Module",
            "gallery-desc": "Real screens from EasyPi, grouped by section so users can quickly understand what each module does.",
            "gallery-group-dashboard": "Dashboard",
            "gallery-group-guard": "Guard Security & Parental",
            "gallery-group-network": "Network Toolkit & Activity",
            "gallery-group-ai": "AI, Backup & Support",
            "gallery-group-vpn": "VPN, Access & Operations",
            "install-subtitle": "Official target: Raspberry Pi OS Lite 64-bit, Debian Trixie, ARM64. Verify the publisher signature before privileged installation.",
            // Features
            "features-badge": "Features",
            "features-title-main": "Everything You Need to Manage Your Pi",
            "features-desc": "A comprehensive toolkit for monitoring, managing, and securing your Raspberry Pi",
            "f-dash-title": "Real-time Dashboard",
            "f-dash-desc": "Monitor CPU, RAM, temperature, and disk space with beautiful charts and live updates via WebSocket.",
            "f-dash-l1": "Live system metrics",
            "f-dash-l2": "Network traffic monitoring",
            "f-dash-l3": "Service status overview",
            "f-serv-title": "One-Click Services",
            "f-serv-desc": "Install WireGuard, Tailscale, Ollama and 15+ more services with a single click.",
            "f-serv-l1": "Service bundles",
            "f-serv-l2": "Auto-configuration",
            "f-serv-l3": "Easy management",
            "f-vpn-title": "VPN & Remote Access",
            "f-vpn-desc": "WireGuard management with QR codes, Tailscale integration, and cloud VPN connectivity.",
            "f-vpn-l1": "QR codes for mobile",
            "f-vpn-l2": "Tailscale Admin API",
            "f-vpn-l3": "PiCloud VPN",
            "f-back-title": "Backup & Restore",
            "f-back-desc": "Scheduled automatic backups with one-click restore. Never lose your configurations again.",
            "f-file-title": "File Manager",
            "f-file-desc": "Browse, edit, upload and download files through a modern web interface with syntax highlighting.",
            "f-term-title": "Web Terminal",
            "f-term-desc": "Full-featured SSH-less web terminal with support for custom themes and layouts.",
            // Security
            "sec-badge": "Security First",
            "sec-title": "Layered, Visible Security",
            "sec-desc": "Authentication, network policy, audit trails, and explicit trust boundaries work together.",
            "sec-2fa-title": "Two-Factor Authentication",
            "sec-2fa-desc": "TOTP-based 2FA for secure access",
            "sec-pg-title": "PiGuard Scanner",
            "sec-pg-desc": "Automated vulnerability detection",
            "sec-fw-title": "Firewall Management",
            "sec-fw-desc": "UFW / iptables easy configuration",
            "sec-gw-title": "Full Gateway Mode",
            "sec-gw-desc": "Ensures Pi stays the network gateway",
            // AI
            "ai-badge": "Local AI",
            "ai-title": "EasyPi-aware Ollama Chat",
            "ai-desc": "Local models answer with bounded context from packaged EasyPi documentation without indexing your secrets, logs, databases, or files.",
            "cap-diag": "Private Local Inference",
            "cap-setup": "EasyPi Documentation Context",
            "cap-chat": "Separate Diagnostic Agent",
            // Network
            "net-badge": "Network Tools",
            "net-title": "Professional Network Management",
            "net-desc": "Complete toolkit for network diagnostics, monitoring, and security",
            "tool-ps": "Port Scanner",
            "tool-ps-desc": "Scan ports with service detection",
            "tool-ld": "LAN Discovery",
            "tool-ld-desc": "Find local network devices",
            "tool-st": "Speed Test",
            "tool-st-desc": "Test connection speed",
            "tool-nm": "Network Map",
            "tool-nm-desc": "Visualize topology",
            "tool-tm": "Traffic Monitor",
            "tool-tm-desc": "Bandwidth monitoring",
            "tool-rc": "RTSP Cameras",
            "tool-rc-desc": "Manage security cameras",
            // Tech
            "tech-badge": "Technology",
            "tech-title": "Built with Modern Tech",
            "tech-desc": "Cutting-edge technologies for performance",
            // Installation
            "inst-title": "Quick Installation"
        },
        ru: {
            "hero-tagline": "Ваш Raspberry Pi. Ваша сеть. Одна панель управления.",
            "hero-description": "Следите за Pi, управляйте маршрутом трафика, защищайте устройства и храните данные дома. Безопасность, сеть, файлы, камеры, восстановление и локальный AI собраны в одном интерфейсе.",
            "hero-cta-primary": "Установить",
            "hero-cta-secondary": "Возможности",
            "stat-services-label": "Сервисов",
            "stat-apps-label": "Блокировок",
            "stat-license-label": "Защита",
            "features-title": "Мощные функции",
            "features-description": "Все необходимое, чтобы превратить ваш Raspberry Pi в профессиональный домашний сервер.",
            "install-title": "Установка проверенного релиза",
            "install-tab-binary": "Бинарный релиз (рекомендовано)",
            "install-tab-source": "Из исходников",
            "setup-title": "🔑 Первая настройка",
            "setup-warning": "Логина и пароля по умолчанию нет. Вы создадите учетную запись администратора при первом запуске. Обязательно сохраните токен восстановления!",
            "footer-copyright": "© 2026 EasyPi. Распространяется по проприетарной лицензии.",
            "footer-made-with": "Сделано с ❤️ для сообщества Raspberry Pi",
            "legal-title": "Юридическая информация",
            "nav-features": "Функции",
            "nav-security": "Защита",
            "nav-ai": "AI Ассистент",
            "nav-parental": "Родительский контроль",
            "nav-network": "Сеть",
            "nav-mobile": "Мобильное приложение",
            "nav-gallery": "Галерея",
            "nav-modules": "Модули",
            "nav-install": "Установка",
            "nav-docs": "Доки",
            "footer-product": "Продукт",
            "footer-resources": "Ресурсы",
            "footer-release-latest": "Последний релиз",
            "footer-release-all": "Все релизы",
            "footer-issues": "Проблемы",
            "footer-discussions": "Обсуждения",
            "all-features-badge": "Функции",
            "all-features-title": "Все функции EasyPi",
            "all-features-desc": "Ниже показаны основные модули с реальными скриншотами соответствующих разделов EasyPi.",
            "mobile-card-title": "EasyPi Mobile",
            "mobile-card-desc": "Android-приложение для персональной защиты, Chameleon VPN, фотографий, отправки файлов и домашних камер.",
            "mobile-card-l1": "Одноразовое сопряжение по QR-коду",
            "mobile-card-l2": "Независимое управление PRISM и Chameleon",
            "mobile-card-l3": "Личные фото, отправка файлов и доступ к камерам",
            "mobile-badge": "Приложение для Android",
            "mobile-title": "Защита EasyPi и личные сервисы на телефоне",
            "mobile-desc": "EasyPi Mobile связывает телефон с Android 11+ с домашним EasyPi через одноразовый QR-код. Ограниченный токен Mobile API и закреплённое HTTPS-соединение отделяют удалённое управление от VPN-трафика всего устройства.",
            "mobile-prism-title": "Защита PRISM",
            "mobile-prism-desc": "Локально применяет подтверждённые EasyPi политики доменов к DNS и TLS SNI-трафику.",
            "mobile-vpn-title": "Chameleon VPN",
            "mobile-vpn-desc": "Направляет весь трафик или выбранные приложения через Chameleon независимо от PRISM.",
            "mobile-cloud-title": "Фотографии и отправка файлов",
            "mobile-cloud-desc": "Синхронизирует выбранную папку фотографий и принимает Android Share для личной загрузки в EasyPi.",
            "mobile-camera-title": "Статистика и камеры",
            "mobile-camera-desc": "Показывает DNS-статистику защиты этого телефона и снимки камер, подключённых к EasyPi.",
            "mobile-security-note": "Токены и профиль Chameleon зашифрованы через Android Keystore. Приложение не использует Accessibility, не читает экран, запрещает незашифрованный трафик и сохраняет Mobile Link при переподключении VPN.",
            "mobile-platform": "Android 11+ · один VpnService · без незашифрованного трафика",
            "parental-badge": "Родительский контроль",
            "parental-title": "Обнаружение обхода и мгновенная реакция",
            "parental-desc": "EasyPi обнаруживает попытки обхода через шифрованный DNS, VPN/Proxy, пишет логи и при необходимости включает карантин устройства.",
            "modules-badge": "Карта модулей",
            "modules-title": "Модули продукта EasyPi",
            "modules-desc": "Структура сайта теперь повторяет реальный интерфейс и ключевые модули EasyPi.",
            "modules-group-core": "Основное управление",
            "modules-group-security": "Безопасность и семья",
            "modules-group-network": "Сеть и доступ",
            "modules-group-automation": "Автоматизация",
            "gallery-badge": "Скриншоты",
            "gallery-title": "Галерея по модулям",
            "gallery-desc": "Реальные экраны EasyPi, сгруппированные по разделам для быстрого понимания возможностей.",
            "gallery-group-dashboard": "Панель управления",
            "gallery-group-guard": "Guard Security и родительский контроль",
            "gallery-group-network": "Сетевой инструментарий и активность",
            "gallery-group-ai": "AI, резервные копии и поддержка",
            "gallery-group-vpn": "VPN, удаленный доступ и операции",
            "install-subtitle": "Официальная платформа: Raspberry Pi OS Lite 64-bit, Debian Trixie, ARM64. Перед установкой проверяется подпись издателя.",
            // Features
            "features-badge": "Возможности",
            "features-title-main": "Все, что нужно для управления вашим Pi",
            "features-desc": "Комплексный набор инструментов для мониторинга и защиты вашего Raspberry Pi",
            "f-dash-title": "Панель мониторинга",
            "f-dash-desc": "Мониторинг процессора, памяти и температуры с графиками в реальном времени.",
            "f-dash-l1": "Живые метрики системы",
            "f-dash-l2": "Мониторинг сетевого трафика",
            "f-dash-l3": "Обзор статуса сервисов",
            "f-serv-title": "Установка в один клик",
            "f-serv-desc": "Устанавливайте WireGuard, Tailscale, Ollama и более 15 других сервисов одним нажатием.",
            "f-serv-l1": "Наборы сервисов",
            "f-serv-l2": "Автоконфигурация",
            "f-serv-l3": "Простое управление",
            "f-vpn-title": "VPN и удаленный доступ",
            "f-vpn-desc": "Управление WireGuard через QR-коды и интеграция Tailscale.",
            "f-vpn-l1": "QR-коды для мобильных",
            "f-vpn-l2": "Tailscale Admin API",
            "f-vpn-l3": "PiCloud VPN",
            "f-back-title": "Резервное копирование",
            "f-back-desc": "Автоматические бэкапы по расписанию и восстановление в один клик.",
            "f-file-title": "Файловый менеджер",
            "f-file-desc": "Управление файлами, редактор кода и загрузка через веб-интерфейс.",
            "f-term-title": "Веб-терминал",
            "f-term-desc": "Полнофункциональный терминал прямо в браузере — SSH не нужен.",
            // Security
            "sec-badge": "Безопасность прежде всего",
            "sec-title": "Многоуровневая и понятная защита",
            "sec-desc": "Аутентификация, сетевые политики, аудит и явные границы доверия работают вместе.",
            "sec-2fa-title": "Двухфакторная аутентификация",
            "sec-2fa-desc": "TOTP для безопасного входа",
            "sec-pg-title": "Сканер PiGuard",
            "sec-pg-desc": "Автоматический поиск уязвимостей",
            "sec-fw-title": "Управление файрволом",
            "sec-fw-desc": "Простая настройка UFW / iptables",
            "sec-gw-title": "Режим шлюза",
            "sec-gw-desc": "Pi становится центром безопасности сети",
            // AI
            "ai-badge": "Локальный AI",
            "ai-title": "Ollama знает документацию EasyPi",
            "ai-desc": "Локальная модель получает ограниченный контекст из документации EasyPi без индексации секретов, журналов, баз данных и личных файлов.",
            "cap-diag": "Локальная обработка",
            "cap-setup": "Контекст документации EasyPi",
            "cap-chat": "Отдельный диагностический агент",
            // Network
            "net-badge": "Сетевые инструменты",
            "net-title": "Профессиональное управление сетью",
            "net-desc": "Полный набор инструментов для диагностики и мониторинга",
            "tool-ps": "Сканер портов",
            "tool-ps-desc": "Сканирование портов с детекцией сервисов",
            "tool-ld": "Поиск устройств",
            "tool-ld-desc": "Поиск устройств в локальной сети",
            "tool-st": "Speed Test",
            "tool-st-desc": "Проверка скорости интернета",
            "tool-nm": "Карта сети",
            "tool-nm-desc": "Визуализация топологии сети",
            "tool-tm": "Мониторинг трафика",
            "tool-tm-desc": "Мониторинг пропускной способности",
            "tool-rc": "RTSP Камеры",
            "tool-rc-desc": "Управление камерами видеонаблюдения",
            // Tech
            "tech-badge": "Технологии",
            "tech-title": "Современный стек",
            "tech-desc": "Передовые технологии для высокой производительности",
            // Installation
            "inst-title": "Быстрая установка"
        },
        de: {
            "hero-tagline": "Ihr Raspberry Pi. Ihr Netzwerk. Eine Steuerzentrale.",
            "hero-description": "Überwachen Sie den Pi, steuern Sie Netzwerkpfade, schützen Sie Geräte und behalten Sie Ihre Daten zu Hause. Sicherheit, Routing, Dateien, Kameras, Wiederherstellung und lokale KI in einer Oberfläche.",
            "hero-cta-primary": "Jetzt installieren",
            "hero-cta-secondary": "Funktionen",
            "stat-services-label": "Dienste",
            "stat-apps-label": "Apps blockierbar",
            "stat-license-label": "Sicher",
            "features-title": "Starke Funktionen",
            "features-description": "Alles, was Sie brauchen, um Ihren Raspberry Pi in einen professionellen Heimserver zu verwandeln.",
            "install-title": "Verifizierte Version installieren",
            "install-tab-binary": "Binary Release (Empfolen)",
            "install-tab-source": "Aus Quellcode",
            "setup-title": "🔑 Erstmalige Einrichtung",
            "setup-warning": "Keine Standard-Anmeldedaten. Beim ersten Start Admin-Konto erstellen und Recovery-Token sichern.",
            "footer-copyright": "© 2026 EasyPi. Unter einer proprietären Lizenz.",
            "footer-made-with": "Hergestellt mit ❤️ für die Raspberry Pi Community",
            "legal-title": "Rechtliches",
            "nav-features": "Funktionen",
            "nav-security": "Sicherheit",
            "nav-ai": "KI-Assistent",
            "nav-parental": "Jugendschutz",
            "nav-network": "Netzwerk",
            "nav-mobile": "Mobile",
            "nav-gallery": "Galerie",
            "nav-modules": "Module",
            "nav-install": "Installieren",
            "nav-docs": "Docs",
            "footer-product": "Produkt",
            "footer-resources": "Ressourcen",
            "footer-release-latest": "Neueste Version",
            "footer-release-all": "Alle Versionen",
            "footer-issues": "Issues",
            "footer-discussions": "Diskussionen",
            "all-features-badge": "Funktionen",
            "all-features-title": "Alle EasyPi-Funktionen",
            "all-features-desc": "Alle Hauptmodule sind unten mit echten Screenshots aus den entsprechenden EasyPi-Bereichen dargestellt.",
            "mobile-card-title": "EasyPi Mobile",
            "mobile-card-desc": "Android-Begleiter für privaten Schutz, Chameleon VPN, Fotos, Dateifreigabe und Heimkameras.",
            "mobile-card-l1": "Einmalige Kopplung per QR-Code",
            "mobile-card-l2": "Unabhängige PRISM- und Chameleon-Steuerung",
            "mobile-card-l3": "Private Fotos, Freigaben und Kamerazugriff",
            "mobile-badge": "Android-Begleiter",
            "mobile-title": "EasyPi-Schutz und private Dienste auf dem Smartphone",
            "mobile-desc": "EasyPi Mobile verbindet ein Android-11+-Smartphone über einen einmaligen QR-Code mit dem heimischen EasyPi. Ein eingeschränktes Mobile-API-Token und angeheftetes HTTPS trennen die Fernverwaltung vom vollständigen Geräte-VPN.",
            "mobile-prism-title": "PRISM-Schutz",
            "mobile-prism-desc": "Wendet authentifizierte EasyPi-Domainrichtlinien lokal auf DNS- und TLS-SNI-Verkehr an.",
            "mobile-vpn-title": "Chameleon VPN",
            "mobile-vpn-desc": "Leitet den gesamten Verkehr oder ausgewählte Apps unabhängig von PRISM durch Chameleon.",
            "mobile-cloud-title": "Fotos und Freigaben",
            "mobile-cloud-desc": "Synchronisiert einen gewählten Fotoordner und nimmt Android-Freigaben für private Uploads zu EasyPi an.",
            "mobile-camera-title": "Dashboard und Kameras",
            "mobile-camera-desc": "Zeigt DNS-Schutzstatistiken dieses Smartphones und Bilder der mit EasyPi verbundenen Kameras.",
            "mobile-security-note": "Tokens und das Chameleon-Profil werden mit Android Keystore verschlüsselt. Die App nutzt keinen Bedienungshilfedienst, liest keine Bildschirminhalte, verbietet Klartextverkehr und hält Mobile Link während VPN-Neuverbindungen verfügbar.",
            "mobile-platform": "Android 11+ · ein VpnService · kein Klartextverkehr",
            "parental-badge": "Jugendschutz",
            "parental-title": "Bypass-Erkennung + Sofortreaktion",
            "parental-desc": "EasyPi erkennt Umgehungsversuche via verschlüsseltem DNS, VPN/Proxy, protokolliert sie und kann bei Bedarf Gerätesperre aktivieren.",
            "modules-badge": "Modulübersicht",
            "modules-title": "EasyPi Produktmodule",
            "modules-desc": "Die Website spiegelt jetzt das echte EasyPi-Layout und die Kernmodule wider.",
            "modules-group-core": "Kernsteuerung",
            "modules-group-security": "Sicherheit & Familie",
            "modules-group-network": "Netzwerk & Zugriff",
            "modules-group-automation": "Automatisierung",
            "gallery-badge": "Screenshots",
            "gallery-title": "Strukturierte Modul-Galerie",
            "gallery-desc": "Echte EasyPi-Ansichten, nach Bereichen gruppiert für einen schnellen Überblick.",
            "gallery-group-dashboard": "Dashboard",
            "gallery-group-guard": "Guard Security & Jugendschutz",
            "gallery-group-network": "Netzwerk-Toolkit & Aktivität",
            "gallery-group-ai": "KI, Backup & Support",
            "gallery-group-vpn": "VPN, Zugriff & Betrieb",
            "install-subtitle": "Offizielles Ziel: Raspberry Pi OS Lite 64-Bit, Debian Trixie, ARM64. Die Herausgebersignatur wird vor der Installation geprüft.",
            // Features
            "features-badge": "Funktionen",
            "features-title-main": "Alles zur Verwaltung Ihres Pi",
            "features-desc": "Ein umfassendes Toolkit zur Überwachung und Sicherung Ihres Raspberry Pi",
            "f-dash-title": "Echtzeit-Dashboard",
            "f-dash-desc": "Überwachen Sie Metriken mit modernen Diagrammen und Live-Updates.",
            "f-dash-l1": "Live-Systemmetriken",
            "f-dash-l2": "Netzwerküberwachung",
            "f-dash-l3": "Statusübersicht",
            "f-serv-title": "Ein-Klick-Installation",
            "f-serv-desc": "Installieren Sie WireGuard, Tailscale, Ollama und 15+ weitere Dienste mit einem klick.",
            "f-serv-l1": "Dienstpakete",
            "f-serv-l2": "Autokonfiguration",
            "f-serv-l3": "Einfache Verwaltung",
            "f-vpn-title": "VPN & Fernzugriff",
            "f-vpn-desc": "WireGuard mit QR-Codes und Tailscale-Integration.",
            "f-vpn-l1": "QR-Codes für Mobilgeräte",
            "f-vpn-l2": "Tailscale Admin API",
            "f-vpn-l3": "PiCloud VPN",
            "f-back-title": "Backup & Wiederherstellung",
            "f-back-desc": "Geplante automatische Backups mit Ein-Klick-Wiederherstellung.",
            "f-file-title": "Dateimanager",
            "f-file-desc": "Dateien im Web durchsuchen, bearbeiten und hochladen.",
            "f-term-title": "Web-Terminal",
            "f-term-desc": "Vollständiges SSH-loses Web-Terminal mit Theme-Support.",
            // Security
            "sec-badge": "Sicherheit zuerst",
            "sec-title": "Mehrschichtige, sichtbare Sicherheit",
            "sec-desc": "Authentifizierung, Netzwerkrichtlinien, Audit und klare Vertrauensgrenzen arbeiten zusammen.",
            "sec-2fa-title": "2-Faktor-Authentisierung",
            "sec-2fa-desc": "TOTP für sicheren Zugang",
            "sec-pg-title": "PiGuard Scanner",
            "sec-pg-desc": "Automatische Schwachstellensuche",
            "sec-fw-title": "Firewall-Verwaltung",
            "sec-fw-desc": "Einfache UFW / iptables Konfiguration",
            "sec-gw-title": "Vollständiger Gateway-Modus",
            "sec-gw-desc": "Der Pi bleibt das Netzwerk-Gateway",
            // AI
            "ai-badge": "Lokale KI",
            "ai-title": "EasyPi-Wissen mit Ollama",
            "ai-desc": "Lokale Modelle erhalten begrenzten Kontext aus der EasyPi-Dokumentation, ohne Geheimnisse, Logs, Datenbanken oder persönliche Dateien zu indexieren.",
            "cap-diag": "Private lokale Verarbeitung",
            "cap-setup": "EasyPi-Dokumentationskontext",
            "cap-chat": "Separater Diagnose-Agent",
            // Network
            "net-badge": "Netzwerktools",
            "net-title": "Profi-Netzwerkverwaltung",
            "net-desc": "Komplettes Toolkit für Netzwerkdiagnose und -sicherheit",
            "tool-ps": "Port-Scanner",
            "tool-ps-desc": "Scannt Ports mit Diensterkennung",
            "tool-ld": "Gerätesuche",
            "tool-ld-desc": "Findet Geräte im lokalen Netzwerk",
            "tool-st": "Speed-Test",
            "tool-st-desc": "Überprüft die Verbindungsgeschwindigkeit",
            "tool-nm": "Netzwerkkarte",
            "tool-nm-desc": "Visualisiert die Netzwerktopologie",
            "tool-tm": "Traffic-Monitor",
            "tool-tm-desc": "Bandbreitenüberwachung",
            "tool-rc": "RTSP-Kameras",
            "tool-rc-desc": "Sicherheitskameras verwalten",
            // Tech
            "tech-badge": "Technologie",
            "tech-title": "Moderner Tech-Stack",
            "tech-desc": "Modernste Technologien für beste Performance",
            // Installation
            "inst-title": "Schnelle Installation"
        }
    },

    init() {
        this.langSwitcher = document.getElementById('langSwitcher');

        // Load saved language or default to English (to avoid mixed-language first render)
        const savedLang = localStorage.getItem('lang') || 'en';
        this.setLanguage(savedLang);

        // Event listener
        this.langSwitcher?.addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
        });
    },

    setLanguage(lang) {
        if (!this.translations[lang]) lang = 'en';

        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);

        if (this.langSwitcher) {
            this.langSwitcher.value = lang;
        }

        this.updateContent(lang);
    },

    updateContent(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.translations[lang][key]) {
                el.innerText = this.translations[lang][key];
            }
        });
    }
};

// ==================
// Navigation
// ==================
const Navigation = {
    init() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.getElementById('navLinks');

        // Scroll handler
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add scrolled class
            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Mobile menu
        this.mobileMenuBtn?.addEventListener('click', () => {
            this.mobileMenuBtn.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu
                    this.mobileMenuBtn?.classList.remove('active');
                    this.navLinks?.classList.remove('active');

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// ==================
// Cursor Glow Effect
// ==================
const CursorGlow = {
    init() {
        this.glow = document.getElementById('cursorGlow');
        if (!this.glow || window.matchMedia('(hover: none)').matches) return;

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animate = () => {
            // Smooth follow
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;

            this.glow.style.left = `${glowX}px`;
            this.glow.style.top = `${glowY}px`;

            requestAnimationFrame(animate);
        };

        animate();

        // Hide on mouse leave
        document.addEventListener('mouseleave', () => {
            this.glow.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.glow.style.opacity = '0.3';
        });
    }
};

// ==================
// Intersection Observer for Animations
// ==================
const ScrollAnimations = {
    init() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');

                    // Animate stagger containers
                    if (entry.target.classList.contains('stagger-container')) {
                        entry.target.classList.add('animate');
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });

        // Observe stagger containers
        document.querySelectorAll('.stagger-container').forEach(el => {
            observer.observe(el);
        });
    }
};

// ==================
// Counter Animation
// ==================
const CounterAnimation = {
    init() {
        const counters = document.querySelectorAll('[data-count]');

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };

        update();
    }
};

// ==================
// Services Filter
// ==================
const ServicesFilter = {
    init() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const serviceCards = document.querySelectorAll('.service-card');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                // Filter cards
                serviceCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (category === 'all' || cardCategory === category) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
};

// ==================
// Copy to Clipboard
// ==================
const CopyToClipboard = {
    init() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const text = btn.getAttribute('data-copy');

                try {
                    await navigator.clipboard.writeText(text);

                    // Visual feedback
                    btn.classList.add('copied');
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                    `;

                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.innerHTML = originalHTML;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }
};

// ==================
// Image Lightbox
// ==================
const ImageLightbox = {
    init() {
        const selectors = '.mini-screenshot, .main-screenshot, .full-width-screenshot, .gallery-item img';
        this.images = Array.from(document.querySelectorAll(selectors));
        if (!this.images.length) return;

        this.modal = document.createElement('div');
        this.modal.className = 'image-lightbox';
        this.modal.innerHTML = `
            <button class="image-lightbox-close" aria-label="Close image preview">×</button>
            <div class="image-lightbox-content">
                <img src="" alt="">
                <p class="image-lightbox-caption"></p>
            </div>
        `;
        document.body.appendChild(this.modal);

        this.modalImage = this.modal.querySelector('img');
        this.modalCaption = this.modal.querySelector('.image-lightbox-caption');
        this.closeBtn = this.modal.querySelector('.image-lightbox-close');

        this.images.forEach((img) => {
            img.classList.add('clickable-shot');
            img.addEventListener('click', () => this.open(img));
        });

        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    open(img) {
        this.modalImage.src = img.currentSrc || img.src;
        this.modalImage.alt = img.alt || 'EasyPi screenshot';
        this.modalCaption.textContent = img.alt || '';
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    close() {
        if (!this.modal?.classList.contains('active')) return;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// ==================
// Parallax Effects
// ==================
const ParallaxEffects = {
    init() {
        const shapes = document.querySelectorAll('.shape');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            shapes.forEach((shape, index) => {
                const speed = 0.05 + (index * 0.02);
                shape.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }
};

// ==================
// Scroll Progress
// ==================
const ScrollProgress = {
    init() {
        // Create progress bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress';
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }
};

// ==================
// Dashboard Preview Animation
// ==================
const DashboardPreview = {
    init() {
        const preview = document.querySelector('.dashboard-preview');
        if (!preview) return;

        // Animate bars periodically
        const bars = preview.querySelectorAll('.bar-fill');

        setInterval(() => {
            bars.forEach(bar => {
                const randomWidth = Math.floor(Math.random() * 40) + 20;
                bar.style.width = `${randomWidth}%`;
            });
        }, 3000);
    }
};

// ==================
// Chat Window Animation
// ==================
const ChatAnimation = {
    init() {
        const chatMessages = document.querySelector('.chat-messages');
        if (!chatMessages) return;

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
};

// ==================
// Installation Tabs
// ==================
const InstallTabs = {
    init() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const terminals = document.querySelectorAll('.terminal');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');

                // Update buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update terminals
                terminals.forEach(term => {
                    if (term.id === `${target}-terminal`) {
                        term.classList.add('active');
                    } else {
                        term.classList.remove('active');
                    }
                });
            });
        });
    }
};

// ==================
// Toggle Animation
// ==================
const ToggleAnimation = {
    init() {
        document.querySelectorAll('.toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
            });
        });
    }
};

// ==================
// Smooth Reveal on Load
// ==================
const PageReveal = {
    init() {
        document.body.classList.add('loaded');

        // Reveal hero elements with stagger
        const heroElements = document.querySelectorAll('.hero .animate-fade-in, .hero .animate-fade-in-up');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }
};

// ==================
// Keyboard Navigation
// ==================
const KeyboardNav = {
    init() {
        document.addEventListener('keydown', (e) => {
            // Press '/' to focus search (if exists)
            if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                const searchInput = document.querySelector('.chat-input input');
                if (searchInput && document.activeElement !== searchInput) {
                    e.preventDefault();
                    searchInput.focus();
                }
            }

            // Press 'Escape' to close mobile menu
            if (e.key === 'Escape') {
                document.getElementById('mobileMenuBtn')?.classList.remove('active');
                document.getElementById('navLinks')?.classList.remove('active');
            }

            // Press 'T' to toggle theme
            if (e.key === 't' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
                ThemeManager.toggle();
            }
        });
    }
};

// ==================
// Performance Optimizations
// ==================
const Performance = {
    init() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
            document.documentElement.classList.add('reduce-motion');
        }
    }
};

// ==================
// Service Worker Registration (for PWA)
// ==================
const ServiceWorkerManager = {
    async init() {
        if ('serviceWorker' in navigator) {
            try {
                // Service worker would be registered here for PWA functionality
                // await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker support detected');
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }
};

// ==================
// Active Nav Link Tracking
// ==================
const ActiveNav = {
    init() {
        this.navLinks = document.querySelectorAll('.nav-links .nav-link[href^="#"]');
        if (!this.navLinks.length) return;

        const sections = [];
        this.navLinks.forEach(link => {
            const id = link.getAttribute('href').slice(1);
            const section = document.getElementById(id);
            if (section) sections.push({ link, section });
        });

        if (!sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.navLinks.forEach(l => l.classList.remove('active'));
                    const active = sections.find(s => s.section === entry.target);
                    if (active) active.link.classList.add('active');
                }
            });
        }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

        sections.forEach(({ section }) => observer.observe(section));
    }
};

// ==================
// Back to Top Button
// ==================
const BackToTop = {
    init() {
        this.btn = document.getElementById('backToTop');
        if (!this.btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.btn.classList.add('visible');
            } else {
                this.btn.classList.remove('visible');
            }
        });

        this.btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// ==================
// FAQ Accordion
// ==================
const FaqAccordion = {
    init() {
        const questions = document.querySelectorAll('.faq-question');
        if (!questions.length) return;

        questions.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const isOpen = item.classList.contains('open');

                // Close all
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                // Open clicked if it was closed
                if (!isOpen) {
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
};

// ==================
// Initialize Everything
// ==================
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    ThemeManager.init();
    Navigation.init();
    CursorGlow.init();

    // Animations
    ScrollAnimations.init();
    CounterAnimation.init();
    ParallaxEffects.init();
    ScrollProgress.init();
    DashboardPreview.init();
    ChatAnimation.init();

    // Interactivity
    ServicesFilter.init();
    CopyToClipboard.init();
    ImageLightbox.init();
    ToggleAnimation.init();
    InstallTabs.init();
    I18nManager.init();
    KeyboardNav.init();

    // New UX features
    ActiveNav.init();
    BackToTop.init();
    FaqAccordion.init();

    // Performance
    Performance.init();

    // Page reveal
    PageReveal.init();

    // PWA
    ServiceWorkerManager.init();

    // Mobile menu: close when clicking outside
    document.addEventListener('click', (e) => {
        const navbar = document.getElementById('navbar');
        const navLinks = document.getElementById('navLinks');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (
            navLinks?.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !mobileMenuBtn?.contains(e.target)
        ) {
            navLinks.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
        }
    });
});

// ==================
// Utility Functions
// ==================
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, Navigation, Utils };
}
