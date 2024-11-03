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
    acero: {acero: 0.5, agua: 0.5, bicho: 1, dragón: 0.5, eléctrico: 0.5, fantasma: 1, fuego: 0.5, hielo: 2, lucha: 1, normal: 1, planta: 1, psíquico: 1, roca: 2, siniestro: 1, tierra: 1, veneno: 0.5, volador: 1, hada: 2},
    agua: {fuego: 2, agua: 0.5, planta: 0.5, tierra: 2, roca: 2, dragón: 0.5, acero: 1, eléctrico: 1},
    
};

// Obtener multiplicador de tipo
const obtenerMultiplicador = (tipoAtaque, tipoRival) => {
    if (tablaEfectividad[tipoAtaque] && tablaEfectividad[tipoAtaque][tipoRival]) {
        return tablaEfectividad[tipoAtaque][tipoRival];
    }
    return 1; // Sin modificación de daño si el tipo no se encuentra
};

// Función de combate
const combate = (tipoAtaque) => {
    // Obtener estadísticas
    let vidaPropia = parseInt(vidaProp.innerHTML);
    let vidaDelRival = parseInt(vidaRival.innerHTML);

    let velocidadPropia = parseInt(velocidadProp.innerHTML);
    let velocidadDelRival = parseInt(velocidadRival.innerHTML);

    let atkPropio = tipoAtaque === 'fisico' ? parseInt(atkFisProp.innerHTML) : parseInt(atkEspProp.innerHTML);
    let atkRival = tipoAtaque === 'fisico' ? parseInt(atkFisRival.innerHTML) : parseInt(atkEspRival.innerHTML);

    let defensaRival = tipoAtaque === 'fisico' ? parseInt(defensaFisRival.innerHTML) : parseInt(defensaEspRival.innerHTML);
    let defensaPropia = tipoAtaque === 'fisico' ? parseInt(defensaFisProp.innerHTML) : parseInt(defensaEspProp.innerHTML);

    // Obtener tipos de Pokémon
    const tipoPropio1 = tipo1Prop.innerHTML.toLowerCase();
    const tipoPropio2 = tipo2Prop.innerHTML.toLowerCase();
    const tipoRival1 = tipo1Rival.innerHTML.toLowerCase();
    const tipoRival2 = tipo2Rival.innerHTML.toLowerCase();

    // Obtener multiplicadores de efectividad
    const multiplicador1 = obtenerMultiplicador(tipoPropio1, tipoRival1);
    const multiplicador2 = tipoRival2 ? obtenerMultiplicador(tipoPropio1, tipoRival2) : 1;
    const multiplicadorFinalPropio = multiplicador1 * multiplicador2;

    // Calcular daño con mínimo de 1
    const calcularDanio = (ataque, defensa, multiplicador) => Math.max((ataque - defensa) * multiplicador, 1);

    // Ciclo de combate
    while (vidaPropia > 0 && vidaDelRival > 0) {
        if (velocidadPropia >= velocidadDelRival) {
            const danioAlRival = calcularDanio(atkPropio, defensaRival, multiplicadorFinalPropio);
            vidaDelRival -= danioAlRival;
            vidaRival.innerHTML = vidaDelRival;
            if (vidaDelRival <= 0) break;

            const danioAlPropio = calcularDanio(atkRival, defensaPropia, 1); // Puedes agregar lógica similar para el ataque del rival
            vidaPropia -= danioAlPropio;
            vidaProp.innerHTML = vidaPropia;
        } else {
            const danioAlPropio = calcularDanio(atkRival, defensaPropia, 1);
            vidaPropia -= danioAlPropio;
            vidaProp.innerHTML = vidaPropia;
            if (vidaPropia <= 0) break;

            const danioAlRival = calcularDanio(atkPropio, defensaRival, multiplicadorFinalPropio);
            vidaDelRival -= danioAlRival;
            vidaRival.innerHTML = vidaDelRival;
        }
    }

    if (vidaPropia > 0) {
        alert("¡Tu Pokémon ha ganado el combate!");
    } else {
        alert("El Pokémon rival ha ganado el combate.");
    }
};


// Eventos para elegir el tipo de ataque
btnElegir.addEventListener('click', obtenerPokePropio);
btnAtkFis.addEventListener('click', () => combate('fisico'));
btnAtkEsp.addEventListener('click', () => combate('especial'));

// Cargar Pokémon rival automáticamente al iniciar
window.addEventListener('load', obtenerPokeRival);
