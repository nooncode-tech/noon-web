import { useState, useEffect } from 'react';

// El nombre del hook debe empezar con "use"
export const useIsMobile = (breakpoint: number = 640): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // La función que revisa el tamaño de la ventana
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        // 1. Revisa una vez cuando el componente se monta en el cliente
        checkMobile();

        // 2. Añade un listener para detectar cambios en el tamaño
        window.addEventListener('resize', checkMobile);

        // 3. Limpia el listener cuando el componente se desmonta
        // Esto es muy importante para evitar fugas de memoria
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [breakpoint]); // El efecto se volverá a ejecutar si el breakpoint cambia

    return isMobile;
};