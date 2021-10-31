# universo_down

Projeto Universo Down - Web Service

##Como contribuir

1. Cria uma branch com a sua feature: git checkout -b minha-feature;
2. Faça commit das suas alterações: git commit -m 'feat: Minha nova feature';
3. Faça push para a sua branch: git push origin minha-feature.
4. Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## If Rename Branch

1. git branch -m main master
2. git fetch origin
3. git branch -u origin/master master
4. git remote set-head origin -a

## Padronização de publicações e alterações de código

Semantic Commit Messages
See how a minor change to your commit message style can make you a better programmer.

Format: <type>(<scope>): <subject>

<scope> is optional

Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

* feat: (new feature for the user, not a new feature for build script)
* fix: (bug fix for the user, not a fix to a build script)
* docs: (changes to the documentation)
* style: (formatting, missing semi colons, etc; no production code change)
* refactor: (refactoring production code, eg. renaming a variable)
* test: (adding missing tests, refactoring tests; no production code change)
* chore: (updating grunt tasks etc; no production code change)

### References:

* https://www.conventionalcommits.org/ 
* https://seesparkbox.com/foundry/semantic_commit_messages
* http://karma-runner.github.io/1.0/dev/git-commit-msg.html


## Padronização de estrutura de pastas e arquivos

Example

<scope> 


frontend
    
## Organização das pastas

As pastas desse projeto devem ser organizadas conforme exemplo a seguir:

- Como : Toda documentação gerada e coletada que pode ser usada para compreenção e descrição do projeto

Árvore de arquivos :

```
frontend
|
├── public
│   ├── css
│   ├── img
│   └── js
|   
├── html
│   ├── cadastrar
│   │   └── 
│   ├── listar
│   │   └── 
│   ├── admin
│   │   └── 
│   ├── usuarios
│   │   └── 
│   ├── partials
│   │   └── 
|   ├──
|   ├──
|
├ index.html
├ README.md
└ LICENSE
```

## Nome de Arquivos

* Camel Case(camelCase)

Example

```
nomeDoArquivo.html
nomeDaImagem.jpeg

```
