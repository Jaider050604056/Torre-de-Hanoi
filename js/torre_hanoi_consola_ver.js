const tiempo = 100;
let contador = 0;
// información de la consola
const texto_torre_A = document.getElementById("Texto_TorreA");
const texto_torre_B = document.getElementById("Texto_TorreB");
const texto_torre_C = document.getElementById("Texto_TorreC");
// información de los inputs
const input_numero = document.getElementById("input_numero");
const texto_numero = document.getElementById("texto_numero");
const botonEnviar = document.getElementById("enviar");
const botonResolver = document.getElementById("respuesta");
const texto_Movimientos = document.getElementById("texto_movimientos");

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
    let torreA_mostrar = [];
    for (let i = input_numero.value; i > 0; i--) {
        torreA_mostrar.push(i);
    }
    texto_torre_A.textContent = `A: ${torreA_mostrar}`;
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

    Mover_Disco(puntoA, puntoB) {
        const disco = this.torres[puntoA].pop(); 
        this.torres[puntoB].push(disco); 
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
        texto_torre_A.textContent = `A: ${this.torres[0].Imprimir_Pila()}`;
        texto_torre_B.textContent = `B: ${this.torres[1].Imprimir_Pila()}`;
        texto_torre_C.textContent = `C: ${this.torres[2].Imprimir_Pila()}`;
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
}

class Nodo {
    constructor(valor) {
        this.valor = valor; 
        this.next = null;
    }
}

