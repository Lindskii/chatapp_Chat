#!/bin/bash

# Git-Script zum einfachen Speichern von Änderungen auf GitHub

# Farben für die Ausgabe definieren
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}NEXON GitHub Sync Tool${NC}"
echo "============================="

# Status prüfen
echo -e "\n${GREEN}Aktueller Git-Status:${NC}"
git status

# Änderungen hinzufügen
echo -e "\n${GREEN}Änderungen werden zum Commit hinzugefügt...${NC}"
git add .

# Commit-Nachricht abfragen
echo -e "\n${GREEN}Bitte geben Sie eine Commit-Nachricht ein:${NC}"
read commitMessage

# Commit erstellen
echo -e "\n${GREEN}Commit wird erstellt...${NC}"
git commit -m "$commitMessage"

# Push auf GitHub
echo -e "\n${GREEN}Änderungen werden auf GitHub hochgeladen...${NC}"
git push origin main

echo -e "\n${YELLOW}Fertig! Ihre Änderungen wurden auf GitHub gespeichert.${NC}"