const menu = ['Burger', 'Fries', 'Chicken', 'Pizza', 'Sandwich', 'Onionrings', 'Milkshake', 'Coke'];
const order = 'milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza';

// Find menu items in order
const readableMenu = menu.map( dish => order.match(new RegExp(dish, 'gi')));

// Filter menu
const filteredMenu = readableMenu.filter( dish => dish );

// Concatenate to 1 array
const contactedMenu = filteredMenu.reduce( (total, dish) => total.concat(dish) );

// Capitalize
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
const readableCapMenu = contactedMenu.map(item => capitalize(item));

// Convert to string
const readableStringMenu = contactedMenu.join(' ')

console.log(readableCapMenu);