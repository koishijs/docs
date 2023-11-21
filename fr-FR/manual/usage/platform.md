# Génération des comptes

Koishi se décrit comme un framework multiplateforme, mais que signifie vraiment cette "multiplateforme" ? Cela ne signifie pas seulement que Koishi prend en charge plusieurs plateformes d'exécution, mais aussi que Koishi peut se connecter simultanément à plusieurs plateformes de chat et offrir une expérience la plus native possible :

- Koishi fournit une interface unifiée vous permettant de profiter de l'écosystème complet de Koishi sur n'importe quelle plateforme conversationalle.
- Les applications Koishi peuvent se connecter simultanément à plusieurs plateformes de chat, ce qui permet aux utilisateurs d'interagir avec votre robot sur n'importe quelle plateforme.
- Koishi prend en charge nativement la liaison de comptes multiplateformes, ce qui permet aux utilisateurs de migrer leurs données en toute transparence.

Maintenant, explorons comment utiliser le système de compte multiplateforme dans Koishi.

## Obtenir des informations sur le compte

Sur certaines plateformes, les informations du compte ne sont pas visibles, il est donc nécessaire d'utiliser des outils pour les récupérer.

Le plugin [inspect](../../plugins/common/inspect.md) permet de récupérer des informations de session.Après avoir installé ce plugin, vous pouvez envoyer la commande `inspect` depuis n'importe quel compte de plateforme à votre robot (n'utilisez pas le mode sandbox, sinon, vous n'obtiendrez que des données d'utilisateur sandbox). Voici un exemple d'informations de session obtenues :

<chat-panel>
<chat-message nickname="Alice">inspect</chat-message>
<chat-message nickname="Koishi">
<p>Nom de la plateforme : discord</p>
<p>ID du message : 1085992290352373951</p>
<p>ID du canal : 835804172850561094</p>
<p>ID du groupe : 811975252883800125</p>
<p>ID de l'utilisateur : 811972350065115208</p>
<p>ID propre : 952190117479600159</p>
</chat-message>
</chat-panel>

Si vous souhaitez vous connecter ou lier des comptes, les champs "Nom de la plateforme" et "ID de l'utilisateur" seront utiles.

## Connexion à la console

De plus, ce plugin inclut un compte administrateur intégré, ce qui en fait le moyen le plus pratique pour les utilisateurs nouvellement installés de Koishi d'obtenir des privilèges.Le plugin [auth](../../plugins/console/auth.md) permet à n'importe quel utilisateur de se connecter à Koishi via la console et de gérer ses propres informations utilisateur.

### Configuration du plugin de connexion

Accédez à la page de configuration des plugins et cliquez sur le plugin "auth".Vous y trouverez la section "Paramètres administrateur" :

![plugin-login](/manual/console/plugin-login.light.webp) {.light-only}

![plugin-login](/manual/console/plugin-login.dark.webp) {.dark-only}

Entrez le mot de passe que vous avez préparé, puis cliquez sur "Activer le plugin".Sélectionnez "Connexion avec nom d'utilisateur et mot de passe", entrez le nom d'utilisateur que vous avez configuré (par défaut, c'est `admin`) et le mot de passe, puis cliquez sur "Connexion" pour accéder à votre espace personnel.

![login-password](/manual/console/login-password.light.webp) {.light-only}

![login-password](/manual/console/login-password.dark.webp) {.dark-only}

### Connexion en tant qu'utilisateur standard

Si vous êtes un utilisateur standard du robot et que le robot est également configuré avec le plugin de connexion à la console, vous constaterez que vous avez un accès limité lorsque vous accédez pour la première fois à la console.Cela signifie que vous n'êtes pas encore connecté.

Cliquez sur le bouton "Connexion" en bas à gauche, sélectionnez "Connexion avec le compte de la plateforme" et entrez le nom de la plateforme et l'ID de l'utilisateur.Cliquez sur "Obtenir le code de vérification" et envoyez le code de vérification affiché sur la page à votre robot via un message privé. Une fois cela fait, vous serez connecté.

![login-platform](/manual/console/login-platform.light.webp) {.light-only}

![login-platform](/manual/console/login-platform.dark.webp) {.dark-only}

Une fois connecté, vous serez redirigé vers votre espace personnel où vous pourrez modifier votre nom d'utilisateur et votre mot de passe. Les utilisateurs standards doivent initialement se connecter avec leur compte de plateforme. Une fois un nom d'utilisateur et un mot de passe configurés, cliquez sur "Appliquer les modifications" dans le coin supérieur droit pour pouvoir vous connecter à l'avenir avec votre nom d'utilisateur et votre mot de passe.

## Associer les comptes

Koishi prend en charge la association des comptes, ce qui signifie qu'un compte Koishi peut correspondre à plusieurs utilisateurs de plateformes différentes.Une fois la association effectuée, vos données seront partagées quel que soit le lieu où vous interagissez avec le robot.

Koishi propose actuellement deux plugins officiels pour associer les comptes, que nous vous présenterons un par un.

### Associer dans la console

Une fois connecté à la console, tout utilisateur peut associer son compte de plateforme dans la section "Mon profil".Cliquez sur le bouton "Ajouter" à droite de "Associer un compte de plateforme" et suivez le processus similaire à la connexion avec un compte de plateforme pour lier un compte.

![profile](/manual/console/profile.light.webp) {.light-only}

![profile](/manual/console/profile.dark.webp) {.dark-only}

Si vous souhaitez supprimer la liaison, cliquez simplement sur "Dissocier" à droite du compte de plateforme correspondant.

### Associer par commande

Le plugin [bind](../../plugins/common/bind.md) permet également de associer les comptes via des commandes.Envoyez la commande `bind` depuis le compte de la plateforme que vous souhaitez associer :

<chat-panel>
<chat-message nickname="Alice">bind</chat-message>
<chat-message nickname="Koishi">
<p>La commande bind permet de associer des données utilisateur entre plusieurs plateformes.Pendant le processus de association, les données de l'utilisateur d'origine seront entièrement préservées, tandis que les données de l'utilisateur de la plateforme cible seront écrasées par les données de l'utilisateur d'origine.</p>
<p>Veuillez confirmer que la plateforme actuelle est la plateforme cible, puis dans les 5 minutes suivantes, utilisez votre compte pour envoyer le texte suivant sur la plateforme d'origine :</p>
<p>Koishi/123456</p>
</chat-message>
</chat-panel>

Suivez les instructions et utilisez le compte de la plateforme d'origine pour envoyer `Koishi/123456` au robot.Si votre premier message est un message privé, la association est déjà terminée à ce stade.Si votre premier message est dans un groupe de discussion, le robot vous demandera de confirmer à nouveau :

<chat-panel>
<chat-message nickname="Alice">Koishi/123456</chat-message>
<chat-message nickname="Koishi">
<p>Vérification du jeton réussie !Nous allons maintenant passer à la deuxième étape.</p>
<p>Veuillez, dans les 5 minutes suivantes, utiliser votre compte sur la plateforme cible pour envoyer le texte suivant :</p>
<p>Koishi/654321</p>
<p>Remarque : La plateforme actuelle est votre plateforme d'origine, et les données utilisateur de cette plateforme remplaceront celles de la plateforme cible.</p>
</chat-message>
</chat-panel>

Suivez à nouveau les instructions et utilisez le compte de la plateforme cible pour envoyer `Koishi/654321` au robot. Cela complétera la association.

Une fois la association effectuée, vous pouvez à tout moment envoyer `bind -r` depuis la plateforme cible pour dissocier les comptes.
