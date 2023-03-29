//Async await

console.log('Person1: shows ticket');
console.log('Person2: shows ticket');

const preMovie = async () => {
  const promiseWifeBringingTickets = new Promise((resolve, reject) => {
    setTimeout(() => resolve('ticket'), 3000);
  });
  const getPopcorn = new Promise((resolve, reject) => resolve('popcorn'));
  const addButter = new Promise((resolve, reject) => resolve('butter'));
  const getColdDrinks = new Promise((resolve, reject) => resolve('cold drink'));

  let ticket = await promiseWifeBringingTickets;

  console.log(`Wife: I have the ${ticket}`);
  console.log('Husband: We should go in');
  console.log('Wife: No, I am hungry');

  let popcorn = await getPopcorn;

  console.log(`Wife: I have the ${popcorn}`);
  console.log('Husband: We should go in');
  console.log('Wife: I need butter on my popcorn');

  let butter = await addButter;

  console.log(`Husband: I got some ${butter} on popcorn`);
  console.log('Husband: Anything else, darling?');

  let coldDrink = await getColdDrinks;

  console.log(`Husband: I got some ${coldDrink}`);
  console.log('Husband: Anything else, darling?');
  console.log('Wife: Let\'s go, we are getting late');
  console.log('Husband: Thank you for the reminder *grins*');

  return ticket;
};

preMovie().then((msg) => console.log(`Person3: shows ${msg}`));

console.log('Person4: shows ticket');
console.log('Person5: shows ticket');
