/* eslint-disable indent */
// make things
// make users

function makeUsers() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      password: '$2a$04$ZDFG22FviMhbES4JEcf8Eunwq41NosgRXcW6UxDF4XVMqXqfmaMPS'
    },
    {
      id: 2,
      username: 'test-user-2',
      password: '$2a$04$ivrtYG/o7QMPJg2sm/OiBONlyOHdtkoDdnuthNCWRqtdlxNPWqVNi'
    },
    {
      id: 3,
      username: 'test-user-3',
      password: '$2a$04$pdVG5dylbTSopL7kp7dafexLhfQsvcHwRYR96PBoEoYFEuMDcIlXC'
    },
    {
      id: 4,
      username: 'test-user-4',
      password: '$2a$04$0i1ElGjuUVMiYkrIx.bmeeqt4FfKskzajpZeynPw493CgQHtnC4sK'
    },
  ];
}

function makeItems() {
    return [
        {
            id: 1,
            image: 'https://southernautomotivegroup.com.au/wp-content/uploads/2015/04/generic-placeholder-person.png',
            name: 'A generic item',
            description: 'What could go wrong?',
            price: 80,
            user_id: 3,
        },
        {
            id: 2,
            image: 'https://southernautomotivegroup.com.au/wp-content/uploads/2015/04/generic-placeholder-person.png',
            name: 'A second generic item',
            description: 'What could go wrong?',
            price: 49,
            user_id: 4,
        },
        {
            id: 3,
            image: 'https://southernautomotivegroup.com.au/wp-content/uploads/2015/04/generic-placeholder-person.png',
            name: 'A third generic item',
            description: 'What could go wrong?',
            price: 99,
            user_id: 1,
        },
        {
            id: 4,
            image: 'https://southernautomotivegroup.com.au/wp-content/uploads/2015/04/generic-placeholder-person.png',
            name: 'A generic item',
            description: 'What could go wrong?',
            price: 80,
            user_id: 2
        },
    ];
}


module.exports = {
    makeUsers,
    makeItems,
}