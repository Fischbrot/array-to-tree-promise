const arrayToTree = require('../index');

let data = [
    {
        id: 1,
        name: 'Portfolio',
        parent_id: undefined
    },
    {
        id: 2,
        name: 'Web Development',
        parent_id: 1
    },
    {
        id: 3,
        name: 'Recent Works',
        parent_id: 2
    },
    {
        id: 4,
        name: 'About Me',
        parent_id: undefined
    }
];
  
arrayToTree(data)
    .then(tree => {
        console.log("----------WHOLE TREE----------")
        console.log(tree)
        console.log("!!--------WHOLE TREE--------!!")

        console.log("-----------BRANCHES-----------")
        tree.map((branch, i_branch) => {
            console.log(branch)
        })
        console.log("!!---------BRANCHES---------!!")
        

    }).catch(err => {
        console.error(err)
    })
    