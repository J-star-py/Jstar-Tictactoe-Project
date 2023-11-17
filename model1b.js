
function segundaIABasica(tablero = []) {

  let cerosCount = 0
  for (let index = 0; index < 9; index++) {
    tablero[index] === 0 && (cerosCount++)
  }
  if (!cerosCount) {return tablero}

  let tA = 2 - cerosCount%2;
  let tS = 3 - tA;

  let lista = [[], "nada"]
  for (let i3 = 0; i3 < 9; i3++) {
    if (tablero[i3] === 0) {
      lista[0].push(tablero.slice(undefined,i3).concat([tA]).concat(tablero.slice(i3+1,undefined)));
    }
  }

  return lista;
}


function verificacionEstado(tablero=[]) {
  let winCombs = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  for (let i = 0; i<8; i++) {
    let comb = winCombs[i]
    if (tablero[comb[0]] !== 0 &&
      tablero[comb[0]] === tablero[comb[1]] &&
      tablero[comb[1]] === tablero[comb[2]]) {

          return [11, comb, {1:"X",2:"O"}[tablero[comb[0]]]]
        }
  }
  if (tablero.includes(0)) {return [null]}
  return [0];
}

let contador = 0
function negamax(tablero, depth = 0, memo = {}) {
  if (depth === 0){
    memo = {};
    contador = 0}
  contador++

  if (Object.keys(memo).includes(tablero.toString())) {
    return memo[tablero.toString()]
  }

  if (tablero.toString() === "0,0,0,0,0,0,0,0,0") {
    let posicionA = Math.floor(Math.random()*9);
    return [tablero.slice(undefined,posicionA).concat([1]).concat(tablero.slice(posicionA+1,undefined)), "inicio"]
  }

  if (depth === 0 && !tablero.includes(0)) {return [tablero, "nada"]}

  let estado = verificacionEstado(tablero)[0];
  if (estado !== null) {return 0-(estado - ((estado % 10)*depth))}
    

  let mejoresJugadas = [];
  let mejor = Number.NEGATIVE_INFINITY;
  let posiblesJugadas = segundaIABasica(tablero)[0];

  for (let i = 0; i < posiblesJugadas.length; i++) {
    let resultado = 0-negamax(posiblesJugadas[i], depth+1, memo);

    if (depth === 0) {
      console.log(resultado, posiblesJugadas[i])
      if (resultado === mejor) {
        mejoresJugadas.push(posiblesJugadas[i])
      }
    }

    if (resultado > mejor) {
      mejor = resultado;
      if (depth === 0) {mejoresJugadas = [posiblesJugadas[i]]}
    }
  }
    if (depth === 0) {
      console.log(contador)
      let randInd = Math.floor(((Math.random())*(mejoresJugadas.length)));
      console.log(mejoresJugadas, randInd)
      return [mejoresJugadas[randInd], mejor]}
    memo[tablero.toString()] = mejor;
    return mejor;
}


function getPosition(tablero, tablero2) {
  for (let i =0;i<9;i++) {
    if (tablero[i]!==tablero2[i]) {return i}
  }
}
