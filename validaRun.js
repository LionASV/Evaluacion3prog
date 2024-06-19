const validaRun = (run) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-");
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            let tmp = rutCompleto.split('-');
            let digv = tmp[1];
            let rut = tmp[0];
            if (digv == 'K') digv = 'k';

            return (Fn.dv(rut) == digv);
        },
        dv: function (T) {
            let M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    }
    return Fn.validaRut(run)
}