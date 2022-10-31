class Nodo {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class Pila {
    constructor() {
        this.tope = null;
        this.fondo = null;
        this.length = 0;
    }
    append(value) {
        const NuevoNodo = new Nodo(value);
        if (this.length == 0) {
            this.tope = NuevoNodo;
            this.fondo = NuevoNodo;
        }
        if (this.length > 0) {
            NuevoNodo.next = this.tope;
            this.tope = NuevoNodo;
        }
        this.length++;
    }
    desapilar() {
        if (this.length >= 0) {
            if (this.length == 1) {
                this.fondo = null;
                this.tope = null;
            }
            if (this.length > 1) {
                this.tope = this.tope.next;
            }
            this.length--;
        }
    }

    invertir() {
        let nodo = this.tope
        let tamaño = this.length
        this.tope = null
        this.fondo = null
        this.length = 0
        for (let i = 0; i < tamaño; i++) {
            this.append(nodo.value)
            nodo = nodo.next
        }
    }
}
class Maps{
    constructor(){
        this.maps = [
            [0, 1, 1, 1, 1],
            [0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        [
            [0,0,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,0,1,1],
            [1,1,0,0,0,0,1,0,1,1],
            [1,1,0,1,1,0,0,0,1,1],
            [1,1,0,1,1,1,1,1,1,1],
            [1,1,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,0,1,1,0],
            [1,1,1,1,1,1,1,1,1,0],
        ];
    }

    getMaps(i){
        return this.maps[i];
    }
}

class Laberinto {
    constructor() {
        this.array = [
            [0,0,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,0,1,1],
            [1,1,0,0,0,0,1,0,1,1],
            [1,1,0,1,1,0,0,0,1,1],
            [1,1,0,1,1,1,1,1,1,1],
            [1,1,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,0,1,1,0],
            [1,1,1,1,1,1,1,1,1,0]
        ];


        this.pila = new Pila()
    }
    async resolver(x, y) {

        // setTimeout(() => {


        // console.log(x + ' ' + y)

        if (x == this.array.length - 1 & y == this.array[0].length - 1) {
            this.pila.append([x, y])
            console.log(this.pila.tope)
            return true
        }


        else if (y < this.array[0].length & y >= 0 & x < this.array.length & x >= 0) {
            // console.log("por aqui pasó")
            this.array[x][y] = 2

            this.pila.append([x, y])
            // console.log(this.pila.tope)

            // this.print()
            // muro

            // console.log(x + " " + y)
            if (y + 1 < this.array[0].length) {
                if (this.array[x][y + 1] == 0) {
                    if (await this.resolver(x, y + 1)) {
                        // console.log(this.pila.tope)
                        return true
                    }
                }
            }


            if (x + 1 < this.array.length) {
                if (this.array[x + 1][y] == 0) {
                    if (await this.resolver(x + 1, y)) {
                        // console.log(this.pila.tope)

                        return true
                    }
                }
            }

            if (y - 1 >= 0) {
                if (this.array[x][y - 1] == 0) {
                    if (await this.resolver(x, y - 1)) {
                        // console.log(this.pila.tope)

                        return true
                    }
                }
            }

            if (x - 1 >= 0) {
                if (this.array[x - 1][y] == 0) {
                    if (await this.resolver(x - 1, y)) {
                        // console.log(this.pila.tope)

                        return true
                    }
                }
            }


            this.array[x][y] = 0
            this.pila.desapilar()
            // if ()
            // this.movimientos.pop()
        }
        else {

            // console.log(this.pila.tope)
        }
        return false
        // }, 5000);
    }

    async print() {

        this.pila.invertir()
        let nodo = this.pila.tope
        for (let tam = 0; tam < this.pila.length; tam++) {
            await this.sleep(500)

            const divlab = document.getElementById('container');
            
            if (divlab) {
                document.body.removeChild(divlab)
                document.body.removeChild(document.getElementById('salto'))
            }

            const container = document.createElement('div')
            Object.assign(container, { id: 'container' })

            for (let i = 0; i < this.array.length; i++) {
                const div = document.createElement('div')
                for (let j = 0; j < this.array[0].length; j++) {
                    const a = document.createElement('a')
                    // a.innerHTML = this.array[i][j]
                    if (i == this.array.length - 1 & j == this.array[0].length - 1) {
                        a.classList.add('queso')
                    }
                    else if (this.array[i][j] == 1) {
                        a.classList.add('muro')
                    }
                    if (i == nodo.value[0] && j == nodo.value[1]) {
                        a.classList.add('raton')
                        a.classList.remove('queso')
                        // console.log(nodo)
                    }
                    else if (this.array[i][j] == 2 | this.array[i][j] == 0) {
                        a.classList.add('camino')
                    }

                    
                    div.appendChild(a)
                }
                Object.assign(div, { id: 'lab' })
                // console.log()
                container.appendChild(div)
            }

            const br = document.createElement('br')
            Object.assign(br, { id: 'salto' })
            document.body.appendChild(container)
            document.body.appendChild(br)
            nodo = nodo.next

        }
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async mostrar() {
        // setTimeout(() => {
        await this.resolver(0, 0)
        await this.print()
        console.log(lab.pila)


        // }, 1000);
    }
}

const lab = new Laberinto()
const maps = new Maps()
lab.mostrar()

// lab.print()



// lab.print()