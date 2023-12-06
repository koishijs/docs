---
prev:
  text: Choisir une méthode d'installation
  link: /fr-FR/manual/starter/
---

# Installation et configuration des plugins

:::tip
本节将介绍「插件市场」「插件配置」和「依赖管理」页面的使用方法。
:::

L'une des fonctionnalités clés de Koishi est sa puissante console.La console est une interface utilisateur conviviale qui encapsule la plupart des fonctionnalités de Koishi :

- Installation, désinstallation et mise à jour des plugins
- 启用、停用和配置插件
- Gestion des commandes, de la base de données, des sorties de texte
- 在模拟和真实环境下聊天
- Surveillance de l'état, statistiques des données
- Voir le journal

本节中我们将以 [echo](../../plugins/common/echo.md) 插件为例来演示插件的安装与配置。echo 插件注册了一个名为 `echo` 的指令，调用此指令可以将输入原样输出给用户。

## Découverte de la console

Une fois que vous avez réussi à installer le projet modèle ou le starter pack, la console s'ouvrira automatiquement.

L'interface de la console est principalement divisée en deux parties : à gauche se trouve la barre d'activités permettant de basculer entre les différentes pages à droite.Sur les écrans larges, il y a également une barre d'état en bas, qui affiche principalement l'état d'exécution du robot.

![home](/manual/console/home.light.webp) {.light-only}

![home](/manual/console/home.dark.webp) {.dark-only}

Au cours des prochaines sections, nous expliquerons en détail les fonctionnalités et l'utilisation de chaque page.

## Installer les plugins

:::warning
Koishi 不对非官方插件的安全性做任何保证。N'installez pas de plugins provenant de sources inconnues, car ils peuvent rendre Koishi instable, voire entraîner des conséquences plus graves. Si vous rencontrez des problèmes après avoir installé un plugin, veuillez signaler le problème dans le groupe d'utilisateurs ou le forum. De plus, certains plugins portent l'étiquette "Non sécurisé" et ne bénéficient pas du support de la communauté officielle.
:::

Accédez à la page "Marketplace des plugins". Vous y trouverez tous les plugins disponibles. 在搜索框中输入 `echo`，找到我们想要的插件，点击「添加」按钮，然后在弹出的对话框中点击「安装」。Attendez un moment, le plugin est maintenant installé avec succès.

![select-version](/manual/console/select-version.light.webp) {.light-only}

![select-version](/manual/console/select-version.dark.webp) {.dark-only}

## Activation et désactivation des plugins

Koishi n'active pas automatiquement les plugins que vous venez d'installer. Vous devez les configurer et les activer manuellement. Allez sur la page "Configuration des plugins". Dans la barre latérale de gauche, vous verrez la liste de tous les plugins configurés. Ceux qui fonctionnent actuellement sont en police <span class="light-only">noire</span> et <span class="dark-only">blanche</span>, tandis que ceux qui ne fonctionnent pas sont en gris.

![plugins](/manual/console/plugins.light.webp) {.light-only}

![plugins](/manual/console/plugins.dark.webp) {.dark-only}

À ce stade, vous verrez que le nom du plugin echo est en gris, ce qui signifie qu'il n'est pas encore en cours d'exécution. Le plugin echo n'a pas d'options de configuration, donc la page de détails à droite est vide. Vous pouvez cliquer sur le bouton "Activer le plugin" en haut à droite, puis attendre le message "Activation réussie" pour confirmer que le plugin echo est maintenant actif.

La désactivation d'un plugin est tout aussi simple.La désactivation d'un plugin ne supprime ni son code ni sa configuration, vous pouvez donc le réactiver à tout moment. Cliquez sur le bouton "Désactiver le plugin" en haut à droite, et le plugin sera désactivé.

## Configuration des plugins

:::warning
在配置插件的过程中，请大家记住这个原则：**如无必要，勿动配置**。Koishi a été conçu pour allier extensibilité et praticité, et de nombreuses fonctionnalités de base sont fournies sous la forme de plugins pré-installés. Les pages "Marketplace des plugins" et "Configuration des plugins" sont elles-mêmes fournies par les plugins market et config pré-installés. Étant donné que tous les plugins pré-installés sont préconfigurés, vous n'avez généralement pas besoin de modifier leur configuration. La modification arbitraire de la configuration des plugins ou la suppression de plugins pré-installés peut entraîner des dysfonctionnements de Koishi.
:::

Bien que le plugin echo n'ait pas besoin de configuration, les plugins plus complexes offrent souvent de nombreuses options de configuration pour permettre aux utilisateurs de contrôler leur comportement. L'image suivante montre la page de configuration du plugin novelai.

![settings](/manual/console/settings.light.webp) {.light-only}

![settings](/manual/console/settings.dark.webp) {.dark-only}

Sur cette page, vous verrez de nombreuses options de configuration. Notez ce qui suit :

- Les options de configuration obligatoires mais non encore renseignées sont indiquées par une barre d'information <span style="font-weight: bold; color: var(--vp-c-red-1)">rouge</span>. Vous devez remplir correctement ces options pour activer le plugin.
- Les options de configuration modifiées mais non enregistrées sont indiquées par une barre d'information <span style="font-weight: bold; color: var(--vp-c-indigo-1)">violette</span>. Une fois que vous avez modifié une configuration, cliquez sur le bouton "Activer le plugin" ou "Enregistrer la configuration" pour enregistrer les modifications. Si vous souhaitez annuler les modifications, vous pouvez cliquer sur le menu déroulant à côté du nom de la configuration, puis choisir "Annuler les modifications" pour ramener la configuration à son état précédemment enregistré.

## Gestion des plugins

### Gestion des groupes

Koishi propose un mécanisme de groupes de plugins pour faciliter la gestion simultanée de plusieurs plugins.

Lors de l'installation de Koishi, certains groupes sont préconfigurés, et les nouveaux plugins installés sont placés en bas de la liste des plugins, ce qui signifie qu'ils ne sont associés à aucun groupe. Les groupes et les plugins peuvent être réorganisés en les sélectionnant et en les faisant glisser, que ce soit pour changer leur ordre ou les déplacer entre les groupes. Vous pouvez également remarquer que les groupes peuvent être imbriqués.

La création d'un nouveau groupe est également simple. Cliquez sur "Configuration globale" ou sur le nom d'un groupe, puis cliquez sur le bouton "Créer un groupe" en haut à droite. Le nom du nouveau groupe est généré de manière aléatoire, mais vous pouvez cliquer sur le nom pour le modifier comme vous le souhaitez. Les groupes peuvent être développés ou réduits en cliquant sur la petite flèche à côté du nom du groupe.

此外，[过滤器](../usage/customize.md#过滤器) 机制也可用于分组，便于控制一系列插件的行为。

### Ajout de plugins supplémentaires

:::tip
通常情况下，一个插件只能同时运行一份配置。请参考 [维护多份配置](../recipe/multiple.md) 章节。
:::

Si un plugin déjà installé n'apparaît pas dans la liste des plugins, vous pouvez l'ajouter manuellement. Sur la page "Configuration globale" ou de n'importe quel groupe, cliquez sur le bouton "Ajouter un plugin", puis une fenêtre contextuelle apparaîtra. Dans cette fenêtre contextuelle, cliquez sur le plugin que vous souhaitez ajouter pour créer une nouvelle configuration de plugin non activée.

![select-plugin](/manual/console/select-plugin.light.webp) {.light-only}

![select-plugin](/manual/console/select-plugin.dark.webp) {.dark-only}

### Suppression de plugins ou de groupes

:::warning
注意：此操作无法被撤销，如果你想要恢复之前的配置，只能再次手动添加。Faites preuve de prudence.
:::

Sur n'importe quelle page de configuration de plugin, cliquez sur le bouton "Supprimer le plugin" en haut à droite pour supprimer la configuration du plugin. De même, dans la page de configuration du groupe, cliquez sur le bouton "Supprimer le groupe" en haut à droite pour supprimer ce groupe. Lorsque vous supprimez un groupe, tous les plugins qui s'y trouvent sont également supprimés.

## Mise à jour et désinstallation des plugins

Accédez à la page "Gestion des dépendances", où vous pouvez voir la liste des dépendances. Les dépendances peuvent inclure le cœur de Koishi, divers plugins, ainsi que des packages logiciels nécessaires au fonctionnement des plugins.

Lorsque l'état de la dépendance indique "Mise à jour possible", cliquez sur le bouton "Modifier" à côté, sélectionnez la version que vous souhaitez dans la fenêtre contextuelle, puis cliquez sur "Mettre à jour" en bas à droite pour effectuer la mise à jour.

Vous pouvez également mettre à jour plusieurs plugins en une seule fois. Utilisez le menu déroulant à droite du nom de la dépendance pour sélectionner les versions que vous souhaitez modifier, puis cliquez sur le bouton "Appliquer les modifications" en haut à droite. De plus, le bouton "Tout mettre à jour" en haut à droite permet de mettre à jour toutes les dépendances en une seule opération.

![dependencies](/manual/console/dependencies.light.webp) {.light-only}

![dependencies](/manual/console/dependencies.dark.webp) {.dark-only}
