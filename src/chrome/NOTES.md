Inject tag bar into compose view
- want to have a watcher that looks out for any of the gmail compose views:
    - compose button: div.aic div.z0 div class="T-I J-J5-Ji T-I-KE L3"
        - could bind to this button? but we have to have the HTML finished before we can add anything
        - this could start the watcher?
    - compose window: div.nH.nn

1. We only want to create a draft if the user is storing tags
    - have some "persisted" flag on the collection which is a boolean for wether or not we have a draft id and are persisting stuff in the collection. Add a listener to "add" on the colleciton where we can check the collection length, 
Everytime a new draft is saved the draft id change
