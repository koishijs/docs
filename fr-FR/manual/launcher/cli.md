# Outils de ligne de commande

Pour les utilisateurs qui préfèrent ne pas utiliser l'interface graphique, le lanceur Koishi propose un outil en ligne de commande nommé `koi`. Il vous permet de créer, gérer et exécuter Koishi.

Si vous avez téléchargé un fichier similaire à `koi-xxx.appimage`, vous pouvez simplement le renommer en `koi` comme indiqué ci-dessous.

| Commande              | Fonction                                        |
| --------------------- | ----------------------------------------------- |
| `koi run daemon`      | Démarrer sans démon                             |
| `koi daemon start`    | Démarrer le démon                               |
| `koi daemon stop`     | Arrêter le démon                                |
| `koi daemon kill`     | Forcer l'arrêt du démon                         |
| `koi ps`              | Vérifier l'état d'exécution                     |
| `koi start default`   | Démarrer l'instance `default`                   |
| `koi stop default`    | Arrêter l'instance `default`                    |
| `koi restart default` | Redémarrer l'instance `default`                 |
| `koi yarn -n default` | Réparer les dépendances de l'instance `default` |
