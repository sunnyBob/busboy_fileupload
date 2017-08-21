const upload = require('../upload/upload')
module.exports = async route => {
  route.get('/login', async ctx => {
    await ctx.render('index', {
      title: "ejs Test",
      content: "Hello World!",
    })
    
  })
  
  route.post('/upload', async (ctx) => {
    let result = await upload(ctx, {
      fileType: "jerryliu",
      path: __dirname+"/../../upload-files"
    })
    await ctx.render('index', {
      title: 'upload',
      content: result.message
    })
  })
}