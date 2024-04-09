//Monto mínimo de crédito en función del tipo de nómina y el número de meses desde el primer empleo para el género masculino.
const minMasculino = {
    "0-26": {"A": 100, "B": 1000, "C": 400, "D": 400},
    "27": {"A": 400, "B": 600, "C": 200, "D": 300},
    "28": {"A": 900, "B": 1000, "C": 200, "D": 500},
    "29": {"A": 100, "B": 1000, "C": 1000, "D": 900},
    "+30": {"A": 600, "B": 1000, "C": 600, "D": 1000}
};

//Monto mínimo de crédito en función del tipo de nómina y el número de meses desde el primer empleo para el género femenino.
const minFemenino = {
    "0-24": {"A": 800, "B": 800, "C": 200, "D": 500},
    "25": {"A": 800, "B": 700, "C": 900, "D": 1000},
    "26": {"A": 800, "B": 100, "C": 700, "D": 600},
    "27": {"A": 600, "B": 600, "C": 800, "D": 400},
    "+28": {"A": 200, "B": 700, "C": 100, "D": 700}
};

//Monto máximo de crédito en función del tipo de nómina y el número de meses desde el primer empleo para el género masculino.
const maxMasculino = {
    "0-26": {"A": 4900, "B": 4700, "C": 5000, "D": 4400},
    "27": {"A": 4700, "B": 4400, "C": 4700, "D": 4700},
    "28": {"A": 4600, "B": 5000, "C": 5000, "D": 4300},
    "29": {"A": 4600, "B": 4400, "C": 4200, "D": 4900},
    "+30": {"A": 4500, "B": 4900, "C": 4600, "D": 4300}
};

//Monto máximo de crédito en función del tipo de nómina y el número de meses desde el primer empleo para el género femenino.
const maxFemenino = {
    "0-24": {"A": 4000, "B": 4700, "C": 4600, "D": 5000},
    "25": {"A": 4200, "B": 4200, "C": 4900, "D": 4900},
    "26": {"A": 4100, "B": 4500, "C": 4600, "D": 4700},
    "27": {"A": 4200, "B": 4300, "C": 4700, "D": 5000},
    "+28": {"A": 4500, "B": 4400, "C": 4000, "D": 4300}
};


function calculoMotor(tipoNomina, fechaPrimerEmpleo, genero) {
    // Función para calcular los meses desde la fecha inicial del cliente y la fecha (Actual o especificada)
    function diferenciaMeses(fecha1, fecha2) {
        let diff = (fecha2.getTime() - fecha1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4); 
        // console.log(Math.abs(Math.round(diff)))
        return Math.abs(Math.round(diff));
    }

    let montoMinimo;
    let montoMaximo;

    const meses = diferenciaMeses(fechaPrimerEmpleo, new Date());
    let rangoMeses = "";
    if (meses <= 26 && genero === "m") {
        rangoMeses = "0-26";
    } else if (meses >= 30 && genero === "m") {
        rangoMeses = "+30";
    } else if (meses <= 24 && genero === "f") {
        rangoMeses = "0-24";
    } else if (meses >= 28 && genero === "f") {
        rangoMeses = "+28";
    } else {
        rangoMeses = meses.toString();
    }
    //Se selecciona el valor correspondiente en las tablas ya registradas de los montos minimos y maximos
    if (genero === "m") {
        montoMinimo = minMasculino[rangoMeses][tipoNomina];
        montoMaximo = maxMasculino[rangoMeses][tipoNomina];
    } else if (genero === "f") {
        montoMinimo = minFemenino[rangoMeses][tipoNomina];
        montoMaximo = maxFemenino[rangoMeses][tipoNomina];
    }

    // Calcular la recomendación óptima de la línea de crédito
    const p1 = montoMinimo + Math.sqrt(montoMaximo - montoMinimo);
    const p2 = montoMinimo + 0.0175 * (montoMaximo - montoMinimo);
    const recomendacionLinea = Math.max(p1, p2);

    // Retornar los resultados como un objeto
    return {
        montoMinimo: montoMinimo,
        montoMaximo: montoMaximo,
        recomendacionLinea: recomendacionLinea
    };
}

// Registros finales
const registro1 = calculoMotor("A", new Date("2022-06-16"), "f");
const registro2 = calculoMotor("B", new Date("1993-12-30"), "f");
const registro3 = calculoMotor("C", new Date("2020-09-19"), "m");
const registro4 = calculoMotor("D", new Date("2019-01-15"), "m");

console.log(registro1);
console.log(registro2);
console.log(registro3);
console.log(registro4);
