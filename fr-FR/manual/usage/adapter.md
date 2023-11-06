# Première conversation

Après avoir installé Koishi et exploré le marché des plugins, êtes-vous impatient de découvrir les fonctionnalités de Koishi ? Commençons tout de suite notre première conversation avec le robot conversationnel !

## Simulation de conversation dans un bac à sable

Rendez-vous dans la page « Bac à sable » dans la console, où vous pouvez simuler une conversation avec le robot conversationnel.

Tout d'abord, cliquez sur « Ajouter un utilisateur » dans le coin supérieur gauche de l'écran pour créer un utilisateur virtuel (vous verrez qu'un nouvel utilisateur est nommé Alice). Une interface de chat vide apparaîtra sur le côté droit de l'écran. Cliquez dans la boîte de dialogue en bas de l'écran, saisissez « help » et appuyez sur la touche « Entrée » pour envoyer. Vous verrez immédiatement la réponse du robot dans la fenêtre de chat. « help » est une commande intégrée qui répertorie toutes les commandes actuellement disponibles. Par conséquent, dans la réponse, vous verrez « echo » et « help ».

Le plugin « echo » que nous venons d'installer permet de renvoyer le texte saisi par l'utilisateur tel quel. Essayons maintenant : saisissez « echo bonjour » et appuyez sur la touche Entrée. Vous verrez la réponse du robot « bonjour ».

![sandbox](/manual/console/sandbox.light.webp) {.light-only}

![sandbox](/manual/console/sandbox.dark.webp) {.dark-only}

Si vous souhaitez simuler une conversation en guilde, vous pouvez cliquer à nouveau sur « Ajouter un utilisateur » pour créer plus d'utilisateurs.Ensuite, changez en mode « Conversation en guilde » en haut. De cette manière, vous pouvez contrôler plusieurs utilisateurs virtuels pour converser avec le robot. Cela peut être très utile si vous souhaitez essayer des plugins multijoueurs tels que les jeux d'échecs.

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

Une application Koishi peut se connecter à plusieurs comptes sur différentes plates-formes conversationnelles. Chaque compte correspond à une configuration de plugin, et vous pouvez ajouter de nouvelles configurations de plugins en suivant les méthodes décrites dans [Ajouter plus de plugins](./market.md#添加更多插件). 由于同一平台内接入的多个机器人共享了相同的用户数据。因此，你可以非常方便地在多个机器人之间切换以实现负载均衡。

不同平台的接入方式与难度存在较大的差异。对于不同的平台，你需要做好相应的准备工作。这些工作可能包括在平台内注册开发者账号、准备一台部署到公网的服务器等等。你可以在各个适配器插件的文档中找到详细的指引。

好消息是，Koishi 的大部分功能都不依赖特定的聊天平台。因此在进行准备工作的同时，你完全可以阅读本文档的后续部分，并在沙盒中体验并学习 Koishi 的功能。

## 对比沙盒与真实环境

事实上，大多数机器人框架都没有提供沙盒功能，或是倾向于用户在真实环境中进行体验。你可能会有疑惑：为什么 Koishi 要推荐使用沙盒功能呢？因此我们列出了沙盒的几点优势。

首先，沙盒可以让你快速地了解插件的效果，而不需要在真实环境中进行大量的测试。想象一下，你刚刚安装了一个陌生的插件，你并不知道应该如何使用它，也不知道它的效果是什么。最糟糕的情况下，一旦插件的某些功能触发了机器人的敏感行为，你的真实账号还存在被封禁的风险。而沙盒则可以让你在不用担心这些问题的情况下，快速地了解插件的功能。

其次，如果你是插件的开发者而非使用者，沙盒功能的意义则更大了：得益于 Koishi 的热重载机制，每次修改插件源码后，你只需要按下保存，即可立即在沙盒中体验修改后的效果。这允许你在任何设备上进行快速的迭代开发，而根本不需要准备真实环境的账号。

当然，沙盒并不能代替真实的聊天环境，有些插件的效果可能无法在沙盒中体验。因此，我们推荐你在沙盒中体验插件的基础功能，而在真实环境中进行更加深入的测试。
