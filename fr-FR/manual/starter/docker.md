---
prev:
  text: Choisir une méthode d'installation
  link: /fr-FR/manual/starter/
next:
  text: Installation et configuration de plugins
  link: /fr-FR/manual/usage/market.html
---

# Utilisation dans un conteneur

::: warning
Les logiciels de conteneurisation tels que Docker sont des plates-formes applicatives conçues pour les environnements de production. Lorsque vous utilisez de tels logiciels pour le déploiement, nous supposons que vous avez déjà acquis les connaissances nécessaires à l'administration d'un serveur, et que vous comprenez également les concepts de la conteneurisation et les opérations de base associées aux logiciels connexes. Sinon, à moins que vous ne travailliez dans des environnements spéciaux tels que des routeurs ou des serveurs NAS, veuillez [choisir une autre méthode d'installation](./index.md).
:::

Koishi propose une image Docker, ce qui facilite l'exécution de Koishi dans un conteneur. Vous devrez d'abord installer [Podman](https://podman.io) ou [Docker](https://www.docker.com) pour exécuter des conteneurs.

## Démarrer le conteneur

Utilisez la commande suivante pour démarrer le conteneur :

::: tabs code
```podman
podman run -p 5140:5140 koishijs/koishi
```
```docker
docker run -p 5140:5140 koishijs/koishi
```
:::

De nombreux plugins dépendent de [koishi-plugin-puppeteer](https://www.npmjs.com/package/koishi-plugin-puppeteer) pour le rendu des images. Par conséquent, l'image conteneur par défaut contient Chromium. Si vous estimez que l'image est trop volumineuse et que vous n'avez pas besoin de Chromium préinstallé, nous proposons également une version légère :

::: tabs code
```podman
podman run -p 5140:5140 koishijs/koishi:latest-lite
```
```docker
docker run -p 5140:5140 koishijs/koishi:latest-lite
```
:::

Une fois démarré, la Console Koishi sera liée au port 5140.

Si vous avez besoin de persistance, utilisez `-v /some/place:/koishi` pour mapper les fichiers de Koishi.

Pour ajuster le fuseau horaire, utilisez `-e TZ=Europe/Paris` pour définir le fuseau horaire.

::: tip
Koishi lui-même et ses plugins peuvent être mis à jour via la console. Après la persistance des fichiers, la mise à jour du conteneur ne mettra à jour que certaines versions de logiciels tels que Chromium et Node.js, par exemples.
:::

## Installer les plugins

Lorsque le conteneur fonctionne normalement, vous pouvez installer et activer des plugins dans la console à `http://<adresse_hôte>:5140` dans votre navigateur. Si vous ne parvenez pas à y accéder, veuillez vérifier la configuration de votre pare-feu.
