/* eslint-disable indent */
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { get } = require('../src/Routing/storeRouter');
const injections = require('./testInjections');
const authService = require('../src/Services/authService');
const { expect } = require('chai');

describe('/store endpoint', () => {
    let db;

    const testUsers = injections.makeUsers();
    const testItems = injections.makeItems();
    const user = [testUsers[0]];


    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
        app.set('db', db);
    });

    after('disconnect from db', () => db.destroy());
    before('cleanup tables', () => {
        return db.raw(
            'TRUNCATE store_users, store_items RESTART IDENTITY CASCADE'
        );
    });
    afterEach('cleanup tables', () => {
        return db.raw(
            'TRUNCATE store_users, store_items RESTART IDENTITY CASCADE'
        );
    });

    // ENDPOINTS 
    describe('/store', () => {
        context('Given nothing in the db', () => {
            it('should return 200', () => {
                return supertest(app)
                    .get('/store')
                    .expect(200, []);
            });

            it('should return 401, wtihout authorization', () => {
                return supertest(app)
                    .get('/store/1')
                    .expect(401);
            });

            it('should return 404, with auth, but item not found', () => {
                const user = [testUsers[0]];
                return supertest(app)
                    .get('/store/1')
                    .set('Authorization', `Bearer ${authService.createJWT(user)}`)
                    .expect(404);
            });
        });

        context('given items in DB', () => {
            beforeEach('insert into tables', async () => {
                await db('store_users').insert(testUsers);
                await db('store_items').insert(testItems);
            })
            afterEach('cleanup tables', () => {
                return db.raw('TRUNCATE store_users, store_items RESTART IDENTITY CASCADE')
            })

            it('/store, with auth, should respond 200 with items', () => {
                return supertest(app)
                    .get('/store')
                    .set('Authorization', `Bearer ${authService.createJWT(user)}`)
                    .expect(200, testItems);
            });

            it('/store/:id with auth should respond 200 with item', () => {
                const findID = 1;
                const expectedItem = [testItems.find(el => el.id === findID)];

                return supertest(app)
                    .get(`/store/${findID}`)
                    .set('Authorization', `Bearer ${authService.createJWT(user)}`)
                    .expect(200, expectedItem)
            });
            it('/store DELETE should work properly', () => {
                const findID = 1;
                return supertest(app)
                    .delete(`/store/${findID}`)
                    .set('Authorization', `Bearer ${authService.createJWT(user)}`)
                    .expect(204)
                    .expect(async () => {
                        const res = await db('store_items')
                            .select('*');

                        expect(res.length).to.equal(3);
                    });
            });
            it('/store POST should return 401 with invalid data', () => {
                const newItem = {
                    id: 5,
                    name: 'yabba dabba doo',
                    image_link: 'https://southernautomotivegroup.com.au/wp-content/uploads/2015/04/generic-placeholder-person.png',
                    description: 'lorem ipsum',
                    user_id: 1
                }

                return supertest(app)
                    .post('/store/add-item')
                    .set('Authorization', `Bearer ${authService.createJWT(user)}`)
                    .send(newItem)
                    .expect(401)
            });

            it('/store POST should return 204 with valid data', () => {
                const newItem = {
                    id: 5,
                    image_link: 'https://southernautomotivegroup.com.au/wp-content/uploads/2015/04/generic-placeholder-person.png',
                    name: 'yabba dabba doo',
                    description: 'lorem ipsum',
                    price: 79,
                    user_id: 1
                }

                return supertest(app)
                    .post('/store/add-item')
                    .set('Authorization', `Bearer ${authService.createJWT(user)}`)
                    .send(newItem)
                    .expect(204)
                    .expect(async () => {
                        const res = await db('store_items')
                            .select('*')

                        newItem.id = 5;
                        newItem.image = newItem.image_link;
                        delete newItem.image_link;
                        expect(newItem).to.eql(res[4]);
                    })
            })
        });

    });
});