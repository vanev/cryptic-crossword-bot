# 🤖 Cryptic Crossword Bot

This is a Discord bot that allows you to do [cryptic crosswords](https://www.newyorker.com/puzzles-and-games-dept/cryptic-crossword/reintroducing-the-new-yorkers-cryptic-crossword) with your friends in a Discord guild (server).

## Contributing

### Getting Setup

We recommend that you [create a Discord app](https://discord.com/developers/applications?new_application=true) and follow [the instructions for setting up a bot](https://discord.com/developers/docs/getting-started#configuring-your-bot) so that you have an environment in which to test your changes; I called mine "[Dev] Cryptic Crossword Bot".

Next, create a `.env` file and include the following environment variables:

- `DISCORD_APPLICATION_ID`
- `DISCORD_PUBLIC_KEY`
- `DISCORD_BOT_TOKEN`

Make sure that you have [`yarn`](https://yarnpkg.com/) installed, install the dependencies, and start the development server:

```
brew install yarn
yarn install
yarn dev
```

### Deploying

We use [Railway](https://railway.app) to host this application in production. Commits to the `main` branch are automatically deployed.
