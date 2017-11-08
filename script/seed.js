/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
// const {app,createApp,sessionStore} = require('../server/index')
const {User, Beast, Order, Order_Beasts, Review } = require('../server/db/models')


async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.bulkCreate([
      {
        firstName: 'Josh',
        lastName: 'Sohn',
        email: 'josh@josh.com',
        shippingAddress:
        '123 fake st, fake, NY, 10045', password: '123',
        isAdmin: true
      },
      {
        firstName: 'Anna',
        lastName: 'Medyukh',
        email: 'anna@anna.com',
        shippingAddress:
        '345 fake st, fake, NY, 12045', password: '123',
        isAdmin: true
      },{
        firstName: 'Hyunjoo',
        lastName: 'Kim',
        email: 'hyunjoo@hyunjoo.com',
        shippingAddress:
        '678 fake st, fake, NY, 10145', password: '123',
        isAdmin: true
      }, {
        firstName: 'Xifeng',
        lastName: 'Jin',
        email: 'xifeng@xifeng.com',
        shippingAddress:
        '159 fake st, fake, NY, 11145', password: '123',
        isAdmin: true
      }, {
        firstName: 'Jonathan',
        lastName: 'Ahn',
        email: 'jonathan@jonathan.com',
        shippingAddress:
        '125 fake st, fake, NY, 10111', password: '123',
        isAdmin: true
      }, {
        firstName: 'Phoebe',
        lastName: 'Buffay',
        email: 'phoebe@friends.com',
        shippingAddress:
        'Central Perk, Central Park, NY, NY, 10012', password: '123',
        isAdmin: false
      }, {
        firstName: 'Ross',
        lastName: 'Geller',
        email: 'ross@friends.com',
        shippingAddress:
        'Central Perk, Central Park, NY, NY, 10012', password: '123',
        isAdmin: false
      }, {
        firstName: 'Monica',
        lastName: 'Geller',
        email: 'monica@friends.com',
        shippingAddress:
        'Central Perk, Central Park, NY, NY, 10012', password: '123',
        isAdmin: false
      }, {
        firstName: 'Rachel',
        lastName: 'Green',
        email: 'rachel@friends.com',
        shippingAddress:
        'Central Perk, Central Park, NY, NY, 10012', password: '123',
        isAdmin: false
      }, {
        firstName: 'Joey',
        lastName: 'Tribiani',
        email: 'joey@friends.com',
        shippingAddress:
        'Central Perk, Central Park, NY, NY, 10012', password: '123',
        isAdmin: false
      }, {
        firstName: 'Chandler',
        lastName: 'Bing',
        email: 'bing@friends.com',
        shippingAddress:
        'Central Perk, Central Park, NY, NY, 10012', password: '123',
        isAdmin: false
      }],{individualHooks: true}),
      Beast.bulkCreate([{
        species: 'Dragon',
        category: 'Fire',
        danger: 10,
        friendliness: 3,
        size: 'gargantuan',
        careRequirements: "Don't get burned!",
        training: 'slightly',
        origin: 'Westeros',
        price: 500000,
        quantity: 40
      }, {
        species: 'Griffin',
        category: 'Air',
        danger: 7,
        friendliness: 5,
        size: 'large',
        careRequirements: "Give 'er space!",
        training: 'moderately',
        origin: 'Greece',
        imageUrl: 'http://i48.tinypic.com/9uwufo.jpg',
        price: 40000,
        quantity: 100
      }, {
        species: 'Sea Serpent',
        category: 'Sea',
        danger: 6,
        friendliness: 2,
        size: 'medium',
        careRequirements: "Fluent parseltongue is useful.",
        training: 'none',
        origin: 'Westeros',
        imageUrl: 'https://i.pinimg.com/474x/57/dd/42/57dd42c38114cb1b35c1f59df0a0717b--fantasy-creatures-mythical-creatures.jpg',
        price: 10000,
        quantity: 400
      }, {
        species: 'Niffler',
        category: 'Land',
        danger: 2,
        friendliness: 9,
        size: 'small',
        training: 'very',
        careRequirements: 'Must own shiny things.',
        origin: 'UK',
        imageUrl: 'https://pbs.twimg.com/media/DLRxCmMXUAEJ2S3.jpg',
        price: 1000000,
        quantity: 5
      }, {
        species: 'Nundu',
        category: 'Land',
        danger: 10,
        friendliness: 1,
        size: 'extra large',
        careRequirements: "Takes 100 wizards to kill!",
        training: 'slightly',
        origin: 'East Africa',
        price: 5000000,
        quantity: 5
      }, {
        species: 'Occamy',
        category: 'Air',
        danger: 5,
        friendliness: 5,
        size: 'medium',
        careRequirements: "Don't mess with its eggs!",
        training: 'slightly',
        origin: 'Westeros',
        price: 90000,
        quantity: 150
      }, {
        species: 'Phoenix',
        category: 'Fire',
        danger: 6,
        friendliness: 7,
        size: 'medium',
        careRequirements: "Let it work through its emotional cycle and don't get burned!",
        training: 'moderately',
        origin: 'Greece',
        imageUrl: 'https://ae01.alicdn.com/kf/HTB1tgrQJFXXXXc8XVXXq6xXFXXXz/Fantasy-Art-Original-artwork-Phoenix-Nirvana-cloth-silk-art-wall-poster-and-prints.jpg_640x640.jpg',
        price: 250000,
        quantity: 125
      }, {
        species: 'Leviathan',
        category: 'Sea',
        danger: 9,
        friendliness: 2,
        size: 'gargantuan',
        careRequirements: "Large water source needed!",
        training: 'none',
        origin: 'Middle East',
        price: 2500000,
        quantity: 3
      }, {
        species: 'Thestral',
        category: 'Air',
        danger: 5,
        friendliness: 8,
        size: 'large',
        careRequirements: "If you can see them, you've seen some shit.",
        training: 'completely',
        origin: 'Ireland',
        price: 200000,
        quantity: 20
      }, {
        species: 'Kraken',
        category: 'Sea',
        danger: 10,
        friendliness: 1,
        size: 'gargantuan',
        careRequirements: "Keep him fed!",
        training: 'none',
        origin: 'Norway',
        imageUrl: 'https://pp.userapi.com/c841439/v841439830/2c527/MLBne7pbqes.jpg',
        price: 500000,
        quantity: 2
      }, {
        species: 'Graphorn',
        category: 'Land',
        danger: 7,
        friendliness: 5,
        size: 'large',
        careRequirements: "Keep it safe from poachers.",
        training: 'moderately',
        origin: 'Europe',
        price: 40000,
        quantity: 15
      }, {
        species: 'Hellhound',
        category: 'Fire',
        danger: 8,
        friendliness: 3,
        size: 'medium',
        careRequirements: "Needs a big lawn.",
        training: 'slightly',
        origin: 'Wales',
        imageUrl: 'http://anomalija.lt/wp-content/uploads/2017/08/juodasis-suo.jpg',
        price: 30000,
        quantity: 50
      }, {
        species: 'Cherufe',
        category: 'Fire',
        danger: 9,
        friendliness: 1,
        size: 'gargantuan',
        careRequirements: "Must live near volcano",
        training: 'none',
        origin: 'Chile',
        price: 300000,
        quantity: 3
      }, {
        species: 'Hippocamp',
        category: 'Sea',
        danger: 7,
        friendliness: 6,
        size: 'large',
        careRequirements: "Needs dolphin friends to be happy",
        training: 'slightly',
        origin: 'Greece',
        price: 65000,
        quantity: 25
      }, {
        species: 'Thunderbird',
        category: 'Air',
        danger: 7,
        friendliness: 7,
        size: 'large',
        careRequirements: "Needs to fight evil frequently.",
        training: 'very',
        origin: 'America',
        price: 80000,
        quantity: 45
      }, {
        species: 'Mooncalf',
        category: 'Land',
        danger: 1,
        friendliness: 10,
        size: 'small',
        careRequirements: "Give lots of love.",
        training: 'very',
        origin: 'Earth',
        price: 5000,
        quantity: 250
      }],{individualHooks: true})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
