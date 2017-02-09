import { app, html } from "hyperapp"

app({
    model: {
      authors: [],
      posts: [],
    },

    update: {
      loadAuthors: (model, data) => {
        model.authors = data
      },

      loadPosts: (model, data) => {
        model.posts = data
      },
    },

    effects: {
      fetch: (model, msg) => {
        graphql.query(`{
          authors {
            name
            posts {
              title
            }
          }
        }`).then(result => {
          msg.loadAuthors(result.authors)
        })

        graphql.query(`{
          posts {
            title
          }
        }`).then(result => {
          msg.loadPosts(result.posts)
        })
      }
    },

    view: (model, msg) =>  html`<div oncreate=${msg.fetch}>
      <div>
        <h3>authors</h3>
        ${model.authors.map(author => html`
          <p>${author.name} <span>有多少文章：${author.posts.length}</span></p>
        `)}
      </div>

      <div>
        <h3>posts</h3>
        ${model.posts.map(post => html`
          <p>${post.title}</p>
        `)}
      </div>
    </div>`
})
