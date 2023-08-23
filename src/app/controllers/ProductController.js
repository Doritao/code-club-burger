import * as Yup from 'yup'




class ProductController{
    async store(request,response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),

        })
        try {
            await schema.validateSync(request.body, { abortEarly: false }); // o abortEarly assim que ele encontrar um error, ele ja para a aplicacao, entao ele nao fica procurando por outros errors, portanto se tiver algum error no email,senha, etc, ele so vai mostrar em um deles, por isto deve setar ele como falso
          } catch (err) {
            return response.status(400).json({ error: err.errors });
          }
          return response.json({ok: true})
    }
}



export default new ProductController()