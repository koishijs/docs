# Première conversation

Après avoir installé Koishi et exploré le marché des plugins, êtes-vous impatient de découvrir les fonctionnalités de Koishi ? Commençons tout de suite notre première conversation avec le robot conversationnel !

## Simulation de conversation dans un bac à sable

Rendez-vous dans la page « Bac à sable » dans la console, où vous pouvez simuler une conversation avec le robot conversationnel.

首先点击屏幕左上角的「添加用户」来创建一个虚拟用户 (通常第一位虚拟用户的名字会是 Alice)，此时屏幕右侧会出现空白的聊天界面。Cliquez dans la boîte de dialogue en bas de l'écran, saisissez « help » et appuyez sur la touche « Entrée » pour envoyer. 你会立即在聊天界面中看到机器人的回复，列出了包括 `echo` 和 `help` 在内的所有可用的指令，这便是 `help` 这个内置指令的功能。

可以看到，这里的 `echo` 就是我们刚刚安装的插件，它的功能是将用户的输入原样返回。Essayons maintenant : saisissez « echo bonjour » et appuyez sur la touche Entrée. Vous verrez la réponse du robot « bonjour ».

![sandbox](/manual/console/sandbox.light.webp) {.light-only}

![sandbox](/manual/console/sandbox.dark.webp) {.dark-only}

如果想要模拟群聊，我们可以创建更多的用户，并在聊天界面顶部点击切换到「群聊模式」。这样，你就可以通过在左侧栏切换并控制多个虚拟用户与机器人聊天了。如果你要体验的是下棋一类的多人交互插件，这会非常有用。

En outre, si certaines commandes nécessitent un certain [niveau des autorisations](../usage/customize.md#权限管理), vous pouvez les ajuster dans les « Paramètres de l'utilisateur ».

## Connexion à une plateforme conversationnelle réelle

Simuler des conversations uniquement dans un bac à sable ne suffit pas. Nous devons connecter le robot à une plateforme conversationnelle réelle pour qu'il puisse réellement nous être utile. Koishi utilise des plugins d'adaptateurs pour prendre en charge diverses plates-formes conversationnelles. Voici une liste des adaptateurs maintenus officiellement :

- [DingTalk](../../plugins/adapter/dingtalk.md)
- [Discord](../../plugins/adapter/discord.md)
- [KOOK](../../plugins/adapter/kook.md)
- [Lark](../../plugins/adapter/lark.md)
- [LINE](../../plugins/adapter/line.md)
- [Courriers électroniques](../../plugins/adapter/mail.md)
- [Matrix](../../plugins/adapter/matrix.md)
- [QQ](../../plugins/adapter/qq.md)
- [Slack](../../plugins/adapter/slack.md)
- [Telegram](../../plugins/adapter/telegram.md)
- [WeChat Official Account](../../plugins/adapter/wechat-official.md)
- [WeCom (WeChat Work)](../../plugins/adapter/wecom.md)
- [WhatsApp](../../plugins/adapter/whatsapp.md)

Parmi eux, les adaptateurs couramment utilisés sont déjà préinstallés dans Koishi, vous pouvez les trouver dans le groupe de configuration des plugins des « adaptateurs ». Si vous ne voyez pas la plateforme que vous souhaitez, vous pouvez également rechercher et installer d'autres plugins d'adaptateurs sur la place de marché.

Une application Koishi peut se connecter à plusieurs comptes sur différentes plates-formes conversationnelles. Chaque compte correspond à une configuration de plugin, et vous pouvez ajouter de nouvelles configurations de plugins en suivant les méthodes décrites dans [Ajouter plus de plugins](./market.md#添加更多插件). Étant donné que plusieurs comptes robots dans la même plateforme partagent les mêmes données d'utilisateurs, il est très facile de passer entre eux pour équilibrer la charge.

Les méthodes et la complexité de la connexion varient considérablement d'une plateforme à l'autre, vous devez donc effectuer des préparatifs spécifiques pour chaque plateforme. Ces préparatifs peuvent inclure l'enregistrement d'un compte de développeur sur la plateforme, la préparation d'un serveur accessible depuis Internet, etc. Vous trouverez des instructions détaillées dans la documentation de chaque plugin d'adaptateur.

Heureusement, la plupart des fonctionnalités de Koishi ne dépendent pas spécifiquement de la plateforme de chat. Par conséquent, pendant que vous effectuez ces préparatifs, vous pouvez lire la suite de ce document et expérimenter les fonctionnalités de Koishi dans le bac à sable.

## Comparaison entre le bac à sable et l'environnement réel

En réalité, la plupart des cadres de robots conversationnels ne proposent pas de fonctionnalité de bac à sable ou encouragent les utilisateurs à expérimenter dans un environnement réel. Vous pourriez vous demander pourquoi Koishi recommande l'utilisation de la fonctionnalité de bac à sable. Nous avons donc répertorié quelques avantages du bac à sable.

Tout d'abord, le bac à sable vous permet de comprendre rapidement l'efficacité des plugins sans avoir besoin de tester en profondeur dans un environnement réel. Imaginez que vous venez d'installer un plugin inconnu, vous ne savez pas comment l'utiliser et quel est son effet. Dans le pire des cas, si certaines fonctionnalités du plugin déclenchent des comportements restrictifs du robot, votre compte réel pourrait être suspendu. Le bac à sable vous permet de découvrir rapidement les fonctionnalités du plugin sans vous soucier de ces problèmes.

Deuxièmement, si vous êtes un développeur de plugins plutôt qu'un utilisateur, la fonctionnalité de bac à sable est encore plus précieuse : grâce à la fonction de rechargement à chaud de Koishi, chaque fois que vous modifiez le code source du plugin, il vous suffit de cliquer sur « Enregistrer » pour essayer immédiatement les effets de la modification dans le bac à sable. Cela vous permet de développer rapidement et itérer sur n'importe quel appareil, sans avoir besoin d'un compte réel.

Bien sûr, le bac à sable ne peut pas remplacer un environnement de chat réel, car certaines fonctionnalités de plugins ne peuvent pas être essayées dans le bac à sable. Par conséquent, nous vous recommandons d'expérimenter les fonctionnalités de base des plugins dans le bac à sable, puis de les essayer plus en profondeur avec un compte réel.
