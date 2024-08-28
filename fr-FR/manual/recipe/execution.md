# Utilisations avancées des commandes

## Utilisation des guillemets

Comme pour la plupart des outils en ligne de commande, il peut être nécessaire d'utiliser des guillemets pour entourer les paramètres, afin d'éviter qu'ils ne soient interprétés de manière incorrecte comme plusieurs paramètres ou comme une option erronée. Cette astuce est très utile dans de nombreux cas :

- Passez un paramètre contenant des espaces (par défaut, il traite les chaînes qui continent des espaces comme plusieurs paramètres)
- Passez un paramètre commençant par `-` (par défaut, cela est interprété comme l'option suivante)
- Passez une chaîne vide comme paramètre (par défaut, cela est interprété comme `true`)

## Substitution de commande

Si vous souhaitez utiliser la sortie d'une autre commande dans une commande, vous pouvez utiliser `$()` pour effectuer une substitution de commande :

<chat-panel>
<chat-message nickname="Alice">echo foo$(echo bar)</chat-message>
<chat-message nickname="Koishi">foobar</chat-message>
</chat-panel>

Par défaut, Koishi n'échappe pas le texte entre guillemets simples. Si vous ne souhaitez pas qu'un paramètre soit échappé par la syntaxe de substitution, vous pouvez utiliser des guillemets simples :

<chat-panel>
<chat-message nickname="Alice">echo 'foo$(echo bar)'</chat-message>
<chat-message nickname="Koishi">foo$(echo bar)</chat-message>
</chat-panel>

De plus, vous pouvez découvrir une autre méthode de substitution dans le plugin [koishi-plugin-eval](https://eval.koishi.chat).

## Correction automatique

Dans l'utilisation quotidienne, il arrive parfois de faire des fautes de frappe. Dans ces cas, Koishi peut automatiquement corriger en suggérant des commandes similaires :

<chat-panel>
<chat-message nickname="Alice">ecko bonjour</chat-message>
<chat-message nickname="Koishi">Voulez-vous dire « echo » ? 回复句号以使用推测的指令。</chat-message>
<chat-message nickname="Alice">.</chat-message>
<chat-message nickname="Koishi">bonjour</chat-message>
</chat-panel>

如果想调整模糊匹配的程度，你还可以修改配置项 [minSimilarity](../../api/core/app.md#options-minsimilarity)。Pratique, n'est-ce pas ?
