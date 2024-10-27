//Atributos poke rival
const imgRival = document.querySelector('#pokeRival');
const nombreRival = document.querySelector('#nombreRival');
const tipo1Rival = document.querySelector('#tipo1Rival');
const tipo2Rival = document.querySelector('#tipo2Rival');
const atkFisRival = document.querySelector('#ataqueFisRival'); 
const atkEspRival = document.querySelector('#ataqueEspRival');
const vidaRival = document.querySelector('#vidaRival');
const defensaEspRival = document.querySelector('#defensaEspRival');
const defensaFisRival = document.querySelector('#defensaFisRival');
const velocidadRival = document.querySelector('#velocidadRival');

//Atributos poke propio
const imgProp = document.querySelector('#pokeProp');
const nombreProp = document.querySelector('#nombreProp');
const tipo1Prop = document.querySelector('#tipo1Prop');
const tipo2Prop = document.querySelector('#tipo2Prop');
const atkFisProp = document.querySelector('#ataqueFisProp'); 
const atkEspProp = document.querySelector('#ataqueEspProp');
const vidaProp = document.querySelector('#vidaProp');
const defensaEspProp = document.querySelector('#defensaEspProp');
const defensaFisProp = document.querySelector('#defensaFisProp');
const velocidadProp = document.querySelector('#velocidadProp');
//Interfaz de usuario

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis  = document.querySelector('#btn-atk-fis');
const btnAtkEsp  = document.querySelector('#btn-atk-esp');

//Método de número random
const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
}

//Se elegirá un pokemon pero solo del tipo fantasma, el tipo de elección del pokemon queda a criterio del desarrollador, que sea divertido.
const obtenerPokePropio = ()=>{
    const num = input.value;
    console.log(num);
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res)=>{
        return res.data
    }).then((res)=>{
        imgProp.src =res.sprites.front_default;
        nombreProp.innerHTML= res.name;
        tipo1Prop.innerHTML= res.types[0].type.name;
        tipo2Prop.innerHTML= res.types[1].type.name;

        vidaProp.innerHTML=res.stats[0].base_stat;
        atkFisProp.innerHTML=res.stats[1].base_stat;
        defensaFisProp.innerHTML=res.stats[2].base_stat;
        atkEspProp.innerHTML=res.stats[3].base_stat;
        defensaEspProp.innerHTML=res.stats[4].base_stat;
        velocidadProp.innerHTML=res.stats[5].base_stat;
        //console.log(res);
    })
}
//Se generará un pokemon Prop aleatorio 
const obtenerPokeRival = () =>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{
        console.log(res.data);
        return res.data
    }).then((res)=>{
        imgRival.src =res.sprites.front_default;
        nombreRival.innerHTML= res.name;
        tipo1Rival.innerHTML= res.types[0].type.name;
        if (res.types[1].type.name= undefined){
            tipo2Rival.innerHTML= '';
        }else{
            tipo2Rival.innerHTML= res.types[1].type.name;
        }
        //tipo2Rival.innerHTML= res.types[1].type.name;

        vidaRival.innerHTML=res.stats[0].base_stat;
        atkFisRival.innerHTML=res.stats[1].base_stat;
        defensaFisRival.innerHTML=res.stats[2].base_stat;
        atkEspRival.innerHTML=res.stats[3].base_stat;
        defensaEspRival.innerHTML=res.stats[4].base_stat;
        velocidadRival.innerHTML=res.stats[5].base_stat;
        //console.log(res);
    })
}
//Combate, el pokemon perdedor será el que se le acabe primero su vida.
//El usuario deberá elegir si ocupa ataque fisico o especial, según lo elegido los pokemon usarán su defensa especial o defensa fisica para bloquear los ataques
//La defensa especial o fisica del pokemon que recibe el ataque sera restada del ataque especial o fisico del pokemon atacante, la diferencia será restada a la vida del pokemon defensor
//En caso de que el resultado de la resta sea negativo o cero, se va a dejar un 1 como el resultado minimo de la resta
//El pokemon que tenga más velocidad va a pegar primero
//Se debe de aplicar la tabla de tipos al resultado de la resta de defensa y ataque, pero solo en daño, no en resitencias
//Ejemplo poke1AtaqueFisico = 56;
// poke2Defensafisica = 35; poke2vida = 98;
// DañoRecibido = poke1AtaqueFisico - poke2DefensaFisica;
//poke2VidaRestante = poke2Vida - DañoRecibido;
//Se turnarán los pokemon hasta que haya un ganador
//Mostrar el ganador
const combate = () => {
    console.log("¡Comienza el combate!");

    // Variables de combate
    let vidaActualProp = parseInt(vidaProp.innerHTML);
    let vidaActualRival = parseInt(vidaRival.innerHTML);

    const velocidadPropVal = parseInt(velocidadProp.innerHTML);
    const velocidadRivalVal = parseInt(velocidadRival.innerHTML);

    const turnoPropPrimero = velocidadPropVal >= velocidadRivalVal;

    // Función para calcular el daño después de defensa y bonificaciones de tipo
    const calcularDaño = (ataque, defensa) => {
        let daño = ataque - defensa;
        // Si el daño es menor o igual a cero, se establece en 1
        return Math.max(daño, 1);
    };

    // Función de ataque Pokémon propio
    const ataquePropio = (ataqueFisico) => {
        const ataque = ataqueFisico 
            ? parseInt(atkFisProp.innerHTML) 
            : parseInt(atkEspProp.innerHTML);
        
        const defensa = ataqueFisico 
            ? parseInt(defensaFisRival.innerHTML) 
            : parseInt(defensaEspRival.innerHTML);
        
        const daño = calcularDaño(ataque, defensa);
        vidaActualRival -= daño;
        
        console.log(`Daño infligido al rival: ${daño}`);
    };

    // Función de ataque Pokémon rival
    const ataqueRival = (ataqueFisico) => {
        const ataque = ataqueFisico 
            ? parseInt(atkFisRival.innerHTML) 
            : parseInt(atkEspRival.innerHTML);
        
        const defensa = ataqueFisico 
            ? parseInt(defensaFisProp.innerHTML) 
            : parseInt(defensaEspProp.innerHTML);
        
        const daño = calcularDaño(ataque, defensa);
        vidaActualProp -= daño;

        console.log(`Daño recibido del rival: ${daño}`);
    };

    // Lógica de turnos
    const realizarTurno = (ataqueFisico) => {
        if (turnoPropPrimero) {
            ataquePropio(ataqueFisico);
            if (vidaActualRival > 0) ataqueRival(ataqueFisico);
        } else {
            ataqueRival(ataqueFisico);
            if (vidaActualProp > 0) ataquePropio(ataqueFisico);
        }
    };

    // Realizar el combate hasta que uno de los Pokémon quede sin vida
    const realizarCombate = (ataqueFisico) => {
        while (vidaActualProp > 0 && vidaActualRival > 0) {
            realizarTurno(ataqueFisico);
            console.log(`Vida propia: ${vidaActualProp}, Vida rival: ${vidaActualRival}`);
        }

        if (vidaActualProp > 0) {
            console.log("¡Has ganado el combate!");
        } else {
            console.log("Has perdido el combate.");
        }
    };

    // Determinar si el ataque es físico o especial según el botón presionado
    const ataqueFisico = btnAtkFis.classList.contains('active');
    realizarCombate(ataqueFisico);
};



window.addEventListener('load', obtenerPokeRival);

btnElegir.addEventListener('click', obtenerPokePropio);

btnAtkFis.addEventListener('click', combate);

