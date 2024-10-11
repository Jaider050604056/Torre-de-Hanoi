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

    Resolver() {
        let A = 0, B = 1, C = 2; 
        const movimientos = Math.pow(2, this.discos) - 1; 

        console.log("--------------");
        this.Imprimir_Torres();

        if (this.discos % 2 === 0) {
            
            [B, C] = [C, B];
        }

        for (let i = 1; i <= movimientos; i++) {
            if (i % 3 === 1) {
                this.Movimiento_Legal(A, C); 
            } else if (i % 3 === 2) {
                this.Movimiento_Legal(A, B);
            } else if (i % 3 === 0) {
                this.Movimiento_Legal(B, C); 
            }
        }
    }
}

class Nodo {
    constructor(valor) {
        this.valor = valor; 
        this.next = null;
    }
}

const discos = 20; 
const Hanoi = new Torre_De_Hanoi(discos);
Hanoi.Resolver();


