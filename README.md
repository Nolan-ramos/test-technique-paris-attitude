# Test technique Paris Attitude

-------------------------------------------------------------------------------------------------------------------------------------------

# Objectif

## Ce test a pour but de vérifier votre aptitude à identifier, analyser et corriger des problèmes dans une application web existante. Voici une liste de problèmes constatés dans l'application. Votre mission sera de corriger ces problèmes et d'assurer un bon fonctionnement global de l'application.

-------------------------------------------------------------------------------------------------------------------------------------------

# Rendu

## Pour chaque erreur, j'ai ajouté un commentaire expliquant les modifications apportées dans le code.
## J'ai également ajouté une ligne "Solutions" pour chaque problème mentionné ci-dessous, où j'explique ce que j'ai changé en détail.

-------------------------------------------------------------------------------------------------------------------------------------------

### Problèmes identifiés et attentes

Accès à la page de recherche :
- Problème : L'utilisateur ne peut pas accéder à la page de recherche sans saisir un quartier.
- Attendu : Permettre l'accès à la page de recherche sans quartier.
- Solutions : 

-------------------------------------------------------------------------------------------------------------------------------------------

Affichage des biens dans la recherche :
- Problème : Aucun bien n'est visible si aucun quartier n'est sélectionné.
- Attendu : Lorsque aucun quartier n'est sélectionné, afficher l'ensemble des biens.
- Solutions : 

-------------------------------------------------------------------------------------------------------------------------------------------

Connexion avec mot de passe :
- Problème : Impossible de se connecter avec un mot de passe correct.
- Attendu : Corriger la logique d'authentification pour valider les identifiants corrects.
- Solutions : Le problème est ce code : user.password !== process.env.PASSWORD qui connecte l'user si l'username est correct et le password incorrect.
Donc il faut remplacer le code par celui-ci : user.password === process.env.PASSWORD pour que l'user soit connecté en rentrant un username et un password correct.

-------------------------------------------------------------------------------------------------------------------------------------------

Connexion persistante :
- Problème : Après connexion, l'utilisateur est déconnecté en actualisant la page.
- Attendu : Assurer une persistance de la connexion après actualisation.
- Solutions : 

-------------------------------------------------------------------------------------------------------------------------------------------

Accès à la page "Favorites" sans connexion :
- Problème : L'utilisateur peut accéder à la page des favoris via l'URL sans être connecté.
- Attendu : Bloquer l'accès à cette page si l'utilisateur n'est pas connecté.
- Solutions : 

-------------------------------------------------------------------------------------------------------------------------------------------

Modal de connexion sur la page "Favorites" :
- Problème : Même connecté, cliquer sur "Favoris" affiche la modal de connexion.
- Attendu : Supprimer l'ouverture de la modal si l'utilisateur est déjà connecté.
- Solutions : Le problème est ce code : !isAuthenticated, qui inverse l'effet, car si on est connecté, la popup connexion s'affiche et si on est pas connecté, on peut accéder à la page favoris (par l'url par exemple).
Donc il faut remplacer !isAuthenticated par : isAuthenticated (sans le "!") pour inversé le fonctionnement.

-------------------------------------------------------------------------------------------------------------------------------------------

Filtres de loyer :
- Problème : Les filtres de loyer ne fonctionnent pas correctement.
- Attendu : Corriger les filtres pour qu'ils filtrent les biens en fonction des critères de loyer sélectionnés.
- Solutions : 

-------------------------------------------------------------------------------------------------------------------------------------------

Enregistrement de recherche :
- Problème : Rien ne se passe lorsqu'un utilisateur connecté clique sur "Enregistrer ma recherche".
- Attendu : Vérifier que la fonctionnalité est bien implémentée.
- Solutions : 

-------------------------------------------------------------------------------------------------------------------------------------------

Suppression de favoris :
- Problème : La suppression d'un favori ne fonctionne pas.
- Attendu : Corriger la fonctionnalité de suppression des favoris.
- Solutions : 

-------------------------------------------------------------------------------------------------------------------------------------------

Suppression des recherches enregistrées :
- Problème : Le bouton de suppression des recherches enregistrées est manquant.
- Attendu : Ajouter un bouton pour permettre cette suppression et s'assurer que la méthode backend existante soit appelée correctement et qu'elle fonctionne bien.
- Solutions : 

-------------------------------------------------------------------------------------------------------------------------------------------

Titre de l’onglet sur la page de recherche :
- Problème : Le titre de l’onglet n’est pas présent sur la page de recherche.
- Attendu : Ajouter un titre pertinent au niveau de l’onglet pour améliorer l’expérience utilisateur.
- Solutions : Le titre de l'onglet n'est pas présent car il manque ces éléments de code : import { useMeta } from 'quasar' qui permet d'importer le composable useMeta de quasar.
Il faut donc ensuite ajouter le composable useMeta dans le code : useMeta({ title: 'Search', }).


