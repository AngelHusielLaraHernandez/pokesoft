//Atributos del Pokémon rival
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

//Atributos del Pokémon propio
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

// Interfaz de usuario
const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis = document.querySelector('#btn-atk-fis');
const btnAtkEsp = document.querySelector('#btn-atk-esp');

// Obtener Pokémon propio
const obtenerPokePropio = () => {
    const num = input.value;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res) => {
        const data = res.data;
        imgProp.src = data.sprites.back_default;
        nombreProp.innerHTML = data.name;
        tipo1Prop.innerHTML = data.types[0].type.name;
        tipo2Prop.innerHTML = data.types[1] ? data.types[1].type.name : '';

        vidaProp.innerHTML = data.stats[0].base_stat;
        atkFisProp.innerHTML = data.stats[1].base_stat;
        defensaFisProp.innerHTML = data.stats[2].base_stat;
        atkEspProp.innerHTML = data.stats[3].base_stat;
        defensaEspProp.innerHTML = data.stats[4].base_stat;
        velocidadProp.innerHTML = data.stats[5].base_stat;
    });
}

// Obtener Pokémon rival aleatorio
const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res) => {
        const data = res.data;
        imgRival.src = data.sprites.front_default;
        nombreRival.innerHTML = data.name;
        tipo1Rival.innerHTML = data.types[0].type.name;
        tipo2Rival.innerHTML = data.types[1] ? data.types[1].type.name : '';

        vidaRival.innerHTML = data.stats[0].base_stat;
        atkFisRival.innerHTML = data.stats[1].base_stat;
        defensaFisRival.innerHTML = data.stats[2].base_stat;
        atkEspRival.innerHTML = data.stats[3].base_stat;
        defensaEspRival.innerHTML = data.stats[4].base_stat;
        velocidadRival.innerHTML = data.stats[5].base_stat;
    });
}


const getNumRandom = () => Math.floor(Math.random() * 1001) + 1;

// Función de combate
// Tabla de efectividad entre tipos
const tablaEfectividad = {
    acero: {
        acero: 0.5, agua: 0.5, bicho: 1, dragón: 0.5, eléctrico: 0.5, fantasma: 1, fuego: 0.5, hielo: 2, lucha: 1, 
        normal: 1, planta: 1, psíquico: 1, roca: 2, siniestro: 1, tierra: 1, veneno: 0.5, volador: 1, hada: 2
    },
    agua: {
        fuego: 2, agua: 0.5, planta: 0.5, tierra: 2, roca: 2, dragón: 0.5, acero: 1, eléctrico: 1, bicho: 1, 
        fantasma: 1, lucha: 1, normal: 1, psíquico: 1, siniestro: 1, veneno: 1, volador: 1, hielo: 1, hada: 1
    },
    bicho: {
        planta: 2, psíquico: 2, siniestro: 2, fuego: 0.5, lucha: 0.5, veneno: 0.5, volador: 0.5, acero: 0.5,
        agua: 1, bicho: 1, dragón: 1, eléctrico: 1, fantasma: 0.5, hielo: 1, normal: 1, roca: 1, tierra: 1, hada: 0.5
    },
    dragón: {
        dragón: 2, acero: 0.5, hada: 0, fuego: 1, agua: 1, planta: 1, eléctrico: 1, bicho: 1, fantasma: 1, 
        lucha: 1, normal: 1, psíquico: 1, roca: 1, siniestro: 1, veneno: 1, volador: 1, hielo: 1, tierra: 1
    },
    eléctrico: {
        agua: 2, volador: 2, tierra: 0, planta: 0.5, eléctrico: 0.5, acero: 1, dragón: 0.5, bicho: 1, fantasma: 1,
        fuego: 1, lucha: 1, hielo: 1, normal: 1, psíquico: 1, roca: 1, siniestro: 1, veneno: 1, hada: 1
    },
    fantasma: {
        psíquico: 2, fantasma: 2, normal: 0, siniestro: 0.5, acero: 1, agua: 1, bicho: 1, dragón: 1, eléctrico: 1,
        fuego: 1, hielo: 1, lucha: 1, planta: 1, roca: 1, tierra: 1, veneno: 1, volador: 1, hada: 1
    },
    fuego: {
        planta: 2, hielo: 2, bicho: 2, acero: 2, agua: 0.5, roca: 0.5, fuego: 0.5, dragón: 0.5, tierra: 1,
        eléctrico: 1, fantasma: 1, lucha: 1, normal: 1, psíquico: 1, siniestro: 1, veneno: 1, volador: 1, hada: 1
    },
    hada: {
        dragón: 2, lucha: 2, siniestro: 2, fuego: 0.5, veneno: 0.5, acero: 0.5, agua: 1, bicho: 1, eléctrico: 1,
        fantasma: 1, hielo: 1, normal: 1, planta: 1, psíquico: 1, roca: 1, tierra: 1, volador: 1, hada: 1
    },
    hielo: {
        planta: 2, tierra: 2, volador: 2, dragón: 2, fuego: 0.5, agua: 0.5, hielo: 0.5, acero: 0.5, bicho: 1, 
        eléctrico: 1, fantasma: 1, lucha: 1, normal: 1, psíquico: 1, roca: 1, siniestro: 1, veneno: 1, hada: 1
    },
    lucha: {
        normal: 2, hielo: 2, roca: 2, siniestro: 2, acero: 2, veneno: 0.5, volador: 0.5, psíquico: 0.5, bicho: 0.5,
        hada: 0.5, fantasma: 0, agua: 1, dragón: 1, eléctrico: 1, fuego: 1, lucha: 1, planta: 1, tierra: 1
    },
    normal: {
        roca: 0.5, fantasma: 0, acero: 0.5, agua: 1, bicho: 1, dragón: 1, eléctrico: 1, fuego: 1, hielo: 1,
        lucha: 1, planta: 1, psíquico: 1, siniestro: 1, tierra: 1, veneno: 1, volador: 1, hada: 1
    },
    planta: {
        agua: 2, tierra: 2, roca: 2, fuego: 0.5, planta: 0.5, veneno: 0.5, volador: 0.5, bicho: 0.5, dragón: 0.5,
        acero: 0.5, eléctrico: 1, fantasma: 1, hielo: 1, lucha: 1, normal: 1, psíquico: 1, siniestro: 1, hada: 1
    },
    psíquico: {
        lucha: 2, veneno: 2, psíquico: 0.5, acero: 0.5, siniestro: 0, agua: 1, bicho: 1, dragón: 1, eléctrico: 1,
        fantasma: 1, fuego: 1, hielo: 1, normal: 1, planta: 1, roca: 1, tierra: 1, volador: 1, hada: 1
    },
    roca: {
        fuego: 2, hielo: 2, volador: 2, bicho: 2, lucha: 0.5, tierra: 0.5, acero: 0.5, agua: 1, dragón: 1,
        eléctrico: 1, fantasma: 1, normal: 1, planta: 1, psíquico: 1, roca: 1, siniestro: 1, veneno: 1, hada: 1
    },
    siniestro: {
        psíquico: 2, fantasma: 2, lucha: 0.5, siniestro: 0.5, hada: 0.5, acero: 1, agua: 1, bicho: 1, dragón: 1,
        eléctrico: 1, fuego: 1, hielo: 1, normal: 1, planta: 1, roca: 1, tierra: 1, veneno: 1, volador: 1
    },
    tierra: {
        fuego: 2, eléctrico: 2, veneno: 2, roca: 2, acero: 2, planta: 0.5, bicho: 0.5, volador: 0, agua: 1,
        dragón: 1, fantasma: 1, hielo: 1, lucha: 1, normal: 1, psíquico: 1, siniestro: 1, hada: 1
    },
    veneno: {
        planta: 2, hada: 2, veneno: 0.5, tierra: 0.5, roca: 0.5, fantasma: 0.5, acero: 0, agua: 1, bicho: 1,
        dragón: 1, eléctrico: 1, fuego: 1, hielo: 1, lucha: 1, normal: 1, psíquico: 1, volador: 1, siniestro: 1
    },
    volador: {
        planta: 2, lucha: 2, bicho: 2, eléctrico: 0.5, roca: 0.5, acero: 0.5, agua: 1, dragón: 1, fantasma: 1,
        fuego: 1, hielo: 1, normal: 1, psíquico: 1, tierra: 1, veneno: 1, siniestro: 1, hada: 1
    }
};


// Obtener multiplicador de tipo
const obtenerMultiplicador = (tipoAtaque, tipoRival) => {
    if (tablaEfectividad[tipoAtaque] && tablaEfectividad[tipoAtaque][tipoRival]) {
        return tablaEfectividad[tipoAtaque][tipoRival];
    }
    return 1; // Sin modificación de daño si el tipo no se encuentra
};

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

// Elemento del historial de combate
const historialCombate = document.querySelector('#historialCombate');

// Función para registrar los movimientos en el historial
function registrarMovimiento(mensaje) {
    const movimiento = document.createElement('p');
    movimiento.textContent = mensaje;
    historialCombate.appendChild(movimiento);
    historialCombate.scrollTop = historialCombate.scrollHeight; // Desplaza hacia el último movimiento
}

// Función de combate actualizada
// Función de combate actualizada
const combate = (tipoAtaque) => {
    // Obtener estadísticas
    let vidaPropia = parseInt(vidaProp.innerHTML);
    let vidaDelRival = parseInt(vidaRival.innerHTML);

    let velocidadPropia = parseInt(velocidadProp.innerHTML);
    let velocidadDelRival = parseInt(velocidadRival.innerHTML);

    let atkPropio = tipoAtaque === 'fisico' ? parseInt(atkFisProp.innerHTML) : parseInt(atkEspProp.innerHTML);
    let atkRival = tipoAtaque === 'fisico' ? parseInt(atkFisRival.innerHTML) : parseInt(atkEspRival.innerHTML);

    let defensaRival = tipoAtaque === 'fisico' ? parseInt(defensaFisRival.innerHTML) : parseInt(defensaEspRival.innerHTML);
    let defensaPropia = tipoAtaque === 'fisico' ? parseInt(defensaFisRival.innerHTML) : parseInt(defensaEspRival.innerHTML);

    // Registrar movimiento inicial del propio Pokémon
    registrarMovimiento(`${nombreProp.innerHTML} usa ${tipoAtaque === 'fisico' ? 'Ataque Físico' : 'Ataque Especial'}`);
    
    if (velocidadPropia >= velocidadDelRival) {
        // El propio Pokémon ataca primero
        let danoAlRival = Math.max(atkPropio - defensaRival, 1);
        
        // Aplicar multiplicador de tipo al daño del Pokémon propio
        const multiplicador = obtenerMultiplicador(tipo1Prop.innerHTML, tipo1Rival.innerHTML);
        danoAlRival *= multiplicador;
        vidaDelRival -= danoAlRival;

        if (vidaDelRival <= 0) {
            vidaDelRival = 0;
            vidaRival.innerHTML = vidaDelRival;
            registrarMovimiento(`¡Golpe efectivo! ${nombreRival.innerHTML} recibe ${danoAlRival} de daño`);
            registrarMovimiento(`¡${nombreProp.innerHTML} gana el combate!`);
            return; // Termina el combate
        }
        vidaRival.innerHTML = vidaDelRival;
        registrarMovimiento(`¡Golpe efectivo! ${nombreRival.innerHTML} recibe ${danoAlRival} de daño`);

        // Contraataque del rival
        let danoAPropio = Math.max(atkRival - defensaPropia, 1);

        // Aplicar multiplicador de tipo al daño del rival
        const multiplicadorRival = obtenerMultiplicador(tipo1Rival.innerHTML, tipo1Prop.innerHTML);
        danoAPropio *= multiplicadorRival;
        vidaPropia -= danoAPropio;

        if (vidaPropia <= 0) {
            vidaPropia = 0;
            vidaProp.innerHTML = vidaPropia;
            registrarMovimiento(`${nombreRival.innerHTML} contraataca y causa ${danoAPropio} de daño`);
            registrarMovimiento(`¡${nombreRival.innerHTML} gana el combate!`);
            return; // Termina el combate
        }
        vidaProp.innerHTML = vidaPropia;
        registrarMovimiento(`${nombreRival.innerHTML} contraataca y causa ${danoAPropio} de daño`);

    } else {
        // El Pokémon rival ataca primero
        let danoAPropio = Math.max(atkRival - defensaPropia, 1);

        // Aplicar multiplicador de tipo al daño del rival
        const multiplicadorRival = obtenerMultiplicador(tipo1Rival.innerHTML, tipo1Prop.innerHTML);
        danoAPropio *= multiplicadorRival;
        vidaPropia -= danoAPropio;

        if (vidaPropia <= 0) {
            vidaPropia = 0;
            vidaProp.innerHTML = vidaPropia;
            registrarMovimiento(`${nombreRival.innerHTML} usa ${tipoAtaque === 'fisico' ? 'Ataque Físico' : 'Ataque Especial'} y causa ${danoAPropio} de daño`);
            registrarMovimiento(`¡${nombreRival.innerHTML} gana el combate!`);
            return; // Termina el combate
        }
        vidaProp.innerHTML = vidaPropia;
        registrarMovimiento(`${nombreRival.innerHTML} usa ${tipoAtaque === 'fisico' ? 'Ataque Físico' : 'Ataque Especial'} y causa ${danoAPropio} de daño`);

        // El propio Pokémon ataca después del rival
        let danoAlRival = Math.max(atkPropio - defensaRival, 1);
        
        // Aplicar multiplicador de tipo al daño del propio Pokémon
        const multiplicador = obtenerMultiplicador(tipo1Prop.innerHTML, tipo1Rival.innerHTML);
        danoAlRival *= multiplicador;
        vidaDelRival -= danoAlRival;

        if (vidaDelRival <= 0) {
            vidaDelRival = 0;
            vidaRival.innerHTML = vidaDelRival;
            registrarMovimiento(`¡Golpe efectivo! ${nombreRival.innerHTML} recibe ${danoAlRival} de daño`);
            registrarMovimiento(`¡${nombreProp.innerHTML} gana el combate!`);
            return; // Termina el combate
        }
        vidaRival.innerHTML = vidaDelRival;
        registrarMovimiento(`¡Golpe efectivo! ${nombreRival.innerHTML} recibe ${danoAlRival} de daño`);
    }
};


// Eventos para elegir el tipo de ataque
btnElegir.addEventListener('click', obtenerPokePropio);
btnAtkFis.addEventListener('click', () => combate('fisico'));
btnAtkEsp.addEventListener('click', () => combate('especial'));

// Cargar Pokémon rival automáticamente al iniciar
window.addEventListener('load', obtenerPokeRival);
