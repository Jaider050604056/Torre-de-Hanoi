const tiempo = 10;
let currentMove = 0;

// información de los inputs
const input_numero = document.getElementById("input_numero");
const texto_numero = document.getElementById("texto_numero");
const botonEnviar = document.getElementById("enviar");
const botonResolver = document.getElementById("respuesta")

// información de los bloques
const stick1 = document.getElementById("stick1");
const stick2 = document.getElementById("stick2");
const stick3 = document.getElementById("stick3");


botonEnviar.addEventListener("click", function() {
    if (input_numero.value >= 2 && input_numero.value <= 10000){
        actualizar_torre();
    }
    else if (input_numero.value > 10000){
        texto_numero.textContent = "Limite de memoria";
    } else {
        texto_numero.textContent = "Numero no valido";
    }
});

botonResolver.addEventListener("click", function() {
    if (input_numero.value >= 2 && input_numero.value <= 10000){
        actualizar_torre();
        mover_torre();
    }
    else if (input_numero.value > 10000){
        texto_numero.textContent = "Limite de memoria";
    } else {
        texto_numero.textContent = "Numero no valido";
    }
});


function actualizar_torre(){
    texto_numero.textContent = input_numero.value + " discos";
    

    stick1.innerHTML = ""; 
    stick2.innerHTML = ""; 
    stick3.innerHTML = ""; 

    for (let i = 0; i < input_numero.value; i++) {
        
        const block = document.createElement("div");
        block.className = "block";

        let width_formula = (25/input_numero.value) * i+1;
        let height_formula = (90/input_numero.value);
        let top_formula = (95/input_numero.value) * i;
        let left_formula = 18-(12/input_numero.value)*i;

        block.style.width = `${width_formula}%`; 
        block.style.height = `${height_formula}%`;
        block.style.top = `${(top_formula)}%`; 
        block.style.left = `${left_formula}%`; 
        
        stick1.appendChild(block);
    }
}

function mover_torre(){
    console.clear();
    contador = 0;
    const discos = input_numero.value; 
    const Hanoi = new Torre_De_Hanoi(discos);
    Hanoi.Resolver();
}


class Pila {
    constructor() {
        this.top = null;
    }

    push(valor) {
        const nuevo_Nodo = new Nodo(valor);
        nuevo_Nodo.next = this.top; 
        this.top = nuevo_Nodo; 
    }

    pop() {
        if (this.Si_Esta_Vacio()) {
            return "Pila vacia";
        }
        const nodo_Borrado = this.top;
        this.top = this.top.next; 
        return nodo_Borrado.valor; 
    }

    peek() {
        if (this.top) {
            return this.top.valor; 
        } else {
            return null; 
        }
    }

    Si_Esta_Vacio() {
        return this.top === null; 
    }

    Imprimir_Pila() {
        let resultado = [];
        let posicion_Actual = this.top; 
        while (posicion_Actual) {
            resultado.push(posicion_Actual.valor); 
            posicion_Actual = posicion_Actual.next; 
        }
        return resultado.reverse().toString(); 
    }
}

class Torre_De_Hanoi {
    constructor(discos) {
        this.discos = discos;
        this.torres = [new Pila(), new Pila(), new Pila()]; 
        for (let i = discos; i > 0; i--) {
            this.torres[0].push(i); 
        }
    }

    Resolver() {
        let A = 0, B = 1, C = 2; 
        const movimientos = Math.pow(2, this.discos) - 1; 
    
        console.log("--------------");
        this.Imprimir_Torres();
    
        if (this.discos % 2 === 0) {
            [B, C] = [C, B];
        }
    
        for (let i = 1; i <= movimientos; i++) {
            setTimeout(() => {
                if (i % 3 === 1) {
                    this.Movimiento_Legal(A, C); 
                } else if (i % 3 === 2) {
                    this.Movimiento_Legal(A, B);
                } else if (i % 3 === 0) {
                    this.Movimiento_Legal(B, C); 
                }
            }, i * tiempo); // Ajusta el tiempo de espera según sea necesario
        }
    }

    animateMoves(moveSequence) {
        const interval = setInterval(() => {
            if (currentMove < moveSequence.length) {
                const [from, to] = moveSequence[currentMove];
                this.Movimiento_Legal(from, to);
                currentMove++;
            } else {
                clearInterval(interval); // Detenemos el intervalo cuando se completa la secuencia
            }
        }, tiempo); // Ajusta el tiempo en milisegundos para la velocidad de la animación
    }

    // Renderiza la torre en la interfaz
    renderTowers() {
        for (let i = 0; i < 3; i++) {
            const stick = this.torres[i];
            const stickElement = document.getElementById(`stick${i + 1}`);
            stickElement.innerHTML = ""; // Limpia el stick antes de volver a renderizar

            let height = 0; // Inicializa la altura de los bloques
            while (stick.peek() !== null) {
                const block = document.createElement("div");
                block.className = "block";
                const diskSize = stick.pop(); // Obtiene el disco en la parte superior

                // Ajustamos el tamaño y la posición del bloque
                block.style.width = `${(25 / this.discos) * diskSize}%`;
                block.style.height = `${(90 / this.discos)}%`;
                block.style.top = `${(95 / this.discos) * height}%`;
                block.style.left = `${(18 - (12 / this.discos) * diskSize)}%`;

                stickElement.appendChild(block); // Agrega el bloque al stick
                height++; // Aumenta la altura para el siguiente bloque
            }
        }
    }

    Mover_Disco(puntoA, puntoB) {
        const disco = this.torres[puntoA].pop(); 
        this.torres[puntoB].push(disco); 
    
        // Asegúrate de que el disco no sea nulo antes de proceder
        if (disco === null) return;
    
        // Obtén el disco del DOM
        const blockElement = document.querySelector(`#stick${puntoA + 1} .block:nth-child(${this.torres[puntoA].Imprimir_Pila().split(',').length})`);
    
        if (!blockElement) {
            console.error("Block element not found");
            return;
        }
        
        // Calcula la nueva posición
        const stickB = document.getElementById(`stick${puntoB + 1}`);
        const totalBlocks = stickB.children.length;
        const newTop = 95 - (totalBlocks * (90 / this.discos)); // Ajusta según el número de bloques en la torre
        const newLeft = 18 - (12 / this.discos) * (totalBlocks + 1); // Posiciona el disco correctamente
    
        // Actualiza el estilo para mover el disco
        blockElement.style.top = `${newTop}%`;
        blockElement.style.left = `${newLeft}%`;
        stickB.appendChild(blockElement); // Mueve el disco en el DOM
    
        this.Imprimir_Torres();
        contador += 1;
        texto_Movimientos.textContent = contador + " movimientos";
    }
    

    Movimiento_Legal(puntoA, puntoB) {
        const disco_Origen = this.torres[puntoA].peek(); 
        const disco_Destino = this.torres[puntoB].peek(); 

        
        if (this.torres[puntoB].Si_Esta_Vacio() || (disco_Origen !== null && disco_Origen < disco_Destino)) {
            this.Mover_Disco(puntoA, puntoB); 
        } else {
            this.Mover_Disco(puntoB, puntoA);
        }
    }

    Imprimir_Torres() {
        console.log("A:", this.torres[0].Imprimir_Pila());
        console.log("B:", this.torres[1].Imprimir_Pila());
        console.log("C:", this.torres[2].Imprimir_Pila());
        console.log("--------------");
    }
}

class Nodo {
    constructor(valor) {
        this.valor = valor; 
        this.next = null;
    }
}