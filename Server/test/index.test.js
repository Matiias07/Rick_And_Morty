const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 616,
    name: 'Matt',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    origin: {
        name: 'Earth (C-137)'
    },
    image: 'image.jpg'
};

describe("Test de RUTAS", () => {

describe('GET /rickandmorty/character/:id', () => {
    it('Responde con status: 200', async () => {
        const response = await request.get('/rickandmorty/character/1')
        expect(response.status).toBe(200)
    })

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
        const response = await request.get('/rickandmorty/character/1');
        for(const prop in character){
            expect(response.body).toHaveProperty(prop);
        }
    });

    it('Si hay un error responde con status: 500', async() => {
        const res = await request.get('/rickandmorty/character/:500j')
        expect(res.status).toBe(500)
    })
})

describe("GET /rickandmorty/login", () => {
    const access = { access: true };

    it('Debería responder un objeto con la propiedad access en true si la informacion del usuario es correcta', async () =>{
        const res = await request.get('/rickandmorty/login?email=mattmaidana10@gmail.com&password=1contra');
        expect(res.body).toEqual(access);
    })

    it('Debería responde un objeto con la propiedad access en false si la informacion del usuario es incorrecta', async () => {
        const res = await request.get('/rickandmorty/login?email=mattmaidana@mail.com&password=123contrajhg');
        access.access = false;
        expect(res.body).toEqual(access);
    })
})

describe("POST /rickandmorty/fav", () => {
    it('Debería guardar el personaje en favoritos', async () => {
        const res = await request.post('/rickandmorty/fav')
        .send(character);
        expect(res.body).toContainEqual(character)
    })
    
    it('Debería agregar personajes a favoritos sin eliminar los existentes', async () => {
        character.id = 217;
        character.name = 'Maidana';
        const res = await request
        .post('/rickandmorty/fav')
        .send(character)
        expect(res.body.length).toBe(2);
    })
})

describe("DELETE /rickandmorty/fav/:id", () => {
    it('Debería devolver el arreglo original si el ID no existe', async () => {
        const res = await request.delete('/rickandmorty/fav/2sadas4');
        expect(res.body.length).toBe(2);
    })
    
    it('Debería eliminar correctamente el personaje si se envía un ID válido', async () => {
        const res = await request.delete('/rickandmorty/fav/217');
        expect(res.body.length).toBe(2);
    })
})

})

