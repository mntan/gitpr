# gitpr

A command line to create git pull requests

## Install

```
$ npm install gitpr -g
```

Access tokens:
* If using GitHub you will need to create a github personal access token and assign it to an environment variable `GITHUB_TOKEN`
* If using Bitbucket you will need to base 64 encode `"username:password"` and assign it to an environment variable `BITBUCKET_TOKEN`    

## Usage

gitpr is designed to work as part of your normal git flow. It will use the branch you are currently on as the head and the branch you specify with the `-b` or `--base` option as the branch you want your changes pulled into (defaults to master).

```
$ gitpr -t "My awesome PR" -b master
```

If you need help:
```
gitpr -h
```

## Limitations

Currently gitpr is only compatible with GitHub and Bitbucket. It does not implement the full features offered by the Bitbucket api i.e. reviewers and close pr. If anyone want's this stuff feel free to raise an issue or sent me a pr
