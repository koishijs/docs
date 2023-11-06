# Gestion des multiples configurations

Il y a de nombreuses situations où vous souhaiterez gérer plusieurs configurations d'un même plugin :

- Exécutez plusieurs instances du même plugin en même temps.
- Basculez vers une autre configuration de plugin au moment approprié.
- Utilisez des configurations de plugin différentes dans des guildes différentes.

Différents besoins ont généralement différentes solutions, donc nous ne pouvons pas vous donner une réponse uniforme. Heureusement, Koishi prend en charge les trois situations mentionnées ci-dessus, il vous suffit de choisir la solution qui convient le mieux à vos besoins.

## Instance unique

Dans une même application Koishi, vous pouvez activer plusieurs instances pour certains plugins, tandis que d'autres ne le peuvent pas - ce n'est pas un défaut de l'implémentation du plugin, mais un comportement attendu. En fait, les auteurs de plugins peuvent spécifier quelles fonctionnalités peuvent être activées indépendamment. Cela se manifeste dans les plugins sous deux types différents : les plugins réutilisables et les plugins non réutilisables.

Un exemple typique de plugin réutilisable est le plugin des [adaptateurs](../usage/adapter.md). Chaque adaptateur correspond à un robot conversationnel en cours d'exécution. Les différents robots de plateformes différentes sont configurés à l'aide de différents adaptateurs. Par conséquent, si vous souhaitez configurer plusieurs robots sur la même plateforme conversationnelle, il vous suffit d'ajouter plusieurs plugins d'adaptateur en suivant la méthode décrite dans la section précédente.

Cependant, la plupart des plugins ne sont pas réutilisables. Pour ces types de plugins, vous ne pouvez avoir qu'une seule configuration en cours d'exécution à un même plugin. 如果已经有一份正在运行的配置，那么你会在其他配置处看到一行提示「此插件正在运行且不可重用」。当然，你仍然可以准备多份配置，并在合适的时机将一份配置停用，并启用另一份。

对于那些不可重用的插件，如果希望在不同的场景下切换到不同的配置，就需要插件作者提供带有 [过滤器](../usage/customize.md#过滤器) 的配置项。如果你想要修改的配置不支持过滤器，那么你可以考虑向插件作者提出建议，或采用下面介绍的 [多实例](#多实例) 方案。

## 多实例

另一种方案是同时运行多个 Koishi 应用。这样做的好处是，你可以在不同的应用中使用完全不同的插件配置，甚至启用完全不同的插件组合。但与之相对的，你需要额外维护多个应用，而且每个应用都需要一个独立的端口。
