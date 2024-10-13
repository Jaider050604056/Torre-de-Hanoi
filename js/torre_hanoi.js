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


function actualizar_torre(){
    texto_numero.textContent = input_numero.value + " discos";
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

function mover_torre(){
    console.clear();
    contador = 0;
    const discos = input_numero.value; 
    const Hanoi = new Torre_De_Hanoi(discos);
    Hanoi.Resolver();
}

function desactivar_inputs(){
    input_numero.disabled = true;
    texto_numero.disabled = true;
    botonEnviar.disabled = true;
    botonResolver.disabled = true;
    texto_Movimientos.disabled = true;
    texto_Tiempo.disabled = true;
}

function activar_inputs(){
    input_numero.disabled = false;
    texto_numero.disabled = false;
    botonEnviar.disabled = false;
    botonResolver.disabled = false;
    texto_Movimientos.disabled = false;
    texto_Tiempo.disabled = false;
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
                if (i == movimientos){
                    activar_inputs();
                }
            }, i * tiempo); // Tiempo entre cada acción
        }
    }

    Mover_Disco(puntoA, puntoB) {
        const disco = this.torres[puntoA].pop(); 
        this.torres[puntoB].push(disco); 
    
        // Obtén el disco del DOM
        const Bloque_Obtenido = document.querySelector(`#stick${puntoA + 1} .block:nth-child(${this.torres[puntoA].Imprimir_Pila().split(',').length})`);
        
        // Calcula la nueva posición
        const stickB = document.getElementById(`stick${puntoB + 1}`);
        let posicionLeft;
        let Total_Block = stickB.childElementCount;

        if (stickB.id == `stick1`){
            posicionLeft = 12;
        } else if (stickB.id == `stick2`){
            posicionLeft = 48.5;
        } else if (stickB.id == `stick3`){
            posicionLeft = 73;
        }

        const newTop = (95/this.discos) * Total_Block; 
        // const newLeft = posicionLeft + (12 / input_numero.value) * Total_Block;
        const newLeft = posicionLeft;
        console.log("punto B: " + stickB.id + "\nTop: " + newTop + "\nLeft: " + newLeft + "\nbloques: " + (Total_Block));

   
        // Bloque_Obtenido .style.top = `${newTop}%`;
        Bloque_Obtenido .style.left = `${newLeft}%`;
        stickB.appendChild(Bloque_Obtenido);
    
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