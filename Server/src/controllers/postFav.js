const { Favorite } = require('../DB_connection');

const postFav = async (req, res) => {
    const { name, origin, status, image, species, gender } = req.body;

    if(!name || !origin || !status || !image || !species || !gender){
        return res.status(401).send('Faltan datos');
    }

    try{
        const [fav , created] = await Favorite.findOrCreate({
            where: { name },
            defaults: { origin, status, image, species, gender }
        });

        const allFavs = await Favorite.findAll();
        return res.send(allFavs);
    } catch(error){
        return res.status(500).send(error.message);
    }
}

module.exports = postFav;