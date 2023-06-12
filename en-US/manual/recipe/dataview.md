# Database Access

::: tip
Be careful when directly manipulating the database!
:::

The database panel in the console's left-hand menu allows you to view, add, modify, or delete data in Koishi's database. In general, the database includes information about users and channels, as well as the records of the bot's message-sending frequency in each channel.

![database](/manual/console/database.light.webp) {.light-only}

![database](/manual/console/database.dark.webp) {.dark-only}

Sometimes you may need to manually manipulate the database, such as when using the `authorize` command in the `Admin` plugin to set user permissions, the operator must have at least level 4 permissions by default.

To achieve this, you could go to the `Dataview` page in the console, find your own account under the corresponding platform (such as onebot) in the `user` table (you may need to send a message to the bot on the platform first), and then modify its corresponding `authority` value from the default value 1 to a value greater than or equal to 4. This will give your account a higher privilege, so now try using the `authorize` command to elevate the privilege of other accounts you want.
