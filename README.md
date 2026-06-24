# IFCAR Solutions — Proposition 5

Cinquième proposition de design pour le site vitrine d'IFCAR Solutions.
Site statique (HTML/CSS/JS, sans dépendance ni build) respectant le cahier des charges.

## Direction artistique — « Bold Minimal / Suisse »
Un parti pris clair, lumineux et graphique, distinct des 4 propositions précédentes :

- **Palette** : fond clair (`#fbfbf8`) + **charte IFCAR** — bleu `#0081bf` (accent principal)
  et vert `#95ce0a` (accent secondaire) + encre near-black.
- **Typographie** : *Space Grotesk* (grotesque géométrique) pour les titres + *Inter* pour le texte.
- **Style** : grandes typographies, filets fins, angles nets, ombres « dures » décalées,
  beaucoup d'espace blanc.
- **Rubrique 1** présentée en **liste-index numérotée** (01 → 04) au lieu de cartes — mise en page signature.
- Header sticky, animations d'apparition au scroll, 100 % responsive.

## Pages (conformes au cahier des charges)
- `index.html` — Accueil : Rubrique 1 (partenaire conseil), Rubrique 2 (références par secteur),
  Rubrique 3 (contact : formulaire **ou** coordonnées).
- `recrutement.html` · `formation.html` · `conseil.html` · `accompagnement.html` — prestations.
- `a-propos.html` — histoire, mission/vision, valeurs, équipe.
- `contact.html` — formulaire + coordonnées + plan d'accès.

Navigation : chaque page s'ouvre dans un **nouvel onglet sauf l'Accueil** (même onglet).

## À compléter avant mise en production
Coordonnées réelles (téléphone, fax, ICE, adresse), liens réseaux sociaux,
vrais logos clients (`assets/img/clients/`), fiche PDF à télécharger, et
branchement du formulaire à un backend / Formspree (démo côté client pour l'instant).
