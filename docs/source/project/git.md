## Nazewnictwo gałęzi

#### Schemat

```text
{przedrostek}/{numer issue razem z #}-{krótki-opis-2-3-slowa}
```

#### Dozwolone przedrostki:
`hotfix`, `feature`, `chore`

#### Przykłady:
```text
fix/#1-fix-problem-xyz
```

```text
feature/#13-add-main-page
```

```
chore/#24-change-package-json-config
```

!!! note "Czytaj więcej"
    [https://deepsource.io/blog/git-branch-naming-conventions/](https://deepsource.io/blog/git-branch-naming-conventions/)

---

## Nazewnictwo commitów

#### Automatyzacja sprawdzenia nazw commitów

W projekcie jest wpięty [Husky](https://github.com/typicode/husky/tree/master) wraz z 
[Commitlint](https://github.com/conventional-changelog/commitlint). Całość jest skonfigurowana tak, aby
nie przepuszczać commitów o niepoprawnej nazwie. Informacje na temat konwencji nazewnictwa commitów można
znaleźć tutaj (**Koniecznie przeczytaj**):

> [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)

#### Dozwolone przedrostki:
`build`, `ci`, `chore`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`

> [https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)

#### Przykłady

```text
fix: web-worker bug
```

```text
feat: add next section to main page
```

```text
chore(babel): changes to js files handling
```

## Dobre maniery
    
{==

Nigdy nie używaj opcji `--force` na innych gałęziach niż twoje własne.

Mowa tutaj o gałęziach `master`, `dev` itp.

==}

<br/><br/>

