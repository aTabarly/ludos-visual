# CV Interactif

## [ESLint](https://eslint.org/) 

permet d'appliquer des règles de syntaxe et de style de codage. Pratiquement tout le monde utilise ESLint ou un programme similaire pour renforcer et partager des règles communes à travers une équipe. Cela permet de se familiariser avec des bonnes pratiques qui deviennent ensuite des automatismes. VSCode supporte ESLint via une [extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Clean Code
Le code doit s'auto-documenter et nécessiter des commentaires seulement dans des cas très particuliers. Un bon exemple dans ton code:
```js
 window.addEventListener('keydown', function (event) {
    var code = event.keyCode;
    switch (code) {
        case 38: //////////////////////// gauche    
            player.direction.left = true;
            break;
        case 40: //////////////////////////// haut
            player.direction.up = true;
            break;
        // ...    
    };

}, false);
```
↓ devient
```js
// On enlève les commentaires et on remplace les valeurs en dur par des variables aux noms explicites
window.addEventListener('keydown', function (event) {
    var code = event.keyCode;
    switch (code) {
        case KEY_CODE.LEFT:    
            player.direction.left = true;
            break;
        case KEY_CODE.UP:
            player.direction.up = true;
            break;
        // ...    
    };

}, false);
```

## Encapsulation (principe de la programmation orientée objet)
```js
if(enemy.state === sprite.dead){
 //...
}
```
↓ devient
```js
var enemy = {
 isDead: function(){
  return this.state === 'dead';
 }
}

if(enemy.isDead()){
 //...
}
```
Ici on a un plusieurs avantages:
 - le développeur qui utilise un objet de type *enemy* n'a pas à se soucier des détails d'implémentation
 - lisibilité du code accrue
 - si je veux changer la logique de la fonction ``isDead``, je ne dois modifier le code qu'à 1 seul endroit
 ```js
 var enemy = {
 isDead: function(){
  return this.life === 0;
 }
}
```

## Constantes
Comme en ES3 il n'y a pas de ``const``, la convention veut que les constantes soit écrites en UPPER_SNAKE_CASE

## Comparaisons 
Toujours privilégier ``===`` et ``!==`` à ``==`` et ``!=``

## For-loop
Quand on boucle sur les éléments d'une liste, stocker l'élément de la liste dans une variable:
```js
for(var i = 0; list[i] !== undefined; i++){
    var element = list[i];
    //...
}
```
