- - -
prev: text: Choisir une méthode d'installation link: /fr-FR/manual/starter/
- - -

# Installation et configuration de plugins

::: tip
Cette section explique comment utiliser les pages "Marketplace des plugins", "Configuration des plugins" et "Gestion des dépendances".
:::

L'une des fonctionnalités clés de Koishi est sa puissante console.La console est une interface utilisateur conviviale qui encapsule la plupart des fonctionnalités de Koishi :

- Installation, désinstallation et mise à jour des plugins
- 启用、停用和配置插件
- Gestion des commandes, de la base de données, des sorties de texte
- 在模拟和真实环境下聊天
- Surveillance de l'état, statistiques des données
- Voir le journal

Dans cette section, nous utiliserons l'exemple du plugin [echo](../../plugins/common/echo.md) pour vous montrer comment installer et configurer des plugins.Le plugin echo enregistre une commande nommée `echo`, qui renvoie le texte d'entrée tel quel à l'utilisateur.

## Découverte de la console

Une fois que vous avez réussi à installer le projet modèle ou le starter pack, la console s'ouvrira automatiquement.

L'interface de la console est principalement divisée en deux parties : à gauche se trouve la barre d'activités permettant de basculer entre les différentes pages à droite.Sur les écrans larges, il y a également une barre d'état en bas, qui affiche principalement l'état d'exécution du robot.

![home](/manual/console/home.light.webp) {.light-only}

![home](/manual/console/home.dark.webp) {.dark-only}

Au cours des prochaines sections, nous expliquerons en détail les fonctionnalités et l'utilisation de chaque page.

## Installation de plugins

::: warning
Koishi ne garantit pas la sécurité des plugins non officiels. N'installez pas de plugins provenant de sources inconnues, car ils peuvent rendre Koishi instable, voire entraîner des conséquences plus graves. Si vous rencontrez des problèmes après avoir installé un plugin, veuillez signaler le problème dans le groupe d'utilisateurs ou le forum. De plus, certains plugins portent l'étiquette "Non sécurisé" et ne bénéficient pas du support de la communauté officielle.
:::

Accédez à la page "Marketplace des plugins". Vous y trouverez tous les plugins disponibles. Dans la barre de recherche, saisissez `echo`, trouvez le plugin que vous souhaitez, cliquez sur le bouton "Ajouter", puis cliquez sur "Installer" dans la fenêtre contextuelle. Attendez un moment, le plugin est maintenant installé avec succès.

![select-version](/manual/console/select-version.light.webp) {.light-only}

![select-version](/manual/console/select-version.dark.webp) {.dark-only}

## Activation et désactivation des plugins

Koishi n'active pas automatiquement les plugins que vous venez d'installer. Vous devez les configurer et les activer manuellement. Allez sur la page "Configuration des plugins". Dans la barre latérale de gauche, vous verrez la liste de tous les plugins configurés. Ceux qui fonctionnent actuellement sont en police <span class="light-only">noire</span> et <span class="dark-only">blanche</span>, tandis que ceux qui ne fonctionnent pas sont en gris.

![plugins](/manual/console/plugins.light.webp) {.light-only}

![plugins](/manual/console/plugins.dark.webp) {.dark-only}

À ce stade, vous verrez que le nom du plugin echo est en gris, ce qui signifie qu'il n'est pas encore en cours d'exécution. Le plugin echo n'a pas d'options de configuration, donc la page de détails à droite est vide. Vous pouvez cliquer sur le bouton "Activer le plugin" en haut à droite, puis attendre le message "Activation réussie" pour confirmer que le plugin echo est maintenant actif.

La désactivation d'un plugin est tout aussi simple.La désactivation d'un plugin ne supprime ni son code ni sa configuration, vous pouvez donc le réactiver à tout moment. Cliquez sur le bouton "Désactiver le plugin" en haut à droite, et le plugin sera désactivé.

## Configuration des plugins

::: warning
Lors de la configuration des plugins, gardez à l'esprit ce principe : **ne modifiez pas la configuration à moins que cela ne soit nécessaire**. Koishi a été conçu pour allier extensibilité et praticité, et de nombreuses fonctionnalités de base sont fournies sous la forme de plugins pré-installés. Les pages "Marketplace des plugins" et "Configuration des plugins" sont elles-mêmes fournies par les plugins market et config pré-installés. Étant donné que tous les plugins pré-installés sont préconfigurés, vous n'avez généralement pas besoin de modifier leur configuration. La modification arbitraire de la configuration des plugins ou la suppression de plugins pré-installés peut entraîner des dysfonctionnements de Koishi.
:::

Bien que le plugin echo n'ait pas besoin de configuration, les plugins plus complexes offrent souvent de nombreuses options de configuration pour permettre aux utilisateurs de contrôler leur comportement. L'image suivante montre la page de configuration du plugin novelai.

![settings](/manual/console/settings.light.webp) {.light-only}

![settings](/manual/console/settings.dark.webp) {.dark-only}

Sur cette page, vous verrez de nombreuses options de configuration. Notez ce qui suit :

- 必选但尚未填入的配置项会在左侧呈现 <span style="font-weight: bold; color: var(--vp-c-red-1)">红色</span> 的提示条，只有正确填写配置才能启动插件。
- 已修改但未保存的配置项会在左侧呈现 <span style="font-weight: bold; color: var(--vp-c-indigo-1)">紫色</span> 的提示条，点击「启用插件」或「保存配置」按钮后会保存配置；如果你想撤销这些改动，可以在配置名称旁的小三角处呼出菜单，选择「撤销更改」使该配置恢复到上次保存时的状态。

## Gestion des plugins

### Gestion des groupes

Koishi propose un mécanisme de groupes de plugins pour faciliter la gestion simultanée de plusieurs plugins.

Lors de l'installation de Koishi, certains groupes sont préconfigurés, et les nouveaux plugins installés sont placés en bas de la liste des plugins, ce qui signifie qu'ils ne sont associés à aucun groupe. Les groupes et les plugins peuvent être réorganisés en les sélectionnant et en les faisant glisser, que ce soit pour changer leur ordre ou les déplacer entre les groupes. Vous pouvez également remarquer que les groupes peuvent être imbriqués.

La création d'un nouveau groupe est également simple. Cliquez sur "Configuration globale" ou sur le nom d'un groupe, puis cliquez sur le bouton "Créer un groupe" en haut à droite. Le nom du nouveau groupe est généré de manière aléatoire, mais vous pouvez cliquer sur le nom pour le modifier comme vous le souhaitez. Les groupes peuvent être développés ou réduits en cliquant sur la petite flèche à côté du nom du groupe.

De plus, le mécanisme [de filtre](../usage/customize.md#filtres) peut également être utilisé avec les groupes pour contrôler le comportement de plusieurs plugins à la fois.

### Ajout de plus de plugins

::: tip
En général, un seul plugin peut être exécuté à la fois avec une configuration donnée. Consultez la section [Gérer plusieurs configurations](../recipe/multiple.md) pour plus d'informations.
:::

Si un plugin déjà installé n'apparaît pas dans la liste des plugins, vous pouvez l'ajouter manuellement. Sur la page "Configuration globale" ou de n'importe quel groupe, cliquez sur le bouton "Ajouter un plugin", puis une fenêtre contextuelle apparaîtra. Dans cette fenêtre contextuelle, cliquez sur le plugin que vous souhaitez ajouter pour créer une nouvelle configuration de plugin non activée.

![select-plugin](/manual/console/select-plugin.light.webp) {.light-only}

![select-plugin](/manual/console/select-plugin.dark.webp) {.dark-only}

### Suppression de plugins ou de groupes

::: warning
Attention : cette opération ne peut pas être annulée. Si vous souhaitez restaurer la configuration précédente, vous devrez ajouter manuellement les plugins. Faites preuve de prudence.
:::

Sur n'importe quelle page de configuration de plugin, cliquez sur le bouton "Supprimer le plugin" en haut à droite pour supprimer la configuration du plugin. De même, dans la page de configuration du groupe, cliquez sur le bouton "Supprimer le groupe" en haut à droite pour supprimer ce groupe. Lorsque vous supprimez un groupe, tous les plugins qui s'y trouvent sont également supprimés.

## Mise à jour et désinstallation des plugins

Accédez à la page "Gestion des dépendances", où vous pouvez voir la liste des dépendances. Les dépendances peuvent inclure le cœur de Koishi, divers plugins, ainsi que des packages logiciels nécessaires au fonctionnement des plugins.

Lorsque l'état de la dépendance indique "Mise à jour possible", cliquez sur le bouton "Modifier" à côté, sélectionnez la version que vous souhaitez dans la fenêtre contextuelle, puis cliquez sur "Mettre à jour" en bas à droite pour effectuer la mise à jour.

Vous pouvez également mettre à jour plusieurs plugins en une seule fois. Utilisez le menu déroulant à droite du nom de la dépendance pour sélectionner les versions que vous souhaitez modifier, puis cliquez sur le bouton "Appliquer les modifications" en haut à droite. De plus, le bouton "Tout mettre à jour" en haut à droite permet de mettre à jour toutes les dépendances en une seule opération.

![dependencies](/manual/console/dependencies.light.webp) {.light-only}

![dependencies](/manual/console/dependencies.dark.webp) {.dark-only}
