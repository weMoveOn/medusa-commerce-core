When connecting your Medusa backend to a PostgreSQL Docker container, make sure the `5432` port is exposed.

To do that, either pass the `-p` option to the `docker run` command. For example:

```bash
docker run -d -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=supersecret postgres
```

Or, if you're using Docker Desktop, you can provide the option under the container's "Optional settings" collapsable.

![Setting Port option in Docker Desktop](https://res.cloudinary.com/dza7lstvk/image/upload/v1699952615/Medusa%20Docs/Screenshots/Screenshot_2023-11-14_at_10.56.04_AM_nsur0q.png)

If you expose the PostgreSQL docker container at a port other than `5432`, make sure to include it in your database URL.

When installing Medusa with `create-medusa-app`, you can provide a database URL with the different port using the `--db-url` option.

For example:

```bash
npx create-medusa-app@latest --db-url "postgres://user:password@localhost:<YOUR_PORT>/medusa-store"
```

Where `<YOUR_PORT>` is the exposed port if it's different than `5432`.

Refer to the [database_url configuration documentation](../../development/backend/configurations.md#database_url) to learn how to set the database URL for an installed Medusa backend.
