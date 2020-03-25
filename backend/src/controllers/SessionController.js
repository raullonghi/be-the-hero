const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const { id } = request.body;

        // A autenticação vai validar se a Ong existe
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        
        if (!ong){
            return response.status(400).json({ error: 'ONG Not found'});
        }

        return response.json( ong );
    }
};