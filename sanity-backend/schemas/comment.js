export default {
    name: 'comment',
    title:'Comment',//user orUSer
    type: 'document',
    fields: [
        {
            name: 'postedBy',
            title: "Posted By",
            type: 'postedBy'
        },
        {
            name:'comment',
            title:'Comment',
            type: 'string'

        }
    ]


}