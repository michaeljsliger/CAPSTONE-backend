BEGIN; 

TRUNCATE store_items, store_users
    RESTART IDENTITY CASCADE;

INSERT INTO store_users (username, password)
    VALUES
('michael', '$2a$04$DYoky779U9z3xue6ZDmb6uGRe9BvtB95IBtorRvqJ7uaDbNm1RZqK'),
('test-user', '$2a$04$dnbQH1IGLm2UYfyJeSPVGeFW/mvO2eK8xmPNQ1IKW6dcJb.J915G.'),
('test-user-2', '$2a$04$0Qi2gwiaWH.Ox.IxH6t1ZutnQZjZlaJ0c9mTFoGb0txSD.7aa3FGq'),
('test-user-3', '$2a$04$C1QcM274mYXr8Bwyf5ESBOtMbvl7woOvfb7sGik4CGGmqs2jCPkxS');

INSERT INTO store_items (image, name, description, price, user_id)
    VALUES
('https://www.autocar.co.uk/sites/autocar.co.uk/files/slideshow_image/1-ferrari-355-engine.jpg',
'Car Engine', 'An engine for a car, or even a scooter!', 800, 1),
('https://media.wired.com/photos/5d8aab8bef84070009028d31/4:3/w_2132,h_1599,c_limit/Plant-Music-1162975190.jpg',
'Plants', 'Directly from Mother Nature Herself', 75, 2),
('https://live.staticflickr.com/7416/27318411370_aaf3db1f93_b.jpg',
'Concrete Jungle', 'Get trapped in your own personal corporate hellscape', 90000, 3),
('https://topsecretrecipes.com/images/product/chipotle-barbacoa-burrito-copycat-recipe-02.jpg',
'A Burrito', 'Totally wholesale Burritos, not stolen in any fashion', 7, 2);