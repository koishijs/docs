# Outils de ligne de commande

Pour les utilisateurs qui ne souhaitent pas utiliser une interface graphique, le lanceur Koishi propose un outil en ligne de commande, `koi`, qui permet de créer, gérer et exécuter Koishi.

Si le nom de fichier que vous avez téléchargé est comme `koi-xxx.appimage`, il suffit de remplacer `koi` par le nom de ce fichier dans les commandes ci-dessous.

| Commande              | Fonction                                        |
| --------------------- | ----------------------------------------------- |
| `koi run daemon`      | Démarrer sans mode démon                        |
| `koi daemon start`    | Démarrer le mode démon                          |
| `koi daemon stop`     | Arrêter le mode démon                           |
| `koi daemon kill`     | Forcer l'arrêt du mode démon                    |
| `koi ps`              | Vérifier l'état d'exécution                     |
| `koi start default`   | Démarrer l'instance `default`                   |
| `koi stop default`    | Arrêter l'instance `default`                    |
| `koi restart default` | Redémarrer l'instance `default`                 |
| `koi yarn -n default` | Réparer les dépendances de l'instance `default` |
