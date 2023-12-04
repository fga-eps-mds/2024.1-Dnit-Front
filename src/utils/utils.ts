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

export function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const padZeros = (n: number) => n.toString().padStart(2, '0');
    return `${padZeros(date.getDate())}/${padZeros(date.getMonth())}/${date.getFullYear()} ${padZeros(date.getHours())}:${padZeros(date.getMinutes())}`
}
