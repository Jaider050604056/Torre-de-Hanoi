// Valores de movimiento de bloques
let tiempo;
let currentMove = 10000;
// información de los inputs
const input_numero = document.getElementById("input_numero");
const texto_numero = document.getElementById("texto_numero");
const botonEnviar = document.getElementById("enviar");
const botonResolver = document.getElementById("respuesta")
const texto_Movimientos = document.getElementById("texto_movimientos");
const texto_Tiempo = document.getElementById("input_tiempo");
// información de los bloques
const stick1 = document.getElementById("stick1");
const stick2 = document.getElementById("stick2");
const stick3 = document.getElementById("stick3");

// Evento de cuando se activa el botón "Enviar"
botonEnviar.addEventListener("click", function() {
    if (input_numero.value >= 2 && input_numero.value <= 10000){
        actualizar_torre();
    }
    else if (input_numero.value > 1000){
        alert("Limite de memoria");
    } else {
        alert("Ingresa numeros validos");
    } 
});
// Evento de cuando se activa el botón "Resolver"
botonResolver.addEventListener("click", function() {
    if (input_numero.value >= 2 && input_numero.value <= 10000 && texto_Tiempo.value > 0){
        actualizar_torre();
        desactivar_inputs();
        mover_torre();
    }
    else if (input_numero.value > 1000){
        alert("Limite de memoria");
    } else {
        alert("Ingresa numeros validos");
    }
});
// Función para actualizar la posición de los bloques en la torre
function actualizar_torre(){
    texto_numero.textContent = input_numero.value + " bloques";
    tiempo = 1000 / texto_Tiempo.value;

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
// Función para mover los bloques de torre a torre
function mover_torre(){
    console.clear();
    contador = 0;
    const bloques = input_numero.value; 
    const Hanoi = new Torre_De_Hanoi(bloques);
    Hanoi.Resolver();
}
// Función para desactivar los inputs para evitar errores
function desactivar_inputs(){
    input_numero.disabled = true;
    texto_numero.disabled = true;
    botonEnviar.disabled = true;
    botonResolver.disabled = true;
    texto_Movimientos.disabled = true;
    texto_Tiempo.disabled = true;
}
// Función para activar los inputs cuando la torre ya esté resuelta
function activar_inputs(){
    input_numero.disabled = false;
    texto_numero.disabled = false;
    botonEnviar.disabled = false;
    botonResolver.disabled = false;
    texto_Movimientos.disabled = false;
    texto_Tiempo.disabled = false;
}
// Pila a base de nodos que representa una torre
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
// Clase que resuelve la torre de Hanoi
class Torre_De_Hanoi {
    // Constructor que usa 3 pilas representando cada torre
    constructor(bloques) {
        this.bloques = bloques;
        this.torres = [new Pila(), new Pila(), new Pila()]; 
        for (let i = bloques; i > 0; i--) {
            this.torres[0].push(i); 
        }
    }
    // Función que resuelve y administra cada movimiento de la torre
    Resolver() {
        let A = 0, B = 1, C = 2; 
        const movimientos = Math.pow(2, this.bloques) - 1; 
    
        console.log("--------------");
        this.Imprimir_Torres();
    
        if (this.bloques % 2 === 0) {
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
                if (i == movimientos){
                    activar_inputs();
                }
            }, i * tiempo);
        }
    }
    // Función que mueve cada Bloque de un punto A a punto B
    Mover_Bloque(puntoA, puntoB) {
        
        const bloque = this.torres[puntoA].pop(); 
        this.torres[puntoB].push(bloque); 
    
        const Bloque_Obtenido = document.querySelector(`#stick${puntoA + 1} .block:nth-child(${this.torres[puntoA].Imprimir_Pila().split(',').length})`);
        
        const Palo_PuntoB = document.getElementById(`stick${puntoB + 1}`);
        let posicionLeft;
        let Total_Block = Palo_PuntoB.childElementCount;

        if (Palo_PuntoB.id == `stick1`){
            posicionLeft = 12;
        } else if (Palo_PuntoB.id == `stick2`){
            posicionLeft = 48.5;
        } else if (Palo_PuntoB.id == `stick3`){
            posicionLeft = 73;
        }

        const nuevo_bottom = (95/this.bloques) * Total_Block; 
        const nuevo_left = posicionLeft;
    
        // Bloque_Obtenido.style.top = null;
        // Bloque_Obtenido.style.bottom = `${nuevo_bottom}%`;
        Bloque_Obtenido.style.left = `${nuevo_left}%`;
        Palo_PuntoB.appendChild(Bloque_Obtenido);
    
        this.Imprimir_Torres();
        contador += 1;
        texto_Movimientos.textContent = contador + " movimientos";
    }
    // Función que comprueba si el movimiento del Bloque es legal
    Movimiento_Legal(puntoA, puntoB) {
        const bloque_Origen = this.torres[puntoA].peek(); 
        const bloque_Destino = this.torres[puntoB].peek(); 

        
        if (this.torres[puntoB].Si_Esta_Vacio() || (bloque_Origen !== null && bloque_Origen < bloque_Destino)) {
            this.Mover_Bloque(puntoA, puntoB); 
        } else {
            this.Mover_Bloque(puntoB, puntoA);
        }
    }
    // Función que imprime las torres en la consola 
    Imprimir_Torres() {
        console.log("A:", this.torres[0].Imprimir_Pila());
        console.log("B:", this.torres[1].Imprimir_Pila());
        console.log("C:", this.torres[2].Imprimir_Pila());
        console.log("--------------");
    }
}
// Nodo basico
class Nodo {
    constructor(valor) {
        this.valor = valor; 
        this.next = null;
    }
}