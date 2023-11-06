# Gestion des multiples configurations

Il y a de nombreuses situations où vous souhaiterez gérer plusieurs configurations d'un même plugin :

- Exécutez plusieurs instances du même plugin en même temps.
- Basculez vers une autre configuration de plugin au moment approprié.
- Utilisez des configurations de plugin différentes dans des guildes différentes.

Différents besoins ont généralement différentes solutions, donc nous ne pouvons pas vous donner une réponse uniforme. Heureusement, Koishi prend en charge les trois situations mentionnées ci-dessus, il vous suffit de choisir la solution qui convient le mieux à vos besoins.

## Instance unique

Dans une même application Koishi, vous pouvez activer plusieurs instances pour certains plugins, tandis que d'autres ne le peuvent pas - ce n'est pas un défaut de l'implémentation du plugin, mais un comportement attendu. En fait, les auteurs de plugins peuvent spécifier quelles fonctionnalités peuvent être activées indépendamment. Cela se manifeste dans les plugins sous deux types différents : les plugins réutilisables et les plugins non réutilisables.

Un exemple typique de plugin réutilisable est le plugin des [adaptateurs](../usage/adapter.md). Chaque adaptateur correspond à un robot conversationnel en cours d'exécution. Les différents robots de plateformes différentes sont configurés à l'aide de différents adaptateurs. Par conséquent, si vous souhaitez configurer plusieurs robots sur la même plateforme conversationnelle, il vous suffit d'ajouter plusieurs plugins d'adaptateur en suivant la méthode décrite dans la section précédente.

Cependant, la plupart des plugins ne sont pas réutilisables. Pour ces types de plugins, vous ne pouvez avoir qu'une seule configuration en cours d'exécution à un même plugin. Si vous avez déjà une configuration d'un plugin en cours d'exécution, vous verrez une notification indiquant « Ce plugin est en cours d'exécution et ne peut pas être réutilisé » lorsque vous essayez de l'activer ailleurs. Cependant, vous pouvez toujours préparer plusieurs configurations, puis passer de l'une à l'autre au moment opportun.

Pour les plugins non réutilisables, si vous souhaitez basculer vers différentes configurations dans des scénarios différents, il a besoin que l'auteur du plugin fournisse des options de configuration avec des [filtres](../usage/customize.md#过滤器). Si la configuration que vous souhaitez modifier ne prend pas en charge les filtres, vous pouvez envisager de proposer des suggestions à l'auteur du plugin, ou d'utiliser l'approche multi-instance décrite ci-dessous.

## Instance multiple

Une autre approche consiste à exécuter plusieurs instances de l'application Koishi en même temps. L'avantage de cette approche est que vous pouvez utiliser des configurations de plugins totalement différentes dans des applications différentes, voire activer des combinaisons de plugins totalement différentes. Cependant, en contrepartie, vous devrez gérer plusieurs applications distinctes, chacune nécessitant un port indépendant.
