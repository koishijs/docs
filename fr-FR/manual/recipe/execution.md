# Utilisations avancées des commandes

## Les guillemets

Koishi interprète automatiquement le contenu entre guillemets comme un paramètre single. Cela s'avère très utile dans de nombreuses situations, voici quelques exemples courants :

- Si vous souhaitez transmettre des paramètres contenant des espaces (le comportement par défaut est de n'interpréter que la partie avant l'espace).
- Si vous souhaitez transmettre des paramètres commençant par `-` (le comportement par défaut est d'interpréter le prochain élément comme une option).
- Si vous souhaitez transmettre une chaîne vide en tant que paramètre (le comportement par défaut est d'interpréter comme `true`).
- Si vous souhaitez transmettre des paramètres constitués uniquement de chiffres (le comportement par défaut est d'interpréter comme des types `number`).

## L'Interpolation

Si vous souhaitez utiliser le contenu d'une autre commande au sein d'une commande, vous pouvez utiliser `$()` pour l'interpolation de commandes :

<chat-panel>
<chat-message nickname="Alice">echo foo$(echo bar)</chat-message>
<chat-message nickname="Koishi">foobar</chat-message>
</chat-panel>

Koishi ne s'échappe pas automatiquement du texte entre guillemets simples. Si vous ne souhaitez pas que certains paramètres soient échappés par la syntaxe d'interpolation, vous pouvez utiliser des guillemets simples :

<chat-panel>
<chat-message nickname="Alice">echo 'foo$(echo bar)'</chat-message>
<chat-message nickname="Koishi">foo$(echo bar)</chat-message>
</chat-panel>

Enfin, vous pouvez également en savoir plus sur une autre méthode d'interpolation dans [koishi-plugin-eval](https://eval.koishi.chat).

## Correspondance floue

Dans l'utilisation quotidienne, il arrive parfois de faire des fautes de frappe. Dans ces cas, Koishi peut automatiquement corriger en suggérant des commandes similaires :

<chat-panel>
<chat-message nickname="Alice">ecko bonjour</chat-message>
<chat-message nickname="Koishi">Voulez-vous dire « echo » ?Tapez un point pour appliquer la suggestion.</chat-message>
<chat-message nickname="Alice">.</chat-message>
<chat-message nickname="Koishi">bonjour</chat-message>
</chat-panel>

Si vous souhaitez ajuster le degré de correspondance floue, vous pouvez modifier la configuration [minSimilarity](../../api/core/app.md#options-minsimilarity). Pratique, n'est-ce pas ?
