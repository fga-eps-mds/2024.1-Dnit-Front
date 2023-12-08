export function formataCustoLogistico(distancia: number){
    switch(true){
        case distancia <= 250:
            return "$";
        case distancia > 250 && distancia <= 500:
            return  "$$"
        case distancia > 500 && distancia <= 1000:
            return "$$$"
        default:
            return "$$$$"
    }
}

export function numeroCustoLogistico(distancia: number){
    switch(true){
        case distancia <= 250:
            return 1;
        case distancia > 250 && distancia <= 500:
            return  2
        case distancia > 500 && distancia <= 1000:
            return 3
        default:
            return 4
    }
}