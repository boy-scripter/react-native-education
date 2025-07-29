#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import subprocess
import time
import requests
import os
import questionary
from pathlib import Path
from rich import print
from urllib.parse import urlparse, urlunparse

# --- Function ---
def replace_api_url_domain(env_path: Path, new_base_url: str):
    """
    Replace the domain (scheme + netloc) part of API_URL in a .env file,
    preserving the original path/query if present.
    """
    if env_path.exists():
        lines = env_path.read_text().splitlines()
    else:
        lines = []

    parsed_new = urlparse(new_base_url)
    updated_lines = []
    api_url_found = False

    for line in lines:
        if line.strip().startswith("API_URL="):
            old_url = line.strip().split("=", 1)[1]
            parsed_old = urlparse(old_url)

            new_url = urlunparse((
                parsed_new.scheme,
                parsed_new.netloc,
                parsed_old.path,
                parsed_old.params,
                parsed_old.query,
                parsed_old.fragment,
            ))
            updated_lines.append(f"API_URL={new_url}")
            api_url_found = True
        else:
            updated_lines.append(line)

    if not api_url_found:
        updated_lines.append(f"API_URL={new_base_url}")

    env_path.write_text("\n".join(updated_lines) + "\n")
    print(f"✅ [green]API_URL domain updated in {env_path}[/green]")

# --- Config ---
SCRIPT_DIR = Path(__file__).resolve().parent
GENYMOTION_VM_NAME = "Google Pixel 5a"
BACKEND_COMPOSE_FILE = SCRIPT_DIR / "backend/docker-compose.yml"
ENV_PATH = SCRIPT_DIR / "mobile-app" / ".env"
APP_DIR = SCRIPT_DIR / "mobile-app"

print(SCRIPT_DIR / "backend/docker-compose.yml")
print("\n🚀 [bold cyan]Dev Setup Script[/bold cyan]\n")

mode = questionary.select(
    "Select mode:",
    choices=[
        "📦 Metro Only",
        "📱 Metro + Genymotion",
        "🚀 Metro + Genymotion + Install App"
    ]
).ask()

# --- Start Docker ---
print("\n📦 [blue]Starting Docker backend...[/blue]")
subprocess.run(["docker-compose", "-f", BACKEND_COMPOSE_FILE, "up", "-d"], check=True)

# --- Start ngrok ---
print("\n🌐 [blue]Starting ngrok...[/blue]")
ngrok_proc = subprocess.Popen(["ngrok", "http", "8000"], stdout=subprocess.DEVNULL)
time.sleep(3)

# --- Fetch ngrok URL ---
try:
    res = requests.get("http://localhost:4040/api/tunnels")
    ngrok_url = res.json()["tunnels"][0]["public_url"]
    print(f"✅ [green]Ngrok URL: {ngrok_url}[/green]")
except Exception as e:
    print("[red]❌ Failed to fetch ngrok URL. Is ngrok running?[/red]")
    ngrok_proc.terminate()
    exit(1)

# --- Write .env file ---
replace_api_url_domain(ENV_PATH, ngrok_url)
print(f"📝 [green]Wrote API_URL to {ENV_PATH}[/green]")

# --- Start Metro ---
print("\n⚛️  [yellow]Starting Metro Bundler...[/yellow]")
subprocess.Popen("npm run start -- --reset-cache", cwd=APP_DIR, shell=True)

# --- Start Genymotion ---
# --- Start Genymotion ---
if "Genymotion" in mode:
    print("\n📱 [magenta]Starting Genymotion VM...[/magenta]")

    try:
        subprocess.run(
            f'gmtool admin start "{GENYMOTION_VM_NAME}"',
            shell=True,
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )
        print("[green]✅ Genymotion VM started successfully.[/green]")

    except subprocess.CalledProcessError as e:
        error_message = e.stderr.decode("utf-8").strip()

        if "is already running" in error_message.lower():
            print("[yellow]⚠️ Genymotion VM is already running.[/yellow]")
        else:
            print(f"[red]❌ Failed to start Genymotion VM:[/red] {error_message}")


# --- Run App ---
if "Install App" in mode:
    print("\n📲 [green]Installing app on emulator...[/green]")
    time.sleep(7)
    subprocess.run("npm run android", cwd=APP_DIR, shell=True)

print("\n✅ [bold green]All Done![/bold green]")
