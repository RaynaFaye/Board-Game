/*Creating all Weapons from a weapon prototype*/
let Weapons = {
  init: function(name, weapon, damage, style) {
    this.name = name;
    this.weapon = weapon;
    this.damage = damage;
    this.style = style;
  }
};

let weaponone = Object.create(Weapons);
weaponone.init('Ganesha', 'weaponone', 10, 'images/ganesha.png');

let weapontwo = Object.create(Weapons);
weapontwo.init('Terra', 'weapontwo', 20, 'images/terra.png');

let weaponthree = Object.create(Weapons);
weaponthree.init('Dragonfang', 'weaponthree', 30, 'images/dragonfang.png');

let weaponfour = Object.create(Weapons);
weaponfour.init('Phoenix', 'weaponfour', 40, 'images/phoenix.png');

let weaponfive = Object.create(Weapons);
weaponfive.init('Underworld', 'weaponfive', 50, 'images/underworld.png');

let healthpotion = Object.create(Weapons);
healthpotion.init('Elixir', 'healthpotion', 40, 'images/elixir.png');
