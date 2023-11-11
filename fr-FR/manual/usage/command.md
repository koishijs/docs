# Système de commandes

Après avoir appris les bases de l'utilisation de la console, nous pouvons enfin commencer à explorer comment dialoguer avec le robot ! Commençons par l'exemple que nous avons vu dans la section précédente :

<chat-panel>
<chat-message nickname="Alice">help</chat-message>
<chat-message nickname="Koishi">
<p>Commandes disponibles : </p>
<p class="indent-1">echo  Envoi de message</p>
<p class="indent-1">help  Afficher l'aide</p>
<p>Tapez "help <commande>" pour voir la syntaxe et les exemples pour une commande spécifique.</p>
</chat-message>
</chat-panel>

La sortie ci-dessus concerne deux plugins :

- La commande « help » est fournie par le plugin [help](../../plugins/common/help.md) qui peut d'afficher la liste des commandes disponibles ou des informations d'aide pour une commande spécifique.
- La commande « echo » est fournie par le plugin [echo](../../plugins/common/echo.md) qui peut renvoyer le texte saisi par l'utilisateur.

La plupart des fonctionnalités d'un robot Koishi sont proposés via des commandes. Lorsque vous installez davantage de plugins, vous pouvez utiliser à plus de commandes.

## Afficher l'aide

La commande « help » accepte un paramètre optionnel pour afficher des informations d'aide pour une commande spécifique :

<chat-panel>
<chat-message nickname="Alice">help echo</chat-message>
<chat-message nickname="Koishi">
<p>Commande : echo &lt;message...></p>
<p>Envoi de message</p>
<p>Options disponibles :</p>
<p class="indent-1">-e, --escape  Échapper le message</p>
<p class="indent-1">-E, --unescape  Décoder le message</p>
</chat-message>
</chat-panel>

Vous avez peut-être remarqué que la commande « help » est elle-même une commande. Vous vous demandez peut-être si vous pouvez utiliser « help » pour afficher des informations d'aide sur la commande « help ». La réponse est oui :

<chat-panel>
<chat-message nickname="Alice">help help</chat-message>
<chat-message nickname="Koishi">
<p>Commande : help [commande]</p>
<p>Afficher l'aide</p>
<p>Options disponibles :</p>
<p class="indent-1">-a, --authority  Afficher les configurations d'autorisés</p>
<p class="indent-1">-H, --show-hidden  Afficher les options et commandes invisibles</p>
</chat-message>
</chat-panel>

## Arguments et options

Dans les exemples ci-dessus, nous avons mentionné deux nouveaux concepts : les arguments et les options.

Les arguments peuvent être obligatoires ou facultatifs et sont représentés respectivement par des chevrons `<>` et des crochets `[]`. Une commande peut avoir un nombre quelconque d'arguments, et leur ordre est fixe. Les utilisateurs doivent saisir les arguments dans l'ordre spécifié par la commande. Les arguments obligatoires doivent apparaître avant les arguments facultatifs. Si les utilisateurs ne fournissent pas un nombre suffisant d'arguments obligatoires, le plugin génère généralement un message d'erreur. Les arguments supplémentaires fournis par les utilisateurs sont ignorés.

Par exemple, la commande « help » a un argument facultatif qui représente le nom de la commande à consulter. La commande « echo » a un argument obligatoire qui représente le message à envoyer. Voici ce qui se passe si l'utilisateur ne fournit pas l'argument obligatoire :

<chat-panel>
<chat-message nickname="Alice">echo</chat-message>
<chat-message nickname="Koishi">
<p>Veuillez entrer le texte à envoyer.</p>
</chat-message>
</chat-panel>

Les options contrôlent également le comportement d'une commande. Elles commencent généralement par un tiret `-` ou deux tirets `--`, suivis d'un nom d'option fixe. Les options n'ont pas d'ordre spécifique, mais il est généralement recommandé de les placer avant les arguments. Par exemple, nous pouvons essayer ceci :

<chat-panel>
<chat-message nickname="Alice">echo &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">&lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Alice">echo -E &lt;image url="https://koishi.chat/logo.png"/&gt;</chat-message>
<chat-message nickname="Koishi">
<img src="https://koishi.chat/logo.png" width="100"/>
</chat-message>
</chat-panel>

Dans l'exemple ci-dessus, nous avons utilisé l'option `-E` pour modifier la sortie de la commande. Nous expliquerons plus en détail comment cela fonctionne dans les sections suivantes.

Les arguments peuvent être également de longueur fixe ou variable. Les arguments de longueur fixe ne peuvent pas contenir d'espaces, tandis que les arguments de longueur variables le peuvent. Les arguments de longueur fixe sont indiqués par `...` avant et après le nom de l'argument, par exemple, l'argument de la commande `echo` est de longueur variable.Si vous souhaitez saisir du contenu contenant des espaces pour un argument de longueur fixe, vous pouvez utiliser des guillemets pour l'encadrer, par exemple :

<chat-panel>
<chat-message nickname="Alice">help "foo bar"</chat-message>
</chat-panel>

En outre, certaines options peuvent également accepter des arguments. Par exemple, si vous avez installé le plugin de traduction, voici ce que vous obtiendrez :

<chat-panel>
<chat-message nickname="Alice">help translate</chat-message>
<chat-message nickname="Koishi">
<p>Commande : translate &lt;text...></p>
<p>Traduction</p>
<p>Options disponibles :</p>
<p class="indent-1">-s, --source &lt;lang> Langue source (détection automatique par défaut)</p>
<p class="indent-1">-t, --target &lt;lang> Langue cible (chinois par défaut)</p>
</chat-message>
<chat-message nickname="Alice">translate -t fr Hello, World</chat-message>
<chat-message nickname="Koishi">Bonjour le monde</chat-message>
</chat-panel>

Dans l'exemple ci-dessus, les options `-s` et `-t` sont des options avec des arguments. Nous avons utilisé l'option `-t fr` pour spécifier la langue cible comme le français, tandis que la langue source suit toujours le comportement par défaut.

## Préfixe de déclenchement

Cependant, dans un canal de guilde, déclencher une commande avec un seul mot est très sujet aux erreurs. Pour éviter cette situation, Koishi introduit le concept de préfixe de déclenchement. Dans les « paramètres globaux », il y a les options de configuration « prefix » et « nickname ». Si vous définissez « prefix » sur « / », et « nickname » sur « Shiki », alors dans un canal de guilde, seuls les messages suivants peuvent déclencher l'exécution de commandes :

```sh
Shiki, echo bonjour
@Shiki, echo bonjour
/echo bonjour
```

En d'autres termes, une commande peut être déclenchée si :

- Le message commence par `prefix`, suivi immédiatement de nom de commande.
- Le message commence par `nickname`, suivi d'une virgule ou de caractères blancs, puis de la commande.
- Le massage commence par @robot (il peut y avoir plusieurs mentionnées, mais au moins un doit être le compte du robot), suivi de la commande.

Pour les guildes contenant un grand nombre de personnes ou plusieurs robots, nous vous recommandons fortement de configurer de préfixes de déclenchement différents pour chaque robot.En revanche, dans les canaux directs, il n'y aura pas de problème des erreurs de commande déclenchée, donc il n'y a les restrictions ci-dessus. Les commandes sans préfixes de déclenchement peuvent également être exécutés normalement.

::: tip
**Quelque conseils concernant `prefix` : **

1. `prefix` est une liste des préfixes, le valeur par défaut `['']` signifie qu'aucun préfixe n'est nécessaire pour déclencher une commande. Si vous videz la liste, cela signifie que toutes les commandes ne peuvent pas être déclenchées via `prefix` (mais elles peuvent toujours être déclenchées via des canaux directs ou `nickname` ou @robot).
2. Si vous configurez plusieurs valeurs pour `prefix`, par exemple `['.', '/', '']`, alors `.`, `/`, ou aucun préfixe peuvent tous déclencher une commande. Cependant, Koishi suit l'ordre dans lequel les préfixes sont configurés, il est donc recommandé de placer la chaîne vide `''` en dernier.
3. Vous pouvez configurer différents `prefix`-es pour différents types du chat, voir la section [Filtres](./customize.md#过滤器) pour plus de détails.

## Sous-commandes

[admin](../../plugins/common/admin.md) 插件提供了名为 user 的指令，现在让我们调用一下：

<chat-panel>
<chat-message nickname="Alice">user</chat-message>
<chat-message nickname="Koishi">
<p>指令：user</p>
<p>用户管理</p>
<p>可用的子指令有：</p>
<p class="indent-1">authorize  权限管理</p>
<p class="indent-1">user.locale  语言偏好</p>
</chat-message>
</chat-panel>

这里出现了一个新的概念：子指令。子指令在调用上与普通的指令并没有区别，但它们将不会显示在 `help` 返回的全局指令列表中，而只会显示在父指令 `user` 的帮助信息中。这样设计的目的是为了避免指令列表过于冗长，同时也将指令以一种更清晰的方式进行了组织。

在上面的例子中，我们还能发现 Koishi 存在两种不同的子指令：一种是 **层级式**，例如 `authorize`；而另一种则是 **派生式**，例如 `user.locale`。后者跟前者的区别是，它的名称带有父指令的名称，以及一个小数点 `.`。在调用时，我们也需要加上这个小数点：

<chat-panel>
<chat-message nickname="Alice">user.locale en</chat-message>
<chat-message nickname="Koishi">User data updated.</chat-message>
</chat-panel>

如果父指令本身没有功能，那么 `user` 和 `user -h` 的效果是一样的。此时，我们也可以使用空格代替小数点进行派生式子指令的调用：

<chat-panel>
<chat-message nickname="Alice">user locale zh
</chat-message>
<chat-message nickname="Koishi">用户数据已修改。</chat-message>
</chat-panel>

熟悉 Git 的用户可能会发现，这种设计正是借鉴了 Git 的二级指令：当一个指令的功能过于复杂时，我们可以将其拆分为多个子指令，从而使得指令的功能更加清晰。

::: tip
至于 user.locale 是干什么的，想必大家也已经猜出来了。我们留到 [国际化](./customize.md#国际化) 一节再详细介绍。
:::

## 指令管理

打开控制台，我们会在活动栏中找到名为「指令管理」的页面。你可以在这里查看当前所有指令的列表，并对指令的行为进行设置。

### 设置别名

点进任意指令的详情页，首先就能看到「名称设置」，这里展示了指令的全部别名。每个别名都能被用来触发指令，而第一个别名则会作为默认名称显示在帮助中。

你可以在这里添加或删除别名，也可以将任意别名设置为默认的显示名称。例如，在 `echo` 指令中点击「添加别名」，输入 `复读`，然后点击「设为默认」，这样一来，用户在帮助中看到的就是 `复读` 而不是 `echo` 了。

### 添加子指令

在左侧栏中，你可以将任何指令 (派生式指令除外) 拖至其他指令的下方，这将使得前者成为后者的子指令。例如，我们可以将 [`bind`](../../plugins/common/bind.md) 指令设置为 `user` 指令的子指令，因为这属于用户管理的一部分。

点击右上角的加号按钮，我们可以创建一个新指令。这个新指令自然是没有行为的，它的主要目的是作为其他指令的父指令，已获得更好的展示效果。对于通过此方法创建的新指令，我们可以通过点击右上角的垃圾桶按钮将其移除。

### 权限管理

在「名称设置」下方还有更多的配置项，我们可以在这里进一步配置指令对用户的访问权限。例如，将 echo 指令的 `authority` 设置为 `2`，那么将只有 2 级以上权限的用户才能调用该指令。

我们甚至还可以单独设置每一个指令选项的权限等级。例如，我们可以单独给 `-E, --unescape` 选项设置 `authority` 为 3。这样一来，只有 3 级以上权限的用户才能使用 `echo -E` 的功能。

关于用户权限，请参考 [权限管理](./customize.md#权限管理) 一节。
