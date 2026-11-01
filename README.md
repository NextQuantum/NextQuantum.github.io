# EasyPi product website

This directory contains the static product website for **EasyPi v1.1.0**. It presents the current Raspberry Pi management platform, its deployment modes, and the security and networking systems included in the product.

## Product scope

EasyPi combines a browser control plane with services running on a Raspberry Pi. The current website covers:

- dashboard, monitoring, terminal, files, jobs, notifications, backup, rollback, and signed updates;
- WireGuard VPN, Tailscale Remote Access, Personal DNS, Internet Encryption, and Full Gateway mode;
- Guard Security with device history, parental controls, schedules, ad and tracker blocking, Shadow Mode, and the Heuristic Engine;
- PRISM analysis: FlowGraph, TLS Lineage Gate, and the Counterfactual Flow Lab;
- Chameleon Stealth transport with real nginx HTTPS cover, a coherent browser profile, inner authenticated encryption, anti-replay controls, and fail-closed routing;
- EasyPi Mobile for Android 11+ with one-time QR pairing, pinned HTTPS Mobile Link, local PRISM policy enforcement, Chameleon VPN, private photo/file transfer, DNS protection statistics, and camera snapshots;
- local Ollama models with bounded EasyPi documentation context and a separate diagnostics workflow;
- PiCloud, Telegram and Taildrop imports, camera live view, snapshots, recordings, and PTZ controls;
- Marketplace preview and service management.

The Mobile section is based on the current `EasyPi-Mobile` application source. It also states the relevant trust boundary: restricted credentials and the Chameleon profile are protected by Android Keystore, cleartext traffic is disabled, and the application does not use Accessibility access or inspect screen contents.

## Architecture

The control path is:

```text
Browser / PWA
    → nginx TLS and reverse proxy
    → FastAPI backend
    → allowlisted privileged runner
```

The data plane includes Unbound DNS, nftables/iptables, WireGuard, Tailscale, PRISM, Chameleon, go2rtc, and FFmpeg. EasyPi supports four practical deployment modes: management only, DNS enforcement, full gateway, and remote/VPS operation.

The main product README at `C:\Users\SB\Desktop\EasyPi\README.md` is the source of truth for implementation details, operational limits, and security claims.

## Local preview

From this directory run:

```powershell
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Structure

```text
Site/
├── index.html
├── css/
│   ├── styles.css
│   └── animations.css
├── js/
│   ├── main.js
│   └── animations.js
└── assets/
    └── screenshots/
```

The website uses plain HTML, CSS, and JavaScript and does not require a build step.
