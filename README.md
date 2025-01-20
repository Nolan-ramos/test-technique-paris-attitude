# Test technique Paris Attitude

-------------------------------------------------------------------------------------------------------------------------------------------

# Objectif

## Ce test a pour but de vérifier votre aptitude à identifier, analyser et corriger des problèmes dans une application web existante. Voici une liste de problèmes constatés dans l'application. Votre mission sera de corriger ces problèmes et d'assurer un bon fonctionnement global de l'application.

-------------------------------------------------------------------------------------------------------------------------------------------

# Rendu

## Pour chaque erreur, j'ai ajouté un commentaire à/aux lignes modifiée/ées expliquant les modifications apportées dans le code.
## J'ai aussi ajouté une ligne "Solutions" pour chaque problème mentionné ci-dessous, où j'explique ce que j'ai changé en détail. Ainsi qu'une ligne ou je cite le ou les fichier/s utilisé/s.

-------------------------------------------------------------------------------------------------------------------------------------------

### Problèmes identifiés et attentes


Connexion avec mot de passe :
- Problème : Impossible de se connecter avec un mot de passe correct.
- Attendu : Corriger la logique d'authentification pour valider les identifiants corrects.
- Solutions : Le problème est ce code : user.password !== process.env.PASSWORD qui connecte l'user si l'username est correct et le password incorrect.  
Donc il faut remplacer le code par celui-ci : user.password === process.env.PASSWORD pour que l'user soit connecté en rentrant un username et un password correct.
- Fichier modifié : authenticate-store.js

-------------------------------------------------------------------------------------------------------------------------------------------

Connexion persistante :
- Problème : Après connexion, l'utilisateur est déconnecté en actualisant la page.
- Attendu : Assurer une persistance de la connexion après actualisation.
- Solutions : Pour cette partie j'ai ajouté 3 lignes de code :
    - Au niveau des state : user: JSON.parse(localStorage.getItem('user')) || null, 
        - Cette ligne permet de savoir si il y a déjà un user dans le localStorage ou non après chargement ou actualisation de la page.
    - Au niveau la authenticateUser(user) : localStorage.setItem('user', JSON.stringify(user))
        - Cette ligne permet de stocker un utilisateur dans le localStorage pour qu'ensuite on puisse le récuperer après actualisation.
    - Au niveau de logoutUser() : localStorage.removeItem('user')
        - Cette ligne permet de supprimer un utilisateur dans le localStorage pour que les fonctionnalités disponibles en tant que connectés ne soient plus disponibles.
    - En vérité, ce mécanisme de connexion/déconnection est fonctionnel mais n'est pas optimal et sécurisé, il faudrait utiliser un mécanisme comme JWT par exemple.
- Fichier modifié : authenticate-store.js

-------------------------------------------------------------------------------------------------------------------------------------------

Modal de connexion sur la page "Favorites" :
- Problème : Même connecté, cliquer sur "Favoris" affiche la modal de connexion.
- Attendu : Supprimer l'ouverture de la modal si l'utilisateur est déjà connecté.
- Solutions : Le problème est ce code : !isAuthenticated, qui inverse l'effet, car si on est connecté, la popup connexion s'affiche et si on est pas connecté, on peut accéder à la page favoris (par l'url par exemple).  
Donc il faut remplacer !isAuthenticated par : isAuthenticated (sans le "!") pour inversé le fonctionnement.
- Fichier modifié : routes.js

-------------------------------------------------------------------------------------------------------------------------------------------

Accès à la page "Favorites" sans connexion :
- Problème : L'utilisateur peut accéder à la page des favoris via l'URL sans être connecté.
- Attendu : Bloquer l'accès à cette page si l'utilisateur n'est pas connecté.
- Solutions : En corrigeant le problème : Modal de connexion sur la page "favorites" en premier, cela a corrigé aussi le problème : Accès à la page "Favorites" sans connexion.  
En revanche, si on se déconnecte sur la page "favorites", on reste quand même sur cette page, donc j'ai modifié le code pour faire en sorte que quand on appuie sur le bouton de déconnexion ça lance la fonction logout : @click="logout", et cette fonction logout appelle logoutUser() qui est sur le store, et ensuite si on est sur la page "favorites", cela redirige vers la page home
- Fichiers modifiés : routes.js et HeaderComponent.vue

-------------------------------------------------------------------------------------------------------------------------------------------

Suppression de favoris :
- Problème : La suppression d'un favori ne fonctionne pas.
- Attendu : Corriger la fonctionnalité de suppression des favoris.
- Solutions : Les favoris ne sont pas supprimés en cliquant sur supprimer car dans le code la ligne est : this.favorites = this.favorites.filter((f) => f.id !== favorite.id).  
Mais étant donné que nous récupérons l'id directement, favorite.id n'existe pas et il faut seulement remplacer favorite.id par favorite de cette manière : this.favorites = this.favorites.filter((f) => f.id !== favorite).  
J'ai modifié le nom du paramètre de favorite à favoriteId pour que ça soit plus compréhensible : this.favorites = this.favorites.filter((f) => f.id !== favoriteId).  
- Fichier modifié : authenticate-store.js

-------------------------------------------------------------------------------------------------------------------------------------------

Accès à la page de recherche :
- Problème : L'utilisateur ne peut pas accéder à la page de recherche sans saisir un quartier.
- Attendu : Permettre l'accès à la page de recherche sans quartier.
- Solutions : Ici ce qui bloque c'est le fait que dans les routes, on veut obligatoirement un paramètre pour la page search avec ce code : search/:search  
Mais en ajoutant un "?" de cette manière : search/:search?  
Le paramètre devient optionnel et nous pouvons donc être rediriger vers la page search même sans rien sélectionner.
- Fichier modifié : routes.js

-------------------------------------------------------------------------------------------------------------------------------------------

Affichage des biens dans la recherche :
- Problème : Aucun bien n'est visible si aucun quartier n'est sélectionné.
- Attendu : Lorsque aucun quartier n'est sélectionné, afficher l'ensemble des biens.
- Solutions : Ici par défaut, dans le onMounted, c'est en fonction du filtre sélectionné, que les logements s'affichent.  
Il faut donc mettre une condition dans le cas où il n'y a aucun filtre sélectionné en affichant tous les logements.  
Et dans le cas contraire filtrer en fonction des paramètres.
- Fichier modifié : SearchPage.vue

-------------------------------------------------------------------------------------------------------------------------------------------
// Ici il fallait séparer key === 'min' et key === 'max' en 2 conditions différentes étant donné que ce sont 2 filtres différents
          // En séparant min et max, cela permet de pouvoir traiter les 2 filtres 
if (key === 'min') {
            filtered = filtered.filter(item => item.price >= form[key]);
          } else if (key === 'max') {
            filtered = filtered.filter(item => item.price <= form[key]);
          } else {
            filtered = filtered.filter(item => item[key] === form[key]);
          }
Filtres de loyer :
- Problème : Les filtres de loyer ne fonctionnent pas correctement.
- Attendu : Corriger les filtres pour qu'ils filtrent les biens en fonction des critères de loyer sélectionnés.
- Solutions : Pour que les filtres de loyer fonctionnent correctement, il faut surtout se pencher sur les filtres min et max.  
Car étant donné que les 2 filtres sont gérés dans la même condition : if (key === 'min' || key === 'max') cela ne fonctionne pas.  
Il faut les séparer en 2 conditions : if (key === 'min'){ filtered = filtered.filter(item => item.price >= form[key]);}  
et : else if (key === 'max') { filtered = filtered.filter(item => item.price <= form[key]);}  
De cette manière les 2 filtres sont gérés indépendamment.
- Fichier modifié : search-store.js

-------------------------------------------------------------------------------------------------------------------------------------------

Enregistrement de recherche :
- Problème : Rien ne se passe lorsqu'un utilisateur connecté clique sur "Enregistrer ma recherche".
- Attendu : Vérifier que la fonctionnalité est bien implémentée.
- Solutions : Pour que l'enregistrement fonctionne bien, il faut modifier ce code : if (!this.savedSearch.find((item) => item !== search)) this.savedSearch.push(search)  
En le remplacant par celui-ci : if (!this.savedSearch.find((item) => JSON.stringify(item) === JSON.stringify(search))) {  this.savedSearch.push(search)}  
Car ce sont des objets et donc l'utilisation de JSON.stringify est plus adapté.

- Fichier modifié : search-store.js

-------------------------------------------------------------------------------------------------------------------------------------------

Suppression des recherches enregistrées :
- Problème : Le bouton de suppression des recherches enregistrées est manquant.
- Attendu : Ajouter un bouton pour permettre cette suppression et s'assurer que la méthode backend existante soit appelée correctement et qu'elle fonctionne bien.
- Solutions : J'ai ajouté un bouton qui permet de supprimer une recherche enregistrée, ce bouton est présent sur chacune des recherches enregistrées.  
Ce bouton lance la fonction : deleteSearch  
deleteSearch vérifie si l'utilisateur est connecté, si c'est le cas alors ça appelle clearSavedSearch(index) dans le store en faisant passer en paramètre l'index de la recherche enregistrée à supprimer.  
Et si l'utilisateur n'est pas connecté alors la modal de connexion apparaît.
- Fichier modifié : CardSavedSearch.vue

-------------------------------------------------------------------------------------------------------------------------------------------

Titre de l’onglet sur la page de recherche :
- Problème : Le titre de l’onglet n’est pas présent sur la page de recherche.
- Attendu : Ajouter un titre pertinent au niveau de l’onglet pour améliorer l’expérience utilisateur.
- Solutions : Le titre de l'onglet n'est pas présent car il manque ces éléments de code : import { useMeta } from 'quasar' qui permet d'importer le composable useMeta de quasar.  
Il faut donc ensuite ajouter le composable useMeta dans le code : useMeta({ title: 'Search', }).
- Fichier modifié : SearchPage.vue


