If you use the `--no-browser` option with the `create-medusa-app` command, you'll find a URL outputted at the end of the command execution. This is the URL that you can use to set a password for your admin user.

However, if you copy the URL, then try later to access that URL, you may receive an "Invalid Token" error. This is because when you copy the URL, a lot of extra space may be added into the token. So, you must clear out the spaces within the token and the `||` characters, then try again.

Alternatively, you can create a new user with the [medusa user](../../cli/reference.mdx#user) command.
