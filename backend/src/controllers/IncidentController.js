const connection = require('../database/connection');

module.exports = {

/**
 * INDEX: Lista incidents with page=5
 * @param {*} request 
 * @param {*} response 
 */
    async index(request, response) {
        const { page = 1 } = request.query;

        // É necessário desestruturar o retorno em um Array
        const [count] = await connection('incidents').count();
        console.log(count);        

        // Serãoo retornados os dados de contato da Ong a cada incidente.
        // utilizando o Join.
        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page -1)*5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // É enviado no cabeçalho  a quantidade de registros total
        response.header('X-Total-Count', count['count(*)']);

        return response.json( incidents );
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        // Verificando se o ID passado realmente é da Ong.
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        // 204: Resposta sem conteúdo mas com sucesso.
        return response.status(204).send();
    },
};