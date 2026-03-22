[![Build and Release](https://github.com/pwnyprod/Apex-Legends-Config/actions/workflows/release.yml/badge.svg)](https://github.com/pwnyprod/Apex-Legends-Config/actions/workflows/release.yml)
[![Publish README to GitHub Pages](https://github.com/pwnyprod/Apex-Legends-Config/actions/workflows/publish-readme.yml/badge.svg)](https://github.com/pwnyprod/Apex-Legends-Config/actions/workflows/publish-readme.yml)

# Apex Legends Konfigurationshilfe (Deutsch)
> [Englische Readme Version hier](./README)
>
> [Veröffentlichung log](./CHANGELOG)

Diese Anleitung zeigt dir, wie du speziell abgestimmte Konfigurationsdateien für Apex Legends nutzen kannst, um dein Spielerlebnis zu verbessern. Die bereitgestellten Pakete enthalten sowohl Videoeinstellungen als auch grundlegende Spieleinstellungen, die auf unterschiedliche Bedürfnisse abgestimmt sind.

## Worum geht es?

- **autoexec.cfg:**  
  Diese Datei wird beim Spielstart automatisch geladen. Hier kannst du maximale Bildwiederholraten (FPS), Grafikeinstellungen und Audio-Anpassungen festlegen. Die verschiedenen Varianten bieten unterschiedliche Schwerpunkte:
  - **competitive:** Auf maximale Leistung und Stabilität ausgerichtet, mit sehr hohen FPS, aber weniger grafischen Details.
  - **quality:** Ein ausgewogener Mittelweg zwischen Bildqualität und solider Leistung.
  - **ultraquality:** Maximale visuelle Qualität für leistungsstarke PCs, mit hochauflösenden Texturen und Effekten.

- **videoconfig.txt:**  
  Diese Datei steuert die Auflösung und einige weitere Videoeinstellungen. Verschiedene Auflösungsvarianten sind verfügbar:
  - **720p:** Niedrigere Auflösung, aber ressourcenschonend, ideal wenn Leistung vor Optik kommt.
  - **1080p:** Standardqualität und -auflösung, ein guter Kompromiss für die meisten Spieler.
  - **1440p:** Höhere Detailstufe als 1080p, benötigt jedoch mehr Systemleistung.
  - **4k:** Sehr hohe Auflösung mit gestochen scharfen Details, empfohlen für sehr starke Hardware.

## Installation der Konfigurationen

1. **Paket auswählen:**  
   Lade eines der vorbereiteten Pakete aus den [Releases](https://github.com/pwnyprod/Apex-Legends-Config/releases) herunter. Diese Pakete enthalten jeweils eine Kombination aus `autoexec.cfg`- und `videoconfig.txt`-Variante.

2. **autoexec.cfg installieren:**  
   - Entpacke das heruntergeladene Paket.
   - Verschiebe die `autoexec.cfg` in den `cfg`-Ordner deiner Apex-Installation.  
     Bei einer Steam-Installation findest du diesen meistens hier:  
     `C:\Program Files (x86)\Steam\steamapps\common\Apex Legends\cfg`
   
3. **videoconfig.txt installieren:**  
   - Drücke `Win + R` auf deiner Tastatur.
   - Füge folgenden Pfad in das Ausführen-Fenster ein und bestätige:  
     `%USERPROFILE%\Saved Games\Respawn\Apex\local`
   - Kopiere die `videoconfig.txt` in dieses Verzeichnis und überschreibe ggf. die vorhandene Datei.

### Schnelle Windows-Installation mit PowerShell

Für Windows-Anwender steht ein Skript zur Verfügung, das beide Dateien automatisch kopiert und anschließend schreibschützt:

1. Entpacke das heruntergeladene Release-ZIP – `install-windows-config.ps1` liegt dort bereits zusammen mit den `autoexec*.cfg`- und `videoconfig*.txt`-Varianten.
2. Öffne den entpackten Ordner, klicke mit der rechten Maustaste auf `install-windows-config.ps1` und wähle **„Mit PowerShell ausführen“**. Alternativ kannst du über `Shift + Rechtsklick` → „PowerShell-Fenster hier öffnen“ starten und den Befehl `.\install-windows-config.ps1` ausführen.
3. Folge den Abfragen. Das Skript erkennt die Konfigurationsdateien automatisch, kopiert sie an die in der Anleitung genannten Pfade und setzt beide Dateien auf „Schreibgeschützt“, damit sie nicht vom Spiel überschrieben werden.

Wenn du später Änderungen an den Dateien vornehmen möchtest, entferne den Schreibschutz kurzzeitig (z. B. mit `attrib -r <Dateiname>`) und führe das Skript anschließend erneut aus.

4. **Startoptionen im Spiel:**  
   - Öffne deine Apex Legends Bibliothek in Steam.
   - Klicke mit Rechtsklick auf das Spiel und wähle "Eigenschaften".
   - Gehe auf den Reiter "Allgemein".
   - Füge unter "Startoptionen" folgende Befehle ein:  
     `+exec autoexec.cfg -high -dev`  
     Dadurch wird dein gewähltes Paket beim Spielstart automatisch geladen und das Spiel versucht mit höherer Priorität zu laufen.

#### **erweiterte Startoptionen:**

| Command | Description |
| --- | --- |
| `+exec` | Führt eine CFG-Datei beim Spielstart aus. |
| `-dev` | Überspringt das EA-Intro beim Spielstart; kann auf NVIDIA-Karten HUD-Flackern verursachen. |
| `-fullscreen` | Erzwingt, dass das Spiel im Vollbildmodus startet. |
| `-high` | Versucht, die Priorität des Spiels unter Windows auf „hoch“ zu setzen. |
| `-anticheat_settings=SettingsDX11.json` | Erzwingt den Start des Spiels im DX11-Modus. |
| `-anticheat_settings=SettingsDX12.json` | Erzwingt den Start des Spiels im DX12-Modus. |

## Zusätzliche Hinweise

- Du kannst jederzeit zwischen den verschiedenen Paketen wechseln, indem du einfach die gewünschte `autoexec.cfg` und `videoconfig.txt` aus den Release-Paketen auswählst und wie oben beschrieben einfügst.
- Möchtest du Änderungen an der `autoexec.cfg` im laufenden Spiel anwenden, öffne die Konsole (falls über Startoptionen aktiviert) und gib `exec autoexec.cfg` ein.
- Wenn du trotz angepasster Configs Probleme mit der Performance oder Bildqualität hast, probiere erst eine einfachere Variante (z. B. `competitive` mit `720p`) aus. Wenn dein PC stärker ist, kannst du nach und nach höhere Qualität einstellen.

## Bekannte Tastenkürzel in der autoexec

- **F3:** `disconnect` – Trennt dich bei starken Verzögerungen schnell vom Server.
- **F4:** `miles_reboot; miles_stop_all` – Startet bei Tonproblemen die Audio-Engine neu.
- **F5:** `toggle showfps_enabled 0 1 2` – Schaltet die FPS-Anzeige und weitere Performance-Diagramme um.
- **F6:** `toggle shownet_enabled` – Zeigt Netzwerkdiagramme zur Überwachung deiner Verbindung.
- **F7:** `exec autoexec.cfg` – Lädt die aktuelle autoexec erneut, um Änderungen sofort anzuwenden.

## Allgemeine Tipps

- Experimentiere mit verschiedenen Kombinationen, um die für dich perfekte Balance aus Bildqualität und Leistung zu finden.
- Hast du einen älteren oder schwächeren PC, starte mit leistungsschonenden Varianten.
- Für hochauflösende Monitore oder starke Hardware wähle die hochwertigeren Varianten, um dein Spielerlebnis zu steigern.
